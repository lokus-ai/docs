---
title: Config Options
description: Application configuration and settings reference for Lokus v1.0.1.
---

Lokus stores global configuration in `config.json` inside the app data directory. On macOS this is `~/Library/Application Support/Lokus/config.json`. Workspace-specific settings are stored in `.lokus/` within the workspace folder.

## Preferences Sections

Open Preferences with `Cmd+,` / `Ctrl+,`. Available sections:

| Section | Description |
|---|---|
| Appearance | Theme selection, token customization, style presets |
| Editor | Typography, spacing, code blocks, colors, behavior |
| Daily Notes | Date format, folder, template, open-on-startup |
| Markdown | Syntax feature toggles, heading markers |
| Shortcuts | Keyboard shortcut customization |
| Connections | Gmail, Calendar (iCal, CalDAV) integrations |
| Account | Authentication, user account management |
| Sync | Iroh P2P sync or Git sync configuration |
| Updates | App version, beta channel opt-in |

## Editor Settings

Stored under the `editorSettings` key in `config.json`. All values apply in real time.

### Font & Typography

| Setting | Key | Default | Range/Type |
|---|---|---|---|
| Font Family | `fontFamily` | `ui-sans-serif` | CSS font family |
| Font Size | `fontSize` | `16` | px |
| Line Height | `lineHeight` | `1.7` | Multiplier |
| Letter Spacing | `letterSpacing` | `0.003` | em |
| Font Weight | `fontWeight` | `400` | 100-900 |
| Bold Weight | `boldWeight` | `700` | 100-900 |
| H1 Size | `h1Size` | `2.0` | em (relative) |
| H2 Size | `h2Size` | `1.6` | em |
| H3 Size | `h3Size` | `1.3` | em |
| H1 Weight | `h1Weight` | `700` | 100-900 |
| H2 Weight | `h2Weight` | `600` | 100-900 |
| H3 Weight | `h3Weight` | `600` | 100-900 |

### Spacing

| Setting | Key | Default | Unit |
|---|---|---|---|
| Paragraph Spacing | `paragraphSpacing` | `1` | rem |
| List Spacing | `listSpacing` | `0.25` | rem |
| Indent Size | `indentSize` | `2` | rem |
| Heading Margin Top | `headingMarginTop` | `1.5` | rem |
| Heading Margin Bottom | `headingMarginBottom` | `0.5` | rem |
| Block Margin | `blockMargin` | `1.5` | rem |
| List Indent | `listIndent` | `2` | rem |

### Colors

| Setting | Key | Default |
|---|---|---|
| Text Color | `textColor` | `#inherit` |
| Heading Color | `headingColor` | `#inherit` |
| Link Color | `linkColor` | `#inherit` |
| Link Hover Color | `linkHoverColor` | `#inherit` |
| Code Color | `codeColor` | `#inherit` |
| Code Background | `codeBackground` | `#f5f5f5` |
| Blockquote Color | `blockquoteColor` | `#inherit` |
| Blockquote Border | `blockquoteBorder` | `#e5e5e5` |
| Bold Color | `boldColor` | `#inherit` |
| Italic Color | `italicColor` | `#inherit` |
| Highlight Color | `highlightColor` | `#fff3cd` |
| Highlight Text Color | `highlightTextColor` | `#inherit` |

`#inherit` means the value falls through to the active theme.

### Code Blocks

| Setting | Key | Default |
|---|---|---|
| Background | `codeBlockBg` | `#f8f9fa` |
| Border Color | `codeBlockBorder` | `#e9ecef` |
| Border Width | `codeBlockBorderWidth` | `1` px |
| Border Radius | `codeBlockBorderRadius` | `8` px |
| Padding | `codeBlockPadding` | `16` px |
| Font | `codeBlockFont` | `ui-monospace` |
| Font Size | `codeBlockFontSize` | `14` px |
| Line Height | `codeBlockLineHeight` | `1.5` |

### Links

| Setting | Key | Default |
|---|---|---|
| Underline Mode | `linkUnderline` | `hover` |
| Underline Thickness | `linkUnderlineThickness` | `1` px |
| Underline Offset | `linkUnderlineOffset` | `2` px |

### Tables

| Setting | Key | Default |
|---|---|---|
| Border Color | `tableBorder` | `#dee2e6` |
| Border Width | `tableBorderWidth` | `1` px |
| Header Background | `tableHeaderBg` | `null` (theme default) |
| Cell Padding | `tableCellPadding` | `12` px |

### Text Decorations

| Setting | Key | Default |
|---|---|---|
| Strikethrough Color | `strikethroughColor` | `#6c757d` |
| Strikethrough Thickness | `strikethroughThickness` | `2` px |
| Underline Color | `underlineColor` | `#inherit` |
| Underline Thickness | `underlineThickness` | `1` px |

### Blockquotes

| Setting | Key | Default |
|---|---|---|
| Border Width | `blockquoteBorderWidth` | `4` px |
| Padding | `blockquotePadding` | `16` px |
| Border Style | `blockquoteStyle` | `solid` |

### Selection

| Setting | Key | Default |
|---|---|---|
| Selection Color | `selectionColor` | `rgba(99, 102, 241, 0.2)` |

## Style Presets

Apply a preset to reset multiple editor settings at once. Available in **Preferences > Editor**.

| Preset | Font Size | Line Height | H1 Size | Weight |
|---|---|---|---|---|
| Minimal | 16px | 1.8 | 1.8em | 400 |
| Comfortable | 17px | 1.7 | 2.0em | 400 |
| Compact | 14px | 1.5 | 1.6em | 400 |
| Spacious | 18px | 2.0 | 2.4em | 300 |

## Daily Notes

Stored under the `dailyNotes` key.

| Setting | Key | Default | Description |
|---|---|---|---|
| Date Format | `format` | `yyyy-MM-dd` | File name date format |
| Folder | `folder` | `Daily Notes` | Folder for daily notes |
| Template | `template` | `""` | Template name to use |
| Open on Startup | `openOnStartup` | `false` | Auto-open today's note |

## Markdown Syntax

Per-workspace settings stored in `.lokus/markdown-syntax.json`.

| Setting | Key Path | Default |
|---|---|---|
| Heading Marker | `heading.marker` | `#` |
| Alt Heading Marker | `heading.altMarker` | `^` |
| Alt Heading Enabled | `heading.altEnabled` | `false` |
| Bold Marker | `bold.marker` | `**` |
| Italic Marker | `italic.marker` | `*` |
| Bullet List Default | `bulletList.defaultMarker` | `-` |
| Task List Enabled | `taskList.enabled` | `true` |
| WikiLinks Enabled | `link.wikiLink.enabled` | `true` |
| Auto-link URLs | `link.autoLink.enabled` | `true` |
| Table Enabled | `table.enabled` | `true` |
| Inline Math | `math.inline.enabled` | `true` |
| Block Math | `math.block.enabled` | `true` |
| Auto-close Brackets | `behavior.autoCloseBrackets` | `true` |
| Smart Quotes | `behavior.smartQuotes` | `false` |
| Auto Indent | `behavior.autoIndent` | `true` |

## Sync Settings

Stored under the `sync` key.

| Setting | Key | Description |
|---|---|---|
| Provider | `sync.provider` | `iroh` (P2P) or `git` |
| Remote URL | `sync.remoteUrl` | Git remote URL |
| Branch | `sync.branch` | Git branch (default: `main`) |
| Username | `sync.username` | Git username |
| Token | `sync.token` | Git access token |
| Iroh Document ID | `sync.iroh.documentId` | Iroh document identifier |
| Iroh Ticket | `sync.iroh.ticket` | Iroh connection ticket |
| Iroh Auto-Sync | `sync.iroh.autoSyncEnabled` | Enable automatic sync |

## Custom Symbol Shortcuts

Stored under the `customSymbols` key. Maps trigger strings to symbol characters.

```json
{
  "customSymbols": {
    "alpha": "α",
    "beta": "β",
    "arrow": "→"
  }
}
```

Trigger names must be at least 2 characters. Manage in **Preferences > Editor**.

## Config File Location

| Platform | Path |
|---|---|
| macOS | `~/Library/Application Support/Lokus/config.json` |
| Windows | `%APPDATA%/Lokus/config.json` |
| Linux | `~/.config/Lokus/config.json` |

The file is created on first settings change. An empty or missing file uses all defaults.
