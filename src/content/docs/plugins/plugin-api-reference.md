---
title: Plugin API Reference
description: The complete v3 plugin API — every method, its capability, and its behavior.
---

Everything a plugin can call, generated from `lokus-plugin-sdk` v3. Your plugin receives the `api` object in `activate(api)`. Each group requires the listed capability; calls without it reject with a permission error and are recorded in the plugin console.

## Lifecycle

```ts
interface PluginModule {
  activate(api: LokusAPI): void | Promise<void>;
  deactivate?(): void | Promise<void>;
}

function definePlugin(module: PluginModule): PluginModule;
```

`activate` runs once, in a dedicated Worker, when the plugin's activation events fire. `deactivate` runs on disable/uninstall and on app quit.

## api.commands — capability `commands`

```ts
api.commands.execute(id: string, args?: Record<string, unknown>): Promise<unknown>
```

Triggers a command registered by any plugin (including yourself) by qualified id (`plugin-id.command-id`).

## api.ui — capability `ui`

```ts
api.ui.notify(options: { message: string; type?: "info" | "success" | "error"; title?: string }): Promise<boolean>
```
Shows a toast notification.

```ts
api.ui.setStatusBarItem(itemId: string, patch: { text?: string; tooltip?: string }): Promise<boolean>
```
Updates a status-bar item you declared in `contributes.statusBar` (by its `id`). Unknown ids reject.

## api.editor — capability `editor`

```ts
api.editor.insert(text: string): Promise<boolean>
```

Inserts markdown text at the cursor of the focused editor.

## api.notes — capabilities `notes.read` / `notes.write`

```ts
api.notes.list(options?: { limit?: number }): Promise<string[]>        // notes.read
api.notes.read(path: string): Promise<string>                          // notes.read
api.notes.write(path: string, content: string): Promise<boolean>       // notes.write
```

Paths are relative to the vault and must stay inside it. `read` rejects for missing notes. Writes are capped at ~2 MB.

## api.storage — capability `storage`

```ts
api.storage.get<T>(key: string): Promise<T | null>
api.storage.set(key: string, value: unknown): Promise<boolean>
api.storage.delete(key: string): Promise<boolean>
```

Private key-value storage for your plugin, persisted across restarts. Other plugins cannot read it.

## api.network — capability `network`

```ts
api.network.fetch(url: string, options?: {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}): Promise<{ status: number; body: string; truncated: boolean }>
```

HTTP(S) only. Response bodies are capped at ~1 MB (`truncated` tells you when).

## api.overlay — capability `overlay`

```ts
api.overlay.show(overlayId: string): Promise<boolean>
api.overlay.hide(overlayId: string): Promise<boolean>
```

Shows/hides a transparent, always-on-top window you declared in `contributes.overlays`. Desktop only.

## api.workspace — always allowed

```ts
api.workspace.info(): Promise<{ path: string | null }>
```

The open vault's path (or `null` when no workspace is open).

## Events

```ts
api.on(event: "command", handler: (data: { id: string }) => void): () => void
```

Fires when the user runs one of your contributed commands (palette, toolbar, or status-bar `command`). The handler receives the *local* command id (without the plugin prefix). The returned function unsubscribes.

## Manifest types

```ts
interface PluginManifestV3 {
  apiVersion: 3;
  id: string;                 // 2-64 chars: letters, digits, hyphens
  name: string;
  version: string;
  description?: string;
  author?: string;
  main?: string;              // default "index.js"
  capabilities?: Capability[];
  activation?: string[];      // "startup" | "command:<id>" | "view:<name>" | "file:<ext>"
  contributes?: Contributes;
}

type Capability =
  | "commands" | "ui" | "editor"
  | "notes.read" | "notes.write"
  | "storage" | "network" | "overlay";

interface Contributes {
  commands?:      { id: string; title: string; icon?: string }[];
  slashCommands?: { name: string; description?: string; insert: string }[];
  statusBar?:     { id: string; position?: "left" | "right"; text?: string;
                    tooltip?: string; command?: string }[];
  toolbar?:       { id: string; icon: string; tooltip: string; command: string }[];
  panels?:        { id: string; title: string; position?: "left" | "right" | "bottom";
                    content: { type: "declarative"; spec: object }
                             | { type: "webview"; src: string } }[];
  overlays?:      { id: string; title: string; src: string; width?: number;
                    height?: number; clickThrough?: boolean }[];
}
```

## Testing mocks

```ts
import { createMockLokusAPI } from "lokus-plugin-sdk/testing";

const { api, state, fire } = createMockLokusAPI();
// state records inserts, notifications, status items, storage, overlays
// fire("command", { id: "stamp" }) delivers a command event to your handlers
```

## Behavior guarantees

- Calls are checked **per request** against the user's grants; revoking a capability takes effect on the next call.
- A plugin that throws repeatedly is stopped after three strikes.
- The worker has no DOM, no `window`, no Tauri bridge — the API above is the entire surface.
