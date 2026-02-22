---
title: Plugin API Reference
description: Complete API reference for all Lokus plugin APIs with method signatures, parameters, and return types.
---

The `LokusPluginAPI` is the top-level object passed to plugins via `context.api`. It provides access to all sub-APIs: editor, UI, filesystem, commands, network, storage, clipboard, workspace, languages, themes, configuration, terminal, tasks, debug, and notifications.

Every API method is permission-gated. Calling a method without the required permission throws `PermissionDeniedError`.

## API overview

```javascript
// Inside your plugin
const api = context.api;

api.editor      // EditorAPI - editor content and extensions
api.ui          // UIAPI - panels, dialogs, status bar, webviews
api.commands    // CommandsAPI - register and execute commands
api.fs          // FilesystemAPI - file read/write operations
api.network     // NetworkAPI - HTTP requests
api.storage     // DataAPI - key-value storage
api.clipboard   // ClipboardAPI - clipboard read/write
api.workspace   // WorkspaceAPI - workspace folders and configuration
api.languages   // LanguagesAPI - language feature providers
api.themes      // ThemeAPI - theme registration
api.config      // ConfigurationAPI - configuration values
api.terminal    // TerminalAPI - terminal instances
api.notifications // NotificationsAPI - show/hide notifications
api.tasks       // TaskAPI - task providers
api.debug       // DebugAPI - debug sessions
```

---

## EditorAPI

Access to the TipTap editor. Read content, insert nodes, register extensions, add slash commands, and listen for updates.

**Required permissions:** `editor:read` for read operations, `editor:write` for modifications.

### Content methods

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `getText()` | -- | `Promise<string>` | `editor:read` | Get the full editor text content |
| `getSelection()` | -- | `Promise<Selection>` | `editor:read` | Get the current selection |
| `replaceSelection(content)` | `content: string` | `Promise<void>` | `editor:write` | Replace the current selection with new content |
| `insertNode(type, attrs, content)` | `type: string`, `attrs?: object`, `content?: string` | `Promise<void>` | `editor:write` | Insert a node at the cursor position |
| `onUpdate(callback)` | `callback: Function` | `Disposable` | `editor:read` | Subscribe to editor content changes |

```javascript
const text = await api.editor.getText();
const sel = await api.editor.getSelection(); // { start, end, isEmpty, isSingleLine }
await api.editor.replaceSelection('New text');
await api.editor.insertNode('heading', { level: 2 }, 'My Heading');
```

### Extension methods

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `addExtension(options)` | See below | `Promise<string>` | `editor:write` | Register a TipTap extension |
| `removeExtension(extensionId)` | `extensionId: string` | `void` | `editor:write` | Remove a registered extension |

#### addExtension(options)

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Extension name |
| `type` | string | No | `'extension'` (default), `'node'`, or `'mark'` |
| `schema` | object | No | ProseMirror schema definition |
| `view` | object | No | Node view definition |
| `commands` | object | No | Commands the extension provides |
| `inputRules` | array | No | Input rules for auto-formatting |
| `keyboardShortcuts` | object | No | Keyboard shortcut mappings |

```javascript
const extId = await api.editor.addExtension({
  name: 'highlight',
  type: 'mark',
  schema: {
    attrs: { color: { default: 'yellow' } },
    parseDOM: [{ tag: 'mark' }],
    toDOM: (node) => ['mark', { style: `background: ${node.attrs.color}` }, 0]
  }
});
```

### Slash commands

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `addSlashCommand(options)` | See below | `Promise<string>` | `editor:write` | Add a slash command to the editor |

#### addSlashCommand(options)

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Command name (what users type after `/`) |
| `description` | string | Yes | Description shown in the slash menu |
| `icon` | string | No | Icon identifier |
| `aliases` | string[] | No | Alternative names |
| `execute` | Function | Yes | Handler called when the command is selected |

```javascript
await api.editor.addSlashCommand({
  name: 'callout',
  description: 'Insert a callout box',
  icon: 'info',
  aliases: ['note', 'tip'],
  execute: () => {
    api.editor.insertNode('callout', { type: 'info' }, 'Your note here');
  }
});
```

### Context menu and toolbar

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `addContextMenuItem(options)` | `{ id, name, icon, condition, execute }` | `string` | `editor:write` | Add a context menu item |
| `addToolbarItem(options)` | `{ id, title, icon, group, handler, isActive, isDisabled }` | `string` | `editor:write` | Add a toolbar button |
| `addKeyboardShortcut(options)` | `{ key, handler, description }` | `string` | `editor:write` | Add a keyboard shortcut |
| `addDropHandler(options)` | `{ accept, handler }` | `string` | `editor:write` | Handle drag-and-drop events |

```javascript
api.editor.addContextMenuItem({
  id: 'myPlugin.format', name: 'Format', icon: 'format',
  condition: () => true, execute: () => { /* ... */ }
});

api.editor.addToolbarItem({
  id: 'myPlugin.bold', title: 'Bold', icon: 'bold',
  group: 'formatting', handler: () => { /* ... */ }
});

api.editor.addKeyboardShortcut({
  key: 'Mod-Shift-H', description: 'Highlight', handler: () => { /* ... */ }
});

api.editor.addDropHandler({
  accept: ['image/png', 'image/jpeg'], handler: (files) => { /* ... */ }
});
```

### Editor events

| Event | Data | Description |
|---|---|---|
| `extension_added` | `{ name, extensionId, type }` | Extension registered |
| `extension_removed` | `{ extensionId }` | Extension removed |
| `slash_command_added` | `{ name, commandId }` | Slash command registered |
| `toolbar_item_added` | `{ id, itemId }` | Toolbar item added |
| `context_menu_item_added` | `{ id, itemId }` | Context menu item added |

---

## UIAPI

Create panels, show notifications, display dialogs, register status bar items, create webview panels, and manage output channels.

**Required permissions:** `ui:create`, `ui:notifications`, `ui:dialogs`, `ui:menus`, `ui:toolbars` depending on the method.

### Notifications and messages

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `showInformationMessage(message, ...items)` | `message: string` | `Promise<void>` | `ui:notifications` | Show an info message |
| `showWarningMessage(message, ...items)` | `message: string` | `Promise<void>` | `ui:notifications` | Show a warning message |
| `showErrorMessage(message, ...items)` | `message: string` | `Promise<void>` | `ui:notifications` | Show an error message |
| `showNotification(message, type, actions)` | `message: string`, `type?: string`, `actions?: array` | `Promise<string\|undefined>` | `ui:notifications` | Show a notification with optional action buttons |

```javascript
api.ui.showInformationMessage('Operation complete');
api.ui.showErrorMessage('Connection failed');

const action = await api.ui.showNotification('Unsaved changes', 'warning', [
  { id: 'save', label: 'Save' }, { id: 'discard', label: 'Discard' }
]);
```

### Dialogs

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `showInputBox(options)` | `{ title, prompt, placeholder, value, validateInput }` | `Promise<string\|null>` | `ui:dialogs` | Show a text input dialog |
| `showQuickPick(items, options)` | `items: array`, `options?: object` | `Promise<item\|undefined>` | `ui:dialogs` | Show a selection list |
| `showConfirm(options)` | `{ title, message, confirmText, cancelText }` | `Promise<boolean>` | `ui:dialogs` | Show a confirmation dialog |
| `showDialog(options)` | `{ title, message, type, buttons, detail }` | `Promise<{ buttonId }>` | `ui:dialogs` | Show a modal dialog with custom buttons |
| `showOpenDialog(options)` | `{ canSelectMany, canSelectFolders, filters, title }` | `Promise<string[]\|undefined>` | `ui:dialogs` | Show a file open dialog |
| `showSaveDialog(options)` | `{ filters, defaultUri, title }` | `Promise<string\|undefined>` | `ui:dialogs` | Show a file save dialog |

```javascript
const name = await api.ui.showInputBox({ title: 'Name', prompt: 'Project name?' });
const choice = await api.ui.showQuickPick(
  [{ label: 'Option A' }, { label: 'Option B' }],
  { title: 'Pick one' }
);
const confirmed = await api.ui.showConfirm({ title: 'Delete?', message: 'Are you sure?' });
```

### Panels

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `addPanel(options)` | `{ id, title, position, icon, component, props }` | `Panel` | `ui:create` | Add a UI panel |
| `registerPanel(options)` | `{ id, title, location, icon, initialState }` | `Disposable` | `ui:create` | Register a panel (SDK alias) |
| `removePanel(id)` | `id: string` | `boolean` | -- | Remove a panel |
| `updatePanel(id, props)` | `id: string`, `props: object` | `Panel` | -- | Update panel properties |

Panel positions: `'sidebar-left'`, `'sidebar-right'`, `'bottom'`, `'modal'`.

```javascript
api.ui.addPanel({
  id: 'myPlugin.explorer',
  title: 'My Explorer',
  position: 'sidebar-left',
  icon: 'folder',
  props: { rootPath: '/workspace' }
});
```

### Status bar

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `registerStatusBarItem(definition)` | See below | `StatusBarItem` | `ui:create` | Add a status bar item |

#### registerStatusBarItem(definition)

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique identifier |
| `text` | string | Yes | Display text |
| `tooltip` | string | No | Hover tooltip |
| `command` | string\|object | No | Command to execute on click |
| `alignment` | number | No | 1 = left, 2 = right (default) |
| `priority` | number | No | Sort order (higher = closer to edge) |
| `color` | string | No | Text color |
| `backgroundColor` | string | No | Background color |

Returns a `StatusBarItem` with `show()`, `hide()`, and `dispose()` methods.

```javascript
const item = api.ui.registerStatusBarItem({
  id: 'myPlugin.status',
  text: 'Ready',
  tooltip: 'Plugin status',
  alignment: 2,
  priority: 100
});

// Update text later
item.text = 'Processing...';

// Hide when not needed
item.hide();
```

### Webviews

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `registerWebviewPanel(panel)` | `{ id, title, html }` | `WebviewPanel` | `ui:create` | Create a webview panel with custom HTML |

The returned `WebviewPanel` has:

| Property/Method | Type | Description |
|---|---|---|
| `id` | string | Panel ID |
| `title` | string | Panel title |
| `html` | string | HTML content |
| `postMessage(message)` | Function | Send a message to the webview |
| `onDidReceiveMessage(handler)` | Function | Listen for messages from the webview. Returns `Disposable` |
| `dispose()` | Function | Close and clean up the webview |

```javascript
const panel = api.ui.registerWebviewPanel({
  id: 'myPlugin.preview', title: 'Preview',
  html: '<html><body><h1>Hello</h1></body></html>'
});
panel.onDidReceiveMessage((msg) => console.log(msg));
panel.postMessage({ type: 'update', data: 'new content' });
```

### Tree views

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `registerTreeDataProvider(viewId, provider, options)` | `viewId: string`, `provider: TreeDataProvider`, `options?: { title }` | `Disposable` | `ui:create` | Register a tree view |

The `provider` must implement:

```typescript
{
  getTreeItem(element: any): TreeItem;
  getChildren(element?: any): any[];
  onDidChangeTreeData?: Event;
}
```

```javascript
api.ui.registerTreeDataProvider('myPlugin.files', {
  getTreeItem: (el) => ({ label: el.name, collapsibleState: el.isDir ? 1 : 0 }),
  getChildren: (el) => el ? getChildItems(el) : getRootItems()
}, { title: 'My Files' });
```

### Menus and toolbars

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `registerMenu(menu)` | `{ id, label, group, order, when, command, icon }` | `Disposable` | `ui:menus` | Register a menu item |
| `registerToolbar(toolbar)` | `{ id, title, location, group, items, when }` | `Disposable` | `ui:toolbars` | Register a toolbar |

```javascript
const menuDisposable = api.ui.registerMenu({
  id: 'myPlugin.action',
  label: 'My Action',
  group: 'navigation',
  command: 'myPlugin.doAction',
  icon: 'zap'
});
```

### Output channels

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `createOutputChannel(name)` | `name: string` | `OutputChannel` | `ui:create` | Create an output channel for logging |

The returned `OutputChannel` has:

| Method | Description |
|---|---|
| `append(value)` | Append text without a newline |
| `appendLine(value)` | Append text with a newline |
| `replace(value)` | Replace all content |
| `clear()` | Clear the channel |
| `show(preserveFocus?)` | Show the channel |
| `hide()` | Hide the channel |
| `dispose()` | Dispose the channel |

```javascript
const output = api.ui.createOutputChannel('My Plugin');
output.appendLine('Plugin started');
output.show();
```

### Terminals

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `createTerminal(options)` | `{ name, shellPath, shellArgs, cwd, env }` | `Terminal` | `terminal:create` | Create a terminal instance |

The returned `Terminal` has:

| Method | Description |
|---|---|
| `sendText(text, addNewLine?)` | Send text to the terminal |
| `show(preserveFocus?)` | Show the terminal |
| `hide()` | Hide the terminal |
| `dispose()` | Close and dispose the terminal |

```javascript
const terminal = api.ui.createTerminal({
  name: 'Build',
  cwd: '/workspace'
});
terminal.show();
terminal.sendText('npm run build');
```

### Progress

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `withProgress(options, task)` | `options: { location, title, cancellable }`, `task: Function` | `Promise<any>` | `ui:create` | Show progress while running a task |

```javascript
await api.ui.withProgress({ title: 'Building...', cancellable: true }, async (progress) => {
  progress.report({ message: 'Compiling...', increment: 50 });
  await compile();
  progress.report({ message: 'Done', increment: 100 });
});
```

---

## CommandsAPI

Register, execute, and query commands.

**Required permissions:** `commands:register`, `commands:execute`, `commands:list`.

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `register(command)` | `command: object \| object[]` | `Disposable` | `commands:register` | Register one or more commands |
| `register(id, options)` | `id: string`, `options: object` | `Disposable` | `commands:register` | Register a command by ID |
| `execute(commandId, ...args)` | `commandId: string` | `Promise<any>` | `commands:execute` | Execute a registered command |
| `getAll()` | -- | `Array<CommandInfo>` | `commands:list` | List all registered commands |
| `getByCategory(category)` | `category: string` | `Array<CommandInfo>` | `commands:list` | List commands in a category |
| `exists(commandId)` | `commandId: string` | `boolean` | -- | Check if a command exists |
| `registerWithPalette(command)` | `command: object` | `Disposable` | `commands:register` | Register and show in command palette |
| `registerTextEditorCommand(command)` | `command: object` | `Disposable` | `commands:register` | Register a command requiring an active editor |
| `unregister(commandIds)` | `commandIds: string \| string[]` | `Array` | -- | Unregister commands |

### Command definition

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique command identifier |
| `title` | string | No | Display title |
| `name` | string | No | Alternative to title |
| `handler` | Function | Yes | Function to execute (also accepts `execute` or `callback`) |
| `description` | string | No | Command description |
| `category` | string | No | Category for grouping |
| `icon` | string | No | Icon identifier |
| `shortcut` | string | No | Keyboard shortcut |
| `showInPalette` | boolean | No | Show in command palette |
| `requiresEditor` | boolean | No | Requires active editor |

```javascript
const disposable = api.commands.register({
  id: 'myPlugin.greet', title: 'Greet', category: 'My Plugin',
  handler: () => api.ui.showInformationMessage('Hello!')
});
await api.commands.execute('myPlugin.greet');
disposable.dispose(); // Unregister
```

---

## FilesystemAPI

Read and write files within the plugin's scoped directory. All paths are relative to the plugin directory and validated against the workspace boundary.

**Required permissions:** `filesystem:read`, `filesystem:write`.

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `readFile(relativePath)` | `relativePath: string` | `Promise<Buffer>` | `filesystem:read` | Read file contents |
| `writeFile(relativePath, content)` | `relativePath: string`, `content: string` | `Promise<void>` | `filesystem:write` | Write content to a file |
| `exists(relativePath)` | `relativePath: string` | `Promise<boolean>` | `filesystem:read` | Check if a path exists |
| `readdir(relativePath)` | `relativePath: string` | `Promise<Array>` | `filesystem:read` | List directory contents |
| `mkdir(relativePath)` | `relativePath: string` | `Promise<void>` | `filesystem:write` | Create a directory |
| `ensureDir(relativePath)` | `relativePath: string` | `Promise<void>` | `filesystem:write` | Create directory if it does not exist |
| `delete(relativePath)` | `relativePath: string` | `Promise<void>` | `filesystem:write` | Delete a file or directory |
| `rename(oldPath, newPath)` | `oldPath: string`, `newPath: string` | `Promise<void>` | `filesystem:write` | Rename or move a file |
| `copy(source, destination)` | `source: string`, `dest: string` | `Promise<void>` | `filesystem:write` | Copy a file |
| `stat(path)` | `path: string` | `Promise<FileStat>` | `filesystem:read` | Get file metadata |
| `openFileDialog(options)` | `{ accept, multiple, title }` | `Promise<Array>` | `filesystem:read` | Show a file picker dialog |

```javascript
const content = await api.fs.readFile('data/config.json');
await api.fs.writeFile('output/result.txt', 'Hello World');
const entries = await api.fs.readdir('data');
```

**Security:** Paths containing `..` are rejected. All paths are scoped to the plugin's directory within the workspace.

---

## NetworkAPI

Make HTTP requests from your plugin.

**Required permissions:** `network:http`.

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `fetch(url, options)` | `url: string`, `options?: RequestInit` | `Promise<Response>` | `network:http` | Make an HTTP request |

```javascript
const resp = await api.network.fetch('https://api.example.com/data', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'test' })
});
```

---

## DataAPI (Storage)

Persistent key-value storage scoped to your plugin. Backed by a database when available, with localStorage fallback.

**Required permissions:** `storage:read`, `storage:write`.

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `get(key)` | `key: string` | `Promise<any>` | `storage:read` | Get a stored value |
| `set(key, value)` | `key: string`, `value: any` | `Promise<void>` | `storage:write` | Store a value |
| `delete(key)` | `key: string` | `Promise<void>` | `storage:write` | Delete a stored value |
| `keys()` | -- | `Promise<string[]>` | `storage:read` | List all stored keys |
| `clear()` | -- | `Promise<void>` | `storage:write` | Delete all stored values |
| `getDatabase(name)` | `name: string` | `Promise<Database>` | `storage:read` | Get a named database instance |

```javascript
await api.storage.set('lastSync', Date.now());
const lastSync = await api.storage.get('lastSync');
const keys = await api.storage.keys();
```

---

## ClipboardAPI

Read and write system clipboard content.

**Required permissions:** `clipboard:read`, `clipboard:write`.

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `read()` | -- | `Promise<ClipboardItems>` | `clipboard:read` | Read clipboard content |
| `writeText(text)` | `text: string` | `Promise<void>` | `clipboard:write` | Write text to clipboard |

```javascript
await api.clipboard.writeText('Copied from plugin');
const content = await api.clipboard.read();
```

---

## WorkspaceAPI

Access workspace folders, root path, and workspace-level configuration.

**Required permissions:** `workspace:read`, `workspace:write`.

| Property/Method | Type | Permission | Description |
|---|---|---|---|
| `rootPath` | `string` | `workspace:read` | Workspace root directory path |
| `workspaceFolders` | `Array` | `workspace:read` | List of workspace folders |
| `getConfiguration(section)` | `Function` | `workspace:read` | Get workspace configuration for a section |

```javascript
const root = api.workspace.rootPath;
const folders = api.workspace.workspaceFolders;
const config = api.workspace.getConfiguration('editor');
```

---

## ConfigurationAPI

Read and write configuration values. Changes emit events that other plugins can listen to.

**Required permissions:** `config:read`, `config:write`.

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `get(key, defaultValue)` | `key: string`, `defaultValue?: any` | `Promise<any>` | `config:read` | Get a configuration value |
| `set(key, value)` | `key: string`, `value: any` | `Promise<void>` | `config:write` | Set a configuration value |
| `update(key, value)` | `key: string`, `value: any` | `Promise<void>` | `config:write` | Update a configuration value (alias for set) |
| `has(key)` | `key: string` | `Promise<boolean>` | `config:read` | Check if a key exists |
| `inspect(key)` | `key: string` | `Promise<object>` | `config:read` | Get detailed config info including defaults and overrides |
| `onDidChange(callback)` | `callback: Function` | `Disposable` | `config:read` | Listen for configuration changes |

```javascript
const fontSize = await api.config.get('editor.fontSize', 14);

await api.config.set('myPlugin.autoSave', true);

api.config.onDidChange((event) => {
  console.log(`Config changed: ${event.key}`);
});
```

---

## LanguagesAPI

Register language feature providers: completions, hover, definitions, references, formatting, and more.

**Required permissions:** `languages:register`, `languages:read`.

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `registerCompletionProvider(selector, provider, ...triggers)` | `selector: string`, `provider: object`, `...triggers: string[]` | `Disposable` | `languages:register` | Register autocomplete provider |
| `registerHoverProvider(selector, provider)` | `selector: string`, `provider: object` | `Disposable` | `languages:register` | Register hover information |
| `registerDefinitionProvider(selector, provider)` | `selector: string`, `provider: object` | `Disposable` | `languages:register` | Register go-to-definition |
| `registerReferenceProvider(selector, provider)` | `selector: string`, `provider: object` | `Disposable` | `languages:register` | Register find references |
| `registerDocumentSymbolProvider(selector, provider)` | `selector: string`, `provider: object` | `Disposable` | `languages:register` | Register document symbol outline |
| `registerCodeActionProvider(selector, provider)` | `selector: string`, `provider: object` | `Disposable` | `languages:register` | Register code actions (quick fixes) |
| `registerCodeLensProvider(selector, provider)` | `selector: string`, `provider: object` | `Disposable` | `languages:register` | Register code lens annotations |
| `registerFormattingProvider(selector, provider)` | `selector: string`, `provider: object` | `Disposable` | `languages:register` | Register document formatter |
| `registerSignatureHelpProvider(selector, provider)` | `selector: string`, `provider: object` | `Disposable` | `languages:register` | Register signature help |
| `registerDiagnosticProvider(selector, provider)` | `selector: string`, `provider: object` | `Disposable` | `languages:register` | Register diagnostics/linting |
| `registerLanguage(definition)` | `definition: object` | `Disposable` | `languages:register` | Register a new language |
| `getLanguages()` | -- | `Array` | `languages:read` | List registered languages |

```javascript
// Completion provider
api.languages.registerCompletionProvider('markdown', {
  provideCompletionItems(document, position) {
    return [{ label: 'mySnippet', kind: 1, insertText: 'Inserted text' }];
  }
}, '@');

// Hover provider
api.languages.registerHoverProvider('markdown', {
  provideHover(document, position) {
    return { contents: ['**Hover info**', 'Details here'] };
  }
});
```

---

## ThemeAPI

Register and manage color themes.

**Required permissions:** `themes:register`, `themes:read`, `themes:set`.

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `registerTheme(theme)` | See below | `Disposable` | `themes:register` | Register a color theme |
| `getActiveTheme()` | -- | `Theme` | `themes:read` | Get the currently active theme |
| `getThemes()` | -- | `Array<Theme>` | `themes:read` | List all available themes |
| `setActiveTheme(themeId)` | `themeId: string` | `void` | `themes:set` | Switch to a theme |
| `onDidChangeTheme(callback)` | `callback: Function` | `Disposable` | `themes:read` | Listen for theme changes |

### registerTheme(theme)

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique theme identifier |
| `label` | string | Yes | Display name |
| `uiTheme` | string | Yes | Base theme: `'vs'`, `'vs-dark'`, `'hc-black'`, `'hc-light'` |
| `path` | string | No | Path to theme JSON file |
| `colors` | object | No | Color customizations (key-value pairs) |
| `tokenColors` | array | No | Token color rules for syntax highlighting |

```javascript
api.themes.registerTheme({
  id: 'myPlugin.oceanDark', label: 'Ocean Dark', uiTheme: 'vs-dark',
  colors: { 'editor.background': '#1a2b3c', 'editor.foreground': '#c0d0e0' },
  tokenColors: [{ scope: 'keyword', settings: { foreground: '#ff7b72' } }]
});
```

---

## TerminalAPI

Create and manage terminal instances.

**Required permissions:** `terminal:create`, `terminal:write`, `terminal:read`.

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `createTerminal(options)` | `{ name, shellPath, shellArgs, cwd, env }` | `Terminal` | `terminal:create` | Create a new terminal |
| `getActiveTerminal()` | -- | `Terminal\|null` | `terminal:read` | Get the active terminal |

### Terminal events

| Event | Data | Description |
|---|---|---|
| `terminal-opened` | `Terminal` | Terminal was created |
| `terminal-closed` | `{ terminalId }` | Terminal was closed |
| `active-terminal-changed` | `Terminal` | Active terminal changed |

```javascript
const term = api.terminal.createTerminal({
  name: 'Build Runner',
  cwd: api.workspace.rootPath
});
term.sendText('npm run build');
term.show();
```

---

## NotificationsAPI

Show, update, and hide notifications.

| Method | Parameters | Returns | Description |
|---|---|---|---|
| `show(options)` | `{ type, message, title, duration, persistent, progress }` | `string` (notification ID) | Show a notification |
| `update(id, updates)` | `id: string`, `updates: object` | `Notification` | Update an existing notification |
| `hide(id)` | `id: string` | `boolean` | Hide a notification |

Notification types: `'info'`, `'success'`, `'warning'`, `'error'`, `'loading'`, `'progress'`.

```javascript
const id = api.notifications.show({ type: 'loading', message: 'Building...', persistent: true });
api.notifications.update(id, { message: 'Done!', type: 'success' });
setTimeout(() => api.notifications.hide(id), 3000);
```

---

## TaskAPI

Register and manage task providers for build, test, and other project tasks.

**Required permissions:** `tasks:register`, `tasks:execute`.

Task providers define discoverable tasks that users can run from the command palette or task runner.

---

## DebugAPI

Start debug sessions, manage breakpoints, and register debug adapters.

**Required permissions:** `debug:session`, `debug:register`.

| Method | Parameters | Returns | Permission | Description |
|---|---|---|---|---|
| `startDebugging(config)` | `config: object` | `Promise<boolean>` | `debug:session` | Start a debug session |
| `stopDebugging()` | -- | `Promise<void>` | `debug:session` | Stop the current session |
| `registerDebugAdapterProvider(type, provider)` | `type: string`, `provider: object` | `Disposable` | `debug:register` | Register a debug adapter |
| `registerDebugConfigurationProvider(type, provider)` | `type: string`, `provider: object` | `Disposable` | `debug:register` | Register debug configurations |
| `addBreakpoints(breakpoints)` | `breakpoints: array` | `void` | `debug:session` | Add breakpoints |
| `removeBreakpoints(breakpoints)` | `breakpoints: array` | `void` | `debug:session` | Remove breakpoints |

---

## Events

The `LokusPluginAPI` and all sub-APIs extend `EventEmitter`. Subscribe to events with `on()`, `once()`, and `off()`.

```javascript
api.on('plugin_cleanup', ({ pluginId }) => { /* ... */ });
api.editor.once('extension_added', (data) => { /* ... */ });
```

### Common events

| API | Event | Description |
|---|---|---|
| `editor` | `extension_added` | Extension registered |
| `editor` | `extension_removed` | Extension unregistered |
| `editor` | `slash_command_added` | Slash command registered |
| `editor` | `toolbar_item_added` | Toolbar item added |
| `commands` | `command_registered` | Command registered |
| `commands` | `command_unregistered` | Command unregistered |
| `commands` | `command_error` | Command execution failed |
| `ui` | `panel_added` | Panel created |
| `ui` | `panel_removed` | Panel removed |
| `ui` | `webview-registered` | Webview panel created |
| `ui` | `webview-disposed` | Webview panel closed |
| `notifications` | `notification_shown` | Notification displayed |
| `notifications` | `notification_hidden` | Notification dismissed |
| `config` | `(key change)` | Configuration value changed |
| `themes` | `(theme change)` | Active theme changed |
| `terminal` | `terminal-opened` | Terminal created |
| `terminal` | `terminal-closed` | Terminal disposed |

---

## Disposable pattern

Many API methods return a `Disposable` object. Call `dispose()` to clean up the registration:

```javascript
const disposable = api.commands.register({
  id: 'myPlugin.cmd',
  handler: () => {}
});

// Later, unregister:
disposable.dispose();
```

Resources registered through the API are automatically disposed when your plugin deactivates. For manual cleanup, call `dispose()` explicitly.

---

## Permission reference

Permissions follow the `category:action` format. Each API section above lists the required permission per method. Here is the summary by category:

| Category | Permissions |
|---|---|
| **editor** | `editor:read`, `editor:write` |
| **ui** | `ui:create`, `ui:notifications`, `ui:dialogs`, `ui:menus`, `ui:toolbars` |
| **commands** | `commands:register`, `commands:execute`, `commands:list` |
| **filesystem** | `filesystem:read`, `filesystem:write` |
| **workspace** | `workspace:read`, `workspace:write` |
| **storage** | `storage:read`, `storage:write` |
| **network** | `network:http` |
| **clipboard** | `clipboard:read`, `clipboard:write` |
| **terminal** | `terminal:create`, `terminal:read`, `terminal:write` |
| **languages** | `languages:register`, `languages:read` |
| **config** | `config:read`, `config:write` |
| **themes** | `themes:register`, `themes:read`, `themes:set` |
| **debug** | `debug:session`, `debug:register` |
| **events** | `events:listen`, `events:emit` |

Calling any method without its required permission throws `PermissionDeniedError` with the plugin ID, required permission, and API method name.
