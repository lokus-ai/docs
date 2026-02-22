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

### From the CLI

Install the `lokus-plugin-cli` tool globally:

```bash
npm install -g lokus-plugin-cli
```

Then install a plugin by its ID:

```bash
lokus-plugin install publisher.plugin-name
```

This downloads the plugin package and places it in `~/.lokus/plugins/`.

### From a registry

If a plugin registry is configured, Lokus can install plugins directly:

```bash
lokus-plugin install my-word-count --version 1.2.0
```

Omit `--version` to install the latest release.

### Manual installation

1. Download or clone the plugin repository.
2. Run `npm install && npm run build` inside the plugin directory.
3. Copy the built plugin folder to `~/.lokus/plugins/`.
4. Restart Lokus.

## Plugin discovery

On startup, the plugin manager scans both plugin directories for folders containing a `plugin.json` or `manifest.json` file. Each discovered plugin is validated against the manifest schema and registered in the internal plugin registry.

View discovered plugins from the command palette or by checking the plugin system status programmatically.

## Enabling and disabling plugins

### Activate a plugin

Plugins load automatically based on their `activationEvents`. A plugin with `"activationEvents": ["onStartup"]` activates immediately. Others wait for a trigger -- opening a file type, running a command, or matching a workspace pattern.

To manually activate a loaded plugin, use the command palette:

```
Lokus: Activate Plugin → [plugin-name]
```

### Deactivate a plugin

Deactivating a plugin calls its `deactivate()` method, cleans up all registered commands, panels, toolbar items, and editor extensions, then marks the plugin as inactive.

```
Lokus: Deactivate Plugin → [plugin-name]
```

Dependent plugins are deactivated first, in reverse dependency order.

### Reload a plugin

Reloading unloads and re-loads a plugin without restarting Lokus. Useful during development:

```
Lokus: Reload Plugin → [plugin-name]
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

## Checking plugin status

View active and loaded plugins through the plugin system:

- **Total plugins** -- all discovered plugins
- **Loaded plugins** -- validated and loaded into memory
- **Active plugins** -- currently running

Plugins in an `error` state show their error message in the plugin info panel. Fix the issue and reload to recover.

## Uninstalling a plugin

Remove the plugin's folder from `~/.lokus/plugins/` or `~/.lokus/extensions/` and restart Lokus. Any commands, panels, or extensions registered by that plugin are cleaned up automatically on the next startup.

## Troubleshooting

**Plugin not discovered:**
Check that the plugin folder contains a valid `plugin.json` or `manifest.json` with all required fields (`id`, `name`, `version`, `main`).

**Plugin stuck in error state:**
Check the Lokus developer console for the specific error. Common causes: missing `main` entry file, invalid version format, unresolved dependency.

**Permission denied errors:**
The plugin is calling an API it did not request permission for. Update the plugin's `permissions` array in its manifest.

**Circular dependency detected:**
Two or more plugins depend on each other. Remove one of the circular dependencies from the plugin manifests.
