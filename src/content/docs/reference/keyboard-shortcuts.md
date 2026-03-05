---
title: Keyboard Shortcuts
description: Complete keyboard shortcut reference for Lokus v1.1.0.
---

All shortcuts use `Cmd` on macOS and `Ctrl` on Windows/Linux unless stated otherwise. Shortcuts are customizable in **Preferences > Shortcuts**.

:::note
Some shortcuts are only available in the desktop app (Tauri). Shortcuts marked with a feature flag require the corresponding flag to be enabled via remote config.
:::

## File Operations

| Action | macOS | Windows/Linux | Notes |
|---|---|---|---|
| Save File | `Cmd+S` | `Ctrl+S` | |
| Save As | `Cmd+Shift+S` | `Ctrl+Shift+S` | Desktop only (Tauri menu) |
| Open File | `Cmd+O` | `Ctrl+O` | Desktop only (Tauri menu) |
| Open Workspace | `Cmd+Shift+O` | `Ctrl+Shift+O` | Desktop only (Tauri menu) |
| New File | `Cmd+N` | `Ctrl+N` | |
| New Folder | `Cmd+Shift+N` | `Ctrl+Shift+N` | |
| New Canvas | `Cmd+Shift+C` | `Ctrl+Shift+C` | |
| Close Tab | `Cmd+W` | `Ctrl+W` | |
| Close Window | `Cmd+Shift+W` | `Ctrl+Shift+W` | Desktop only (Tauri menu) |
| Reopen Closed Tab | `Cmd+Shift+T` | `Ctrl+Shift+T` | |
| Next Tab | `Ctrl+Tab` | `Ctrl+Tab` | |
| Previous Tab | `Ctrl+Shift+Tab` | `Ctrl+Shift+Tab` | |
| Print | `Cmd+P` | `Ctrl+P` | |

## Navigation

| Action | macOS | Windows/Linux | Notes |
|---|---|---|---|
| Command Palette | `Cmd+K` | `Ctrl+K` | |
| Toggle Left Sidebar (Files) | `Cmd+B` | `Ctrl+B` | |
| Toggle Right Sidebar (Plugins) | `Cmd+Shift+B` | `Ctrl+Shift+B` | Shortcut registered but event listener may not be wired |
| Open Preferences | `Cmd+,` | `Ctrl+,` | |
| Find in Note | `Cmd+F` | `Ctrl+F` | |
| Find and Replace | `Cmd+Alt+F` | `Ctrl+Alt+F` | See note below about `Cmd+H` conflict |
| Find Next | `Cmd+G` | `Ctrl+G` | Desktop only (Tauri menu) |
| Find Previous | `Cmd+Shift+G` | `Ctrl+Shift+G` | Conflicts with Open Graph View; Tauri menu takes precedence |
| Global Search | `Cmd+Shift+F` | `Ctrl+Shift+F` | |
| Insert WikiLink | `Cmd+L` | `Ctrl+L` | |
| Open Daily Note | `Cmd+Shift+D` | `Ctrl+Shift+D` | Behind `enable_daily_notes` feature flag |
| Open Graph View | `Cmd+Shift+G` | `Ctrl+Shift+G` | Behind `enable_graph` feature flag |
| Open Kanban Board | `Cmd+Shift+K` | `Ctrl+Shift+K` | Behind `enable_kanban` feature flag |
| Show Keyboard Shortcuts | `F1` | `F1` | Also available via `Cmd+/` in Tauri menu |
| Refresh File Tree | `F5` | `F5` | |

:::caution[Cmd+H conflict]
The shortcut registry defines `Cmd+H` / `Ctrl+H` for **Find and Replace**. However, when the `enable_version_history` feature flag is enabled, a keydown listener also uses `Cmd+H` / `Ctrl+H` for **Version History**. The keydown listener takes precedence (it uses capture mode).

In the desktop app, the Tauri menu assigns `Cmd+Alt+F` / `Ctrl+Alt+F` for **Find and Replace** to avoid this conflict.
:::

## Editing

| Action | macOS | Windows/Linux |
|---|---|---|
| Undo | `Cmd+Z` | `Ctrl+Z` |
| Redo | `Cmd+Shift+Z` | `Ctrl+Shift+Z` |
| Cut | `Cmd+X` | `Ctrl+X` |
| Copy | `Cmd+C` | `Ctrl+C` |
| Paste | `Cmd+V` | `Ctrl+V` |
| Paste and Match Style | `Cmd+Alt+Shift+V` | `Ctrl+Alt+Shift+V` |
| Select All | `Cmd+A` | `Ctrl+A` |

## Text Formatting

| Action | macOS | Windows/Linux |
|---|---|---|
| Bold | `Cmd+B` | `Ctrl+B` |
| Italic | `Cmd+I` | `Ctrl+I` |
| Underline | `Cmd+U` | `Ctrl+U` |
| Strikethrough | `Cmd+Shift+X` | `Ctrl+Shift+X` |
| Inline Code | `Cmd+E` | `Ctrl+E` |
| Highlight | `Cmd+Shift+H` | `Ctrl+Shift+H` |

## Insert

| Action | macOS | Windows/Linux | Notes |
|---|---|---|---|
| Heading 1 | `Cmd+Alt+1` | `Ctrl+Alt+1` | Desktop only (Tauri menu) |
| Heading 2 | `Cmd+Alt+2` | `Ctrl+Alt+2` | Desktop only (Tauri menu) |
| Heading 3 | `Cmd+Alt+3` | `Ctrl+Alt+3` | Desktop only (Tauri menu) |
| Insert Inline Math | `Cmd+M` | `Ctrl+M` | |
| Insert Math Block | `Cmd+Shift+M` | `Ctrl+Shift+M` | |
| Insert Table | `Cmd+Shift+T` | `Ctrl+Shift+T` | |
| Insert Code Block | `Cmd+Shift+C` | `Ctrl+Shift+C` | |

## Split View

| Action | macOS | Windows/Linux |
|---|---|---|
| Toggle Split View | `Cmd+\` | `Ctrl+\` |
| Toggle Split Direction | `Cmd+Shift+\` | `Ctrl+Shift+\` |
| Reset Pane Size | `Cmd+Alt+\` | `Ctrl+Alt+\` |
| Toggle Sync Scrolling | `Cmd+Alt+S` | `Ctrl+Alt+S` |

## View

| Action | macOS | Windows/Linux | Notes |
|---|---|---|---|
| Zoom In | `Cmd++` | `Ctrl++` | |
| Zoom Out | `Cmd+-` | `Ctrl+-` | |
| Actual Size (Reset Zoom) | `Cmd+0` | `Ctrl+0` | |
| Toggle Fullscreen | `F11` | `F11` | May conflict with macOS system shortcut. Tauri menu uses `Ctrl+Cmd+F` / `Ctrl+Ctrl+F` instead. |

## Feature-Gated Shortcuts

These shortcuts require a feature flag to be enabled and are only active when the corresponding feature is turned on.

| Action | macOS | Windows/Linux | Feature Flag | Notes |
|---|---|---|---|---|
| Version History | `Cmd+H` | `Ctrl+H` | `enable_version_history` | Conflicts with Find and Replace; takes precedence via capture-phase keydown listener |
| Toggle Terminal | `` Cmd+` `` | `` Ctrl+` `` | `enable_terminal` | Desktop only |

## Graph View

These shortcuts are active only when the graph view is open.

| Action | Shortcut |
|---|---|
| Search Nodes | `Cmd/Ctrl+K` |
| Reset View | `Cmd/Ctrl+R` |
| 2D View Mode | `Cmd/Ctrl+1` |
| 3D View Mode | `Cmd/Ctrl+2` |
| Force Layout Mode | `Cmd/Ctrl+3` |
| Toggle Layout | `Space` |
| Blur Search Input | `Escape` |

:::note
`Escape` in graph view only blurs the search input field. It does not close or navigate away from the graph view.
:::

## Canvas

| Action | Shortcut |
|---|---|
| Save Canvas | `Cmd/Ctrl+S` |
| Close Canvas | `Escape` |

## Modal Controls

| Action | Shortcut |
|---|---|
| Close Modal | `Escape` |
| Confirm Action | `Enter` |
| Show Shortcut Help | `Cmd/Ctrl+/` |

## Customizing Shortcuts

1. Open **Preferences** (`Cmd+,` / `Ctrl+,`).
2. Select the **Shortcuts** section.
3. Click any shortcut to enter capture mode.
4. Press the new key combination.
5. The shortcut saves immediately.

Reset all shortcuts to defaults with the **Reset All** button.

Overrides are stored in the global `config.json` under the `shortcuts` key.

```json
{
  "shortcuts": {
    "save-file": "CommandOrControl+S",
    "new-file": "CommandOrControl+N"
  }
}
```

## Accelerator Format

Lokus uses the Tauri accelerator format internally:

| Token | macOS | Windows/Linux |
|---|---|---|
| `CommandOrControl` | `Cmd` | `Ctrl` |
| `Control` | `Ctrl` | `Ctrl` |
| `Shift` | `Shift` | `Shift` |
| `Alt` | `Option` | `Alt` |
| `Plus` | `+` | `+` |
| `Comma` | `,` | `,` |

Combine tokens with `+`: `CommandOrControl+Shift+N`.
