---
title: Using Plugins
description: Install, enable, disable, and configure Lokus plugins.
---

Lokus plugins extend the editor with custom commands, UI panels, themes, language features, and integrations. This guide covers installing and managing them.

## Plugin directories

Lokus looks for plugins in two directories under your home folder:

```
~/.lokus/plugins/
~/.lokus/extensions/
```

Both directories are created automatically on first launch. Drop a plugin folder into either location and restart Lokus to pick it up.

## Installing a plugin

### Manual installation

1. Download or clone the plugin repository.
2. Run `npm install && npm run build` inside the plugin directory.
3. Copy the built plugin folder to `~/.lokus/plugins/`.
4. Restart Lokus.

### From a URL

Lokus supports installing plugins directly from a URL. The Tauri backend downloads and extracts the plugin package into the plugins directory:

```javascript
// Programmatic installation via PluginAPI
await api.installPluginFromUrl('https://example.com/my-plugin-1.0.0.tgz');
```

### From a Git repository

The plugin loader can clone and install plugins from Git repositories:

```javascript
await pluginLoader.installFromGit('https://github.com/user/lokus-plugin-example.git');
```

### Using the CLI for development

The `lokus-plugin-cli` tool is primarily for plugin development. Install it globally:

```bash
npm install -g lokus-plugin-cli
```

The following commands are available for developing and publishing plugins:

```bash
lokus-plugin create my-plugin    # Scaffold a new plugin project
lokus-plugin build               # Build the plugin
lokus-plugin dev                 # Watch mode with hot reload
lokus-plugin validate            # Validate the plugin manifest
lokus-plugin package             # Create a distributable package
lokus-plugin publish             # Publish to a registry
lokus-plugin link                # Symlink plugin for local development
lokus-plugin login               # Authenticate with the registry
lokus-plugin test                # Run plugin tests
lokus-plugin docs                # Generate plugin documentation
```

## Plugin discovery

On startup, the plugin manager scans both plugin directories for folders containing a `plugin.json` file. In Tauri desktop mode, only `plugin.json` is read. The `manifest.json` fallback is only available in browser mode.

Each discovered plugin is validated against the manifest schema and registered in the internal plugin registry.

View discovered plugins from the command palette or by checking the plugin system status programmatically.

## Enabling and disabling plugins

### Activate a plugin

Plugins load automatically based on their `activationEvents`. A plugin with `"activationEvents": ["onStartup"]` activates immediately. Others wait for a trigger -- opening a file type, running a command, or matching a workspace pattern.

To manually activate a loaded plugin, use the command palette:

```
Lokus: Activate Plugin -> [plugin-name]
```

### Deactivate a plugin

Deactivating a plugin calls its `deactivate()` method, cleans up all registered commands, panels, toolbar items, and editor extensions, then marks the plugin as inactive.

```
Lokus: Deactivate Plugin -> [plugin-name]
```

Dependent plugins are deactivated first, in reverse dependency order.

### Reload a plugin

Reloading unloads and re-loads a plugin without restarting Lokus. Useful during development:

```
Lokus: Reload Plugin -> [plugin-name]
```

## Plugin settings

Plugins define their own configuration through the `contributes.configuration` section of their manifest. Settings are stored per-plugin and accessed through the Settings panel.

Example configuration definition in a plugin manifest:

```json
{
  "contributes": {
    "configuration": {
      "title": "Word Count",
      "properties": {
        "wordCount.showInStatusBar": {
          "type": "boolean",
          "default": true,
          "description": "Show word count in the status bar"
        },
        "wordCount.countWhitespace": {
          "type": "boolean",
          "default": false,
          "description": "Include whitespace in character count"
        }
      }
    }
  }
}
```

Plugins read their settings at runtime with the Configuration API:

```javascript
const showInStatusBar = await api.config.get('wordCount.showInStatusBar', true);
```

## Permissions

Each plugin declares the permissions it needs in its manifest. Lokus enforces these at runtime -- a plugin without `filesystem:write` permission cannot write files, even if it tries.

Common permission groups:

| Permission | Access granted |
|---|---|
| `editor:read` | Read editor content and selections |
| `editor:write` | Modify editor content, add extensions |
| `ui:create` | Create panels, status bar items, webviews |
| `ui:notifications` | Show notifications and messages |
| `filesystem:read` | Read files within the workspace |
| `filesystem:write` | Write files within the workspace |
| `commands:register` | Register commands |
| `network:http` | Make HTTP requests |
| `storage:read` | Read plugin storage |
| `storage:write` | Write plugin storage |
| `clipboard:read` | Read from clipboard |
| `clipboard:write` | Write to clipboard |
| `terminal:create` | Create terminal instances |

Review a plugin's requested permissions before installing it. Plugins requesting `all` or `shell:execute` warrant extra scrutiny.

## Plugin sandbox

Plugins run in a sandboxed environment that enforces resource limits and permission boundaries:

- **Memory**: 50 MB default limit per plugin
- **CPU**: 1 second CPU time per task
- **Network**: 30 second timeout
- **File access**: 10 MB max file size

The sandbox uses Web Workers for isolation when available. Plugins that exceed their resource quotas are terminated. The security manager also supports optional code signing verification.

## Checking plugin status

The plugin system uses four lifecycle states:

| State | Description |
|---|---|
| `discovered` | Plugin found and manifest validated |
| `loaded` | Plugin module imported and initialized |
| `active` | Plugin currently running |
| `error` | An error occurred (shows error message in plugin info panel) |

View active and loaded plugins through the plugin system:

- **Total plugins** -- all discovered plugins
- **Loaded plugins** -- validated and loaded into memory
- **Active plugins** -- currently running

Plugins in an `error` state show their error message in the plugin info panel. Fix the issue and reload to recover.

## MCP plugins

Lokus includes a built-in MCP (Model Context Protocol) plugin system for AI-integrated plugins. MCP plugins can act as servers (providing tools, resources, and prompts), clients (consuming MCP services), or hybrids.

The MCP plugin system is managed by the `MCPPluginManager` and provides:

- Server and client protocol handling via `MCPProtocol`
- Global registries for MCP resources, tools, and prompts
- Communication channels between MCP servers and clients
- Integration with the plugin sandbox for security

MCP plugins are activated via the `onMCPServer:id` activation event and follow the same permission model as regular plugins.

## Inter-plugin communication

Plugins can communicate with each other through the `PluginCommunicationProtocol`. This enables plugins to share data, invoke each other's functionality, and coordinate behavior without tight coupling.

## Uninstalling a plugin

Remove the plugin's folder from `~/.lokus/plugins/` or `~/.lokus/extensions/` and restart Lokus. Any commands, panels, or extensions registered by that plugin are cleaned up automatically on the next startup.

## Troubleshooting

**Plugin not discovered:**
Check that the plugin folder contains a valid `plugin.json` with all required fields (`id`, `name`, `version`, `main`). In Tauri desktop mode, `manifest.json` alone is not sufficient -- you must include `plugin.json`.

**Plugin stuck in error state:**
Check the Lokus developer console for the specific error. Common causes: missing `main` entry file, invalid version format, unresolved dependency.

**Permission denied errors:**
The plugin is calling an API it did not request permission for. Update the plugin's `permissions` array in its manifest.

**Circular dependency detected:**
Two or more plugins depend on each other. Remove one of the circular dependencies from the plugin manifests.

**Plugin exceeding resource limits:**
The sandbox may terminate plugins that use too much memory or CPU. Optimize your plugin or request higher limits if needed.
