---
title: Creating Plugins
description: Build a Lokus plugin from zero — manifest v3, the SDK, contribution points, and the dev loop.
---

A Lokus plugin is a folder with a manifest and a JavaScript module. Plugins run in a dedicated Worker: no DOM, no globals, no direct access to anything. Everything happens through the `LokusAPI` object you receive in `activate()`, and every call is checked against the capabilities the user granted.

## Your first plugin in five minutes

### 1. The folder

```
~/.lokus/plugins/hello-clock/
├── plugin.json
└── index.js
```

### 2. `plugin.json`

```json
{
  "apiVersion": 3,
  "id": "hello-clock",
  "name": "Hello Clock",
  "version": "1.0.0",
  "description": "A clock in your status bar that inserts timestamps.",
  "author": "You",
  "main": "index.js",
  "capabilities": ["ui", "editor"],
  "activation": ["startup"],
  "contributes": {
    "commands": [{ "id": "stamp", "title": "Insert timestamp" }],
    "statusBar": [{ "id": "clock", "position": "right", "text": "…" }]
  }
}
```

### 3. `index.js` (or TypeScript via the SDK)

```js
let timer;

module.exports = {
  activate(api) {
    const tick = () => {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      api.ui.setStatusBarItem("clock", { text: `🕐 ${pad(d.getHours())}:${pad(d.getMinutes())}` });
    };
    tick();
    timer = setInterval(tick, 1000);

    api.on("command", async ({ id }) => {
      if (id !== "stamp") return;
      await api.editor.insert(`\n🕐 *${new Date().toLocaleString()}*\n`);
      await api.ui.notify({ message: "Timestamp inserted", type: "success" });
    });
  },

  deactivate() {
    clearInterval(timer);
  },
};
```

### 4. See it live

Open the Extensions view and hit **refresh** — your plugin appears. Enable it, approve the capabilities on the Ask Screen, and the clock starts ticking. `⌘K` → "Insert timestamp" inserts into the open note.

## TypeScript and the SDK

The SDK (`lokus-plugin-sdk` on npm, v3) ships typed API definitions, templates, and testing mocks:

```bash
npm install lokus-plugin-sdk
```

```ts
import { definePlugin } from "lokus-plugin-sdk";

let timer: ReturnType<typeof setInterval> | undefined;

export default definePlugin({
  activate(api) {
    api.on("command", async ({ id }) => {
      if (id === "stamp") await api.editor.insert("hello");
    });
  },
  deactivate() {
    if (timer) clearInterval(timer);
  },
});
```

Bundle to CommonJS with esbuild:

```bash
npx esbuild src/index.ts --bundle --platform=browser --format=cjs --outfile=index.js
```

The SDK major version matches the manifest `apiVersion` it speaks: SDK 3.x ↔ `apiVersion: 3`.

> **Note on the CLI:** `lokus-plugin-cli` exists on npm but still scaffolds plugins for the *removed* pre-v3 system. Use the SDK + esbuild path above until the CLI is updated.

## The manifest, field by field

| Field | Required | Notes |
|---|---|---|
| `apiVersion` | yes | Must be `3`. Anything else is listed as unsupported and never runs. |
| `id` | yes | 2–64 chars, letters/digits/hyphens. Becomes the install folder name and the plugin's identity everywhere. |
| `name` | yes | Human-readable name. |
| `version` | yes | Semver string. |
| `main` | no | Entry file, default `index.js`. |
| `capabilities` | no | Closed list: `commands`, `ui`, `editor`, `notes.read`, `notes.write`, `storage`, `network`, `overlay`. Unknown values are rejected. |
| `activation` | no | `startup` (default), `command:<id>`, `view:<name>`, `file:<ext>`. |
| `contributes` | no | The slots your plugin fills — see below. |

## Contribution points

```json
"contributes": {
  "commands":    [{ "id": "stamp", "title": "Insert timestamp", "icon": "clock" }],
  "slashCommands": [{ "name": "clock", "description": "Insert a divider", "insert": "\n---\n" }],
  "statusBar":   [{ "id": "clock", "position": "right", "text": "…", "tooltip": "Live Clock", "command": "stamp" }],
  "toolbar":     [{ "id": "bone", "icon": "bone", "tooltip": "Give bone", "command": "stamp" }],
  "panels":      [{ "id": "den", "title": "Den", "position": "right",
                    "content": { "type": "webview", "src": "panel.html" } }],
  "overlays":    [{ "id": "dog", "title": "Dog", "src": "dog.html",
                    "width": 240, "height": 160, "clickThrough": true }]
}
```

- **commands** appear in the command palette as `<plugin>.<command>` and fire the `command` event.
- **slashCommands** appear in the editor's `/` menu and insert their static text.
- **statusBar** items render immediately; update them at runtime with `api.ui.setStatusBarItem(id, { text })`.
- **panels** render in the sidebar/bottom. `webview` content is your own HTML page in a sandboxed frame — it can draw freely but cannot touch notes or the app; talk to your plugin module through the manifest's commands if you need behavior.
- **overlays** are transparent, always-on-top windows (desktop only). Perfect for ambient widgets.

Panel and overlay `src` paths are relative to the plugin folder and must stay inside it.

## The dev loop

1. Serve your plugin folder: `npx serve .` (or any static server).
2. In Lokus, open `lokus://plugin-dev?url=http://localhost:3000/`.
3. Confirm the dialog — the plugin loads with the capabilities you approve.
4. Edit, reload the dev URL, repeat. Dev plugins get the same isolation and Ask Screen as installed ones.

## Testing your plugin

The SDK's `createMockLokusAPI()` gives you an in-memory `api` plus a `fire()` helper to simulate host events — ideal for unit-testing your plugin logic. For real end-to-end behavior (Ask Screen, slots, RPC round-trips), the Lokus repo's QA harness (`qa/journeys/10-plugin-system.js`) shows how the app itself is driven with a sample plugin installed.

## Publishing

Publish through the marketplace at [marketplace.lokusmd.com](https://marketplace.lokusmd.com). Your listing shows the name, description, version — and the capabilities your manifest requests, which users approve on the Ask Screen before anything runs. Request only what you need; the Ask Screen is the first thing every user sees.

## Rules of the road

- You get **only** the capabilities the user granted. Denied calls reject with a permission error and show up in your plugin's console.
- Your code cannot touch the DOM, `window`, or Tauri. If you find a workaround for that, you've found a security bug — please report it instead of shipping it.
- Keep `activate()` fast; heavy work belongs in your own event handlers.
- Clean up intervals and listeners in `deactivate()`.
