---
title: Themes
description: Switch between built-in themes or create custom color schemes with token-based theming.
---

Lokus uses a token-based theme system. Every color in the UI maps to a CSS variable, and switching themes swaps those variables instantly. The default theme is **Lokus Dark**.

## Built-in themes

Lokus ships with four built-in themes (two signature themes and two community favorites):

| Theme        | Style | Accent color                  |
|--------------|-------|-------------------------------|
| Lokus Dark   | Dark  | Amber/orange (`#e0a872`)      |
| Lokus Light  | Light | Burnt orange (`#c27830`)      |
| Rose Pine    | Dark  | Lavender (`#c4a7e7`)          |
| Tokyo Night  | Dark  | Blue (`#7aa2f7`)              |

An additional community theme, **One Dark Pro** (dark, blue accent `#61afef`), is available as a JSON file in `src/themes/` but is not included in the default set.

## Switch themes

1. Open **Preferences** and go to the **Appearance** section.
2. Select a theme from the theme dropdown.
3. The theme applies immediately across all open windows.

Theme changes propagate via Tauri events, so every window updates in real time. On macOS, the native titlebar appearance syncs automatically whenever a theme is applied.

A theme picker is also shown during onboarding for first-time setup.

## Theme tokens

Every theme defines values for CSS variables. Theme files use the `--app-` prefix for core tokens (e.g. `--app-bg`, `--app-text`). The theme manager maps these to their unprefixed equivalents (`--bg`, `--text`) at apply time, so both forms work in CSS.

### Core tokens

These seven tokens define the foundation of a theme. They are not strictly required because any missing tokens are automatically merged with the Lokus Dark defaults, but providing them is strongly recommended:

| Token          | Description                      |
|----------------|----------------------------------|
| `--bg`         | Background color                 |
| `--text`       | Primary text color               |
| `--panel`      | Panel/sidebar background         |
| `--border`     | Border color                     |
| `--muted`      | Muted/secondary text             |
| `--accent`     | Accent/highlight color           |
| `--accent-fg`  | Text color on accent backgrounds |

### Extended tokens

Theme JSON files support additional tokens beyond the core set. These are used by the full theme files shipped in `src/themes/`:

| Token                  | Description                   |
|------------------------|-------------------------------|
| `--app-panel-secondary`| Secondary panel background    |
| `--app-border-hover`   | Border color on hover         |
| `--app-text-secondary` | Secondary text color          |
| `--accent-hover`       | Accent color on hover         |
| `--canvas-bg`          | Canvas background             |
| `--canvas-grid`        | Canvas grid line color        |
| `--graph-bg-primary`   | Graph view primary background |
| `--graph-bg-secondary` | Graph view secondary color    |
| `--graph-node-document`| Graph document node color     |
| `--graph-node-placeholder` | Graph placeholder node color |
| `--graph-node-tag`     | Graph tag node color          |
| `--graph-node-folder`  | Graph folder node color       |
| `--graph-link`         | Graph link color              |
| `--graph-link-hover`   | Graph link hover color        |

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

Create a JSON file with a `name` and `tokens` object. Any tokens you omit are filled in from the Lokus Dark defaults, so you only need to specify the values you want to change:

```json
{
  "name": "My Custom Theme",
  "tokens": {
    "--app-bg": "#1a1b26",
    "--app-text": "#a9b1d6",
    "--app-panel": "#16161e",
    "--app-border": "#414868",
    "--app-muted": "#565f89",
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

The theme ID is generated from the name: lowercased, with non-alphanumeric characters replaced by underscores.

## Live token editing

In **Preferences > Appearance**, you can edit individual token values for the active theme directly. Changes preview live as you type -- the UI updates immediately via `applyTokens()`. Click **Save Changes** to persist edits, or navigate away to discard them (tokens revert to the last saved state).

## Import and export themes

### Import

Import a theme from a JSON file:

1. In Preferences, click the **Import** button and select a `.json` theme file.
2. Lokus validates the file structure and color formats.
3. The theme appears in your theme list and is automatically selected.

Set `overwrite: true` (via the API) to replace an existing theme with the same ID.

### Export

Export any theme (including built-in ones) to a JSON file for sharing or backup. In Preferences, click **Export** and choose a save location.

### Delete custom themes

Custom themes can be deleted through the theme management API or MCP tools. Built-in themes cannot be deleted.

## System theme sync

Set the theme to `system` or `auto` to follow your operating system's light/dark preference. Lokus listens for system theme changes and switches automatically between `lokus-dark` and `lokus-light`. On macOS, this syncs with the native titlebar appearance.

## Native titlebar sync

Every time a theme is applied, Lokus invokes `sync_window_theme` on the Rust backend, passing the background color luminance. This keeps the macOS native titlebar appearance (light or dark chrome) consistent with the active theme.

## Workspace-level themes

Each workspace can override the global theme. Add a `theme` key to `.lokus/config.json` inside the workspace:

```json
{
  "theme": "rose-pine"
}
```

Set the value to `"inherit"` (or omit it) to use the global theme. If no theme is configured at any level, Lokus defaults to `lokus-dark`.

## MCP theme tools

AI assistants can manage themes through the MCP server. The following tools are available:

| Tool              | Description                                        |
|-------------------|----------------------------------------------------|
| `list_themes`     | List all available themes (built-in and custom)    |
| `get_theme`       | Get a theme's details and token values             |
| `create_theme`    | Create a new custom theme with specified colors    |
| `update_theme`    | Update an existing theme's tokens (partial updates)|
| `delete_theme`    | Delete a custom theme                              |
| `apply_theme`     | Apply a theme to the application                   |
| `get_current_theme` | Get the currently active theme                   |
| `export_theme`    | Export a theme to a JSON file                      |
| `import_theme`    | Import a theme from a JSON file                    |

These tools validate color formats and enforce that built-in themes cannot be deleted.

## Plugin themes

Plugins can contribute themes through the theme contribution schema. Plugin-contributed themes support metadata including category, tags, author, preview colors, and accessibility flags like high-contrast and color-blind-friendly indicators.
