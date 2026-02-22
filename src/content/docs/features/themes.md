---
title: Themes
description: Switch between built-in themes or create custom color schemes with token-based theming.
---

Lokus uses a token-based theme system. Every color in the UI maps to a CSS variable, and switching themes swaps those variables instantly. The default theme is **Lokus Dark**.

## Built-in themes

Lokus ships with these themes:

| Theme           | Style       | Accent color |
|-----------------|-------------|--------------|
| Lokus Dark      | Dark        | Purple (`#8b5cf6`) |
| Dracula         | Dark        | Purple (`#bd93f9`) |
| Nord            | Dark        | Teal (`#88C0D0`)   |
| One Dark Pro    | Dark        | Blue (`#61afef`)   |
| Minimal Light   | Light       | Blue (`#3b82f6`)   |
| Neon Dark       | Dark        | Cyan (`#00d4ff`)   |

Additional community themes are available as JSON files in the `src/themes/` directory:

- **Catppuccin Mocha** -- warm dark theme with pastel accents
- **Tokyo Night** -- dark theme inspired by Tokyo city lights
- **Solarized Light** -- precision light theme with muted palette
- **Monokai** -- classic dark theme with vivid syntax colors

## Switch themes

1. Open **Settings**.
2. Select a theme from the theme list.
3. The theme applies immediately across all open windows.

Theme changes propagate via Tauri events, so every window updates in real time.

## Theme tokens

Every theme defines values for these CSS variables:

### Core tokens (required)

| Token          | Description                              |
|----------------|------------------------------------------|
| `--bg`         | Background color                         |
| `--text`       | Primary text color                       |
| `--panel`      | Panel/sidebar background                 |
| `--border`     | Border color                             |
| `--muted`      | Muted/secondary text                     |
| `--accent`     | Accent/highlight color                   |
| `--accent-fg`  | Text color on accent backgrounds         |

### Task status tokens

| Token              | Description         |
|--------------------|---------------------|
| `--task-todo`      | Todo task color     |
| `--task-progress`  | In-progress color   |
| `--task-urgent`    | Urgent task color   |
| `--task-question`  | Question task color |
| `--task-completed` | Completed color     |
| `--task-cancelled` | Cancelled color     |
| `--task-delegated` | Delegated color     |

### Semantic tokens

| Token       | Description    |
|-------------|----------------|
| `--danger`  | Error/danger   |
| `--success` | Success        |
| `--warning` | Warning        |
| `--info`    | Informational  |

### Other tokens

| Token                  | Description              |
|------------------------|--------------------------|
| `--tab-active`         | Active tab background    |
| `--editor-placeholder` | Editor placeholder text  |

## Color format

Token values can be either:

- **Hex**: `#282a36` or `#fff`
- **RGB space-separated**: `40 42 54`

Hex values are automatically converted to RGB for use with Tailwind's opacity utilities.

## Create a custom theme

Create a JSON file with a `name` and `tokens` object. All 7 core tokens are required:

```json
{
  "name": "My Custom Theme",
  "tokens": {
    "--bg": "#1a1b26",
    "--text": "#a9b1d6",
    "--panel": "#16161e",
    "--border": "#414868",
    "--muted": "#565f89",
    "--accent": "#7aa2f7",
    "--accent-fg": "#1a1b26",
    "--danger": "#f7768e",
    "--success": "#9ece6a",
    "--warning": "#e0af68",
    "--info": "#7dcfff",
    "--editor-placeholder": "#565f89"
  }
}
```

Save the file to your themes directory. The theme ID is generated from the name: lowercased, with non-alphanumeric characters replaced by underscores.

## Import and export themes

### Import

Import a theme from a JSON file:

1. Use the theme management tools to select a `.json` theme file.
2. Lokus validates the file structure and color formats.
3. The theme appears in your theme list.

Set `overwrite: true` to replace an existing theme with the same ID.

### Export

Export any theme (including built-in ones) to a JSON file for sharing or backup.

## System theme sync

Set the theme to `system` or `auto` to follow your operating system's light/dark preference. Lokus listens for system theme changes and switches automatically. On macOS, this syncs with the native titlebar appearance.

## Workspace-level themes

Each workspace can override the global theme. Add a `theme` key to `.lokus/config.json` inside the workspace:

```json
{
  "theme": "nord"
}
```

Set the value to `"inherit"` (or omit it) to use the global theme.

## Plugin themes

Plugins can contribute themes through the theme contribution schema. Plugin-contributed themes support metadata including category, tags, author, preview colors, and accessibility flags like high-contrast and color-blind-friendly indicators.
