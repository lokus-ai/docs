---
title: Keyboard Shortcuts
description: Complete keyboard shortcut reference for Lokus v1.0.1.
---

All shortcuts use `Cmd` on macOS and `Ctrl` on Windows/Linux. Shortcuts are customizable in **Preferences > Shortcuts**.

## File Operations

| Action | macOS | Windows/Linux |
|---|---|---|
| Save File | `Cmd+S` | `Ctrl+S` |
| New File | `Cmd+N` | `Ctrl+N` |
| New Folder | `Cmd+Shift+N` | `Ctrl+Shift+N` |
| New Canvas | `Cmd+Shift+C` | `Ctrl+Shift+C` |
| Close Tab | `Cmd+W` | `Ctrl+W` |
| Reopen Closed Tab | `Cmd+Shift+T` | `Ctrl+Shift+T` |
| Next Tab | `Ctrl+Tab` | `Ctrl+Tab` |
| Previous Tab | `Ctrl+Shift+Tab` | `Ctrl+Shift+Tab` |
| Print | `Cmd+P` | `Ctrl+P` |

## Navigation

| Action | macOS | Windows/Linux |
|---|---|---|
| Command Palette | `Cmd+K` | `Ctrl+K` |
| Toggle Left Sidebar (Files) | `Cmd+B` | `Ctrl+B` |
| Toggle Right Sidebar (Plugins) | `Cmd+Shift+B` | `Ctrl+Shift+B` |
| Open Preferences | `Cmd+,` | `Ctrl+,` |
| Find in Note | `Cmd+F` | `Ctrl+F` |
| Find and Replace | `Cmd+H` | `Ctrl+H` |
| Global Search | `Cmd+Shift+F` | `Ctrl+Shift+F` |
| Insert WikiLink | `Cmd+L` | `Ctrl+L` |
| Open Daily Note | `Cmd+Shift+D` | `Ctrl+Shift+D` |
| Open Graph View | `Cmd+Shift+G` | `Ctrl+Shift+G` |
| Open Kanban Board | `Cmd+Shift+K` | `Ctrl+Shift+K` |
| Show Keyboard Shortcuts | `F1` | `F1` |
| Refresh File Tree | `F5` | `F5` |

## Editing

| Action | macOS | Windows/Linux |
|---|---|---|
| Undo | `Cmd+Z` | `Ctrl+Z` |
| Redo | `Cmd+Shift+Z` | `Ctrl+Shift+Z` |
| Cut | `Cmd+X` | `Ctrl+X` |
| Copy | `Cmd+C` | `Ctrl+C` |
| Paste | `Cmd+V` | `Ctrl+V` |
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

| Action | macOS | Windows/Linux |
|---|---|---|
| Insert Inline Math | `Cmd+M` | `Ctrl+M` |
| Insert Math Block | `Cmd+Shift+M` | `Ctrl+Shift+M` |
| Insert Table | `Cmd+Shift+T` | `Ctrl+Shift+T` |
| Insert Code Block | `Cmd+Shift+C` | `Ctrl+Shift+C` |

## Split View

| Action | macOS | Windows/Linux |
|---|---|---|
| Toggle Split View | `Cmd+\` | `Ctrl+\` |
| Toggle Split Direction | `Cmd+Shift+\` | `Ctrl+Shift+\` |
| Reset Pane Size | `Cmd+Alt+\` | `Ctrl+Alt+\` |
| Toggle Sync Scrolling | `Cmd+Alt+S` | `Ctrl+Alt+S` |

## View

| Action | macOS | Windows/Linux |
|---|---|---|
| Zoom In | `Cmd++` | `Ctrl++` |
| Zoom Out | `Cmd+-` | `Ctrl+-` |
| Actual Size (Reset Zoom) | `Cmd+0` | `Ctrl+0` |
| Toggle Fullscreen | `F11` | `F11` |

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
| Close Graph | `Escape` |

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
