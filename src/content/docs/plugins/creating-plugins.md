---
title: Creating Plugins
description: Build Lokus plugins with the SDK, CLI, and plugin API.
---

This guide walks through creating a Lokus plugin from scratch, covering the SDK, project structure, manifest format, lifecycle hooks, permissions, and testing.

## Prerequisites

- Node.js 16+
- npm 8+
- TypeScript 4.5+ (recommended)

Install the Lokus plugin SDK and CLI:

```bash
npm install lokus-plugin-sdk
npm install -g lokus-plugin-cli
```

## Scaffold a new plugin

The CLI generates a ready-to-build project:

```bash
lokus-plugin create my-plugin
```

This creates a directory with the following structure:

```
my-plugin/
  plugin.json          # Plugin manifest
  src/
    index.js           # Entry point (activate/deactivate)
  dist/                # Build output
  package.json
  tsconfig.json        # If using TypeScript
```

For TypeScript projects, the CLI scaffolds `.ts` source files with full type definitions from the SDK.

## Plugin manifest

Every plugin needs a `plugin.json` at its root. This file defines metadata, permissions, activation triggers, and contribution points.

In Tauri desktop mode, only `plugin.json` is read. The `manifest.json` fallback is only available in browser mode (via PluginManager). For maximum compatibility, always include `plugin.json`.

### Minimal manifest

```json
{
  "id": "my-word-count",
  "name": "Word Count",
  "version": "1.0.0",
  "description": "Displays word count in the status bar",
  "main": "./dist/index.js",
  "lokusVersion": "^1.0.0",
  "author": "Your Name",
  "license": "ISC",
  "permissions": ["editor:read", "ui:create"],
  "activationEvents": ["onStartup"],
  "categories": ["Editor"]
}
```

### v2 manifest

The v2 format adds `manifest`, `engines`, `publisher`, and `capabilities` fields. Use `"manifest": "2.0"` and replace `lokusVersion` with `engines.lokus`:

```json
{
  "manifest": "2.0",
  "id": "my-word-count",
  "name": "Word Count",
  "displayName": "Word Count Plugin",
  "version": "1.0.0",
  "publisher": "your-name",
  "main": "./dist/index.js",
  "engines": { "lokus": "^1.0.0" },
  "permissions": ["editor:read", "ui:create"],
  "activationEvents": ["onStartup"],
  "categories": ["Editor"]
}
```

### Required fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier. Lowercase, letters, numbers, hyphens. Cannot start with `lokus.` |
| `name` | string | Human-readable name |
| `version` | string | Semver format (`1.0.0`) |
| `main` | string | Path to compiled entry point (`.js` or `.mjs`) |
| `lokusVersion` | string | Compatible Lokus version range (v1), or use `engines.lokus` (v2) |

### Activation events

Control when your plugin loads:

```json
{
  "activationEvents": [
    "onStartup",
    "onStartupFinished",
    "onCommand:myPlugin.hello",
    "onLanguage:markdown",
    "onView:myPlugin.sidebar",
    "workspaceContains:**/*.custom",
    "onFileSystem:myScheme",
    "onUri",
    "onDebug:node",
    "onSearch:myProvider",
    "onWebviewPanel:myPlugin.preview",
    "onCustomEditor:myPlugin.editor",
    "onAuthenticationRequest:myPlugin.auth",
    "*"
  ]
}
```

| Event | Trigger |
|---|---|
| `onStartup` | App launches (use sparingly -- impacts startup) |
| `onStartupFinished` | App has finished launching |
| `*` | Activate for all events (wildcard) |
| `onCommand:id` | A specific command is executed |
| `onLanguage:lang` | A file with that language ID opens |
| `onView:viewId` | A specific view is opened |
| `workspaceContains:pattern` | Workspace has files matching the glob |
| `onFileSystem:scheme` | A file system scheme is accessed |
| `onUri` | A URI is handled by the plugin |
| `onDebug:type` | A debug session of the given type starts |
| `onSearch:provider` | A search provider is requested |
| `onWebviewPanel:viewType` | A webview panel is opened |
| `onCustomEditor:viewType` | A custom editor is opened |
| `onAuthenticationRequest:id` | An authentication request is made |

### Contribution points

Declare what your plugin adds to Lokus in the `contributes` section:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "myPlugin.countWords",
        "title": "Count Words",
        "category": "Word Count"
      }
    ],
    "keybindings": [
      {
        "command": "myPlugin.countWords",
        "key": "ctrl+shift+w",
        "mac": "cmd+shift+w"
      }
    ],
    "configuration": {
      "title": "Word Count",
      "properties": {
        "wordCount.enabled": {
          "type": "boolean",
          "default": true,
          "description": "Enable word counting"
        }
      }
    },
    "customEditors": [],
    "webviews": []
  }
}
```

## Plugin entry point

Your `main` file must export a class with `activate()` and optionally `deactivate()` methods:

```javascript
export default class WordCountPlugin {
  constructor(context) {
    this.api = context.api;
    this.logger = context.logger;
  }

  async activate() {
    this.api.commands.register({
      id: 'wordCount.count',
      title: 'Count Words',
      handler: () => this.countWords()
    });

    this.api.ui.registerStatusBarItem({
      id: 'wordCount.status',
      text: 'Words: 0',
      tooltip: 'Click to count words',
      alignment: 'right',
      priority: 100
    });

    this.api.editor.onUpdate(() => this.updateCount());
  }

  async deactivate() {
    // Cleanup happens automatically for API-registered resources
  }

  async countWords() {
    const text = await this.api.editor.getText();
    const count = text.trim().split(/\s+/).filter(Boolean).length;
    this.api.ui.showInformationMessage(`Word count: ${count}`);
  }
}
```

### Using the SDK helpers

The SDK provides `definePlugin()` and `createPlugin()` for a simpler functional style:

```typescript
import { definePlugin } from 'lokus-plugin-sdk';

export default definePlugin({
  async activate(context) {
    const { api } = context;

    api.commands.register({
      id: 'hello.sayHello',
      title: 'Say Hello',
      handler: () => {
        api.ui.showInformationMessage('Hello from my plugin!');
      }
    });
  },

  async deactivate() {
    // Optional cleanup
  }
});
```

### Using BasePlugin

For more structure, extend `BasePlugin`. The SDK provides built-in logger, config manager, disposable tracking, and utility methods (`safeExecute`, `debounce`, `throttle`, `retry`, `measurePerformance`):

```typescript
import { BasePlugin, PluginContext } from 'lokus-plugin-sdk';

export default class MyPlugin extends BasePlugin {
  async activate(context: PluginContext) {
    await this.initialize(context);
    this.markActivationTime();

    // Use built-in helpers
    this.registerCommand('myPlugin.hello', () => {
      this.showNotification('Hello!', 'info');
    });
  }
}
```

### Using EnhancedBasePlugin

For plugins that need command palette integration, status bar items, and quick picks, extend `EnhancedBasePlugin`:

```typescript
import { EnhancedBasePlugin, PluginContext } from 'lokus-plugin-sdk';

export default class MyPlugin extends EnhancedBasePlugin {
  async activate(context: PluginContext) {
    await this.initialize(context);

    // Register command with palette visibility
    this.registerCommandWithPalette({
      id: 'myPlugin.action',
      title: 'My Action',
      category: 'My Plugin',
      handler: () => { /* ... */ }
    });

    // Create a status bar item
    this.createStatusBarItem('myPlugin.status', 'Ready', {
      tooltip: 'Plugin status',
      alignment: 'left',
      priority: 100
    });
  }
}
```

## Lifecycle

Plugins move through these states:

```
discovered -> loaded -> active
                |         |
              error     error
```

The four lifecycle states are:

| State | Description |
|---|---|
| `discovered` | Plugin folder found and manifest validated |
| `loaded` | Plugin module imported and initialized |
| `active` | Plugin `activate()` called successfully |
| `error` | An error occurred during loading or activation |

### Plugin context

Your constructor receives a `PluginContext` object:

```typescript
interface PluginContext {
  pluginId: string;          // Your plugin's ID
  manifest: PluginManifest;  // Parsed manifest
  api: LokusPluginAPI;       // Full API access
  logger: Logger;            // Scoped logger
  commands: CommandsAPI;     // Shortcut to api.commands
  ui: UIAPI;                // Shortcut to api.ui
}
```

### Cleanup

When your plugin deactivates, Lokus automatically cleans up:

- Registered commands
- Editor extensions, slash commands, toolbar items
- UI panels, status bar items, webviews
- Tree data providers
- Menu and toolbar contributions
- Output channels
- Notifications
- Terminal instances

For resources not tracked by the API, clean them up in `deactivate()`:

```javascript
async deactivate() {
  clearInterval(this.syncTimer);
  this.cache.clear();
  await this.saveState();
}
```

## Plugin styles

Lokus automatically loads CSS stylesheets from your plugin directory. Place a `style.css`, `index.css`, or `styles.css` file in your plugin root, and it will be loaded when the plugin is activated. No manifest configuration is needed.

## Plugin sandbox and security

Plugins run inside a sandboxed environment (`PluginSandbox`) that provides:

- **Isolated execution** via Web Workers (when available)
- **Resource quotas**: 50 MB memory limit, 1 second CPU time per task, 30 second network timeout, 10 MB max file access
- **Permission-based API access**: only manifest-declared permissions are granted
- **Code signing verification** (optional, when `requireSignature` is enabled)
- **Runtime monitoring**: memory usage, CPU time, network requests, and API call tracking

The security manager (`PluginSecurityManager`) enforces these constraints and can terminate plugins that exceed their quotas.

## Permissions

Declare every permission your plugin needs. The runtime enforces these -- calling an API without the matching permission throws `PermissionDeniedError`.

```json
{
  "permissions": [
    "editor:read",
    "editor:write",
    "ui:create",
    "ui:notifications",
    "commands:register",
    "storage:read",
    "storage:write"
  ]
}
```

### Permission categories

| Category | Permissions |
|---|---|
| **Editor** | `editor:read`, `editor:write` |
| **UI** | `ui:create`, `ui:notifications`, `ui:dialogs`, `ui:menus`, `ui:toolbars` |
| **Filesystem** | `filesystem:read`, `filesystem:write` |
| **Workspace** | `workspace:read`, `workspace:write` |
| **Commands** | `commands:register`, `commands:execute`, `commands:list` |
| **Network** | `network:http` |
| **Storage** | `storage:read`, `storage:write` |
| **Clipboard** | `clipboard:read`, `clipboard:write` |
| **Terminal** | `terminal:create`, `terminal:write`, `terminal:read` |
| **Languages** | `languages:register`, `languages:read` |
| **Themes** | `themes:register`, `themes:read`, `themes:set` |
| **Config** | `config:read`, `config:write` |
| **Debug** | `debug:session`, `debug:register` |

Request only what you need. Plugins requesting `all` are flagged during security scanning.

## MCP plugin system

Lokus includes a built-in MCP (Model Context Protocol) plugin system for AI-integrated plugins. The system consists of:

- **MCPPluginManager**: manages MCP-enabled plugin lifecycle with states (discovered, loading, loaded, initializing, active, error, disposed)
- **MCPProtocol**: handles JSON-RPC communication between MCP servers and clients
- **MCPClient**: connects to external MCP servers
- **MCPServerHost**: hosts MCP servers within Lokus

MCP plugins can be typed as `mcp-server`, `mcp-client`, or `mcp-hybrid`. They register resources, tools, and prompts in global registries accessible across the plugin system.

To create an MCP plugin, set the type in your manifest and use the `onMCPServer:id` activation event:

```json
{
  "id": "my-mcp-plugin",
  "type": "mcp-server",
  "activationEvents": ["onMCPServer:my-mcp-plugin"],
  "permissions": ["editor:read", "commands:register"]
}
```

## Building, testing, and publishing

Build with the CLI (`lokus-plugin build`) or add scripts to `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "validate": "lokus-plugin validate"
  }
}
```

Run `lokus-plugin validate` before publishing to check manifest fields, version format, and permissions.

### Testing with the SDK

```typescript
import { createMockContext } from 'lokus-plugin-sdk/testing';

describe('WordCountPlugin', () => {
  it('activates without error', async () => {
    const context = createMockContext();
    const plugin = new WordCountPlugin(context);
    await plugin.activate();
  });
});
```

### Development workflow

```bash
lokus-plugin dev       # Watch mode with hot reload
lokus-plugin link      # Symlink to ~/.lokus/plugins/ for live testing
lokus-plugin package   # Create .tgz for distribution
lokus-plugin publish   # Upload to registry (run lokus-plugin login first)
```

## CLI command reference

The following commands are registered and functional in the CLI:

| Command | Description |
|---|---|
| `lokus-plugin create <name>` | Scaffold a new plugin project |
| `lokus-plugin build` | Build the plugin |
| `lokus-plugin dev` | Start development mode with hot reload |
| `lokus-plugin validate` | Validate the plugin manifest |
| `lokus-plugin package` | Create a distributable package |
| `lokus-plugin publish` | Publish to a registry |
| `lokus-plugin link` | Symlink plugin for local development |
| `lokus-plugin login` | Authenticate with the registry |
| `lokus-plugin test` | Run plugin tests |
| `lokus-plugin docs` | Generate plugin documentation |

## Example: slash command plugin

A plugin that adds a `/date` slash command:

```javascript
// src/index.js
export default class InsertDatePlugin {
  constructor(context) { this.api = context.api; }

  async activate() {
    await this.api.editor.addSlashCommand({
      name: 'date',
      description: 'Insert current date',
      icon: 'calendar',
      execute: () => {
        this.api.editor.replaceSelection(new Date().toLocaleDateString());
      }
    });
  }

  async deactivate() {}
}
```

Set `"permissions": ["editor:write"]` in `plugin.json`, build, copy to `~/.lokus/plugins/`, and restart Lokus.
