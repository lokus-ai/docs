---
title: Editor
description: TipTap-based rich text editor with slash commands, markdown shortcuts, code blocks, callouts, math, and more.
---

Lokus uses a TipTap-based editor that renders Markdown as rich text. You write in Markdown or use the toolbar -- the editor handles both. Files are stored as `.md` on disk.

## Keyboard shortcuts

### Text formatting

| Action | macOS | Windows/Linux | Markdown |
|--------|-------|---------------|----------|
| Bold | `Cmd+B` | `Ctrl+B` | `**text**` |
| Italic | `Cmd+I` | `Ctrl+I` | `*text*` |
| Strikethrough | `Cmd+Shift+S` | `Ctrl+Shift+S` | `~~text~~` |
| Inline code | `Cmd+E` | `Ctrl+E` | `` `code` `` |
| Highlight | `Cmd+Shift+H` | `Ctrl+Shift+H` | `==text==` |
| Underline | `Cmd+U` | `Ctrl+U` | -- |

### Document structure

| Action | macOS | Windows/Linux | Markdown |
|--------|-------|---------------|----------|
| Heading 1 | `Cmd+Opt+1` | `Ctrl+Alt+1` | `# ` |
| Heading 2 | `Cmd+Opt+2` | `Ctrl+Alt+2` | `## ` |
| Heading 3 | `Cmd+Opt+3` | `Ctrl+Alt+3` | `### ` |
| Bullet list | `Cmd+Shift+8` | `Ctrl+Shift+8` | `- ` or `* ` |
| Ordered list | `Cmd+Shift+7` | `Ctrl+Shift+7` | `1. ` |
| Task list | `Cmd+Shift+9` | `Ctrl+Shift+9` | `- [ ] ` |
| Blockquote | `Cmd+Shift+B` | `Ctrl+Shift+B` | `> ` |
| Horizontal rule | -- | -- | `---` |

### Code and technical

| Action | macOS | Windows/Linux | Markdown |
|--------|-------|---------------|----------|
| Code block | `Cmd+Opt+C` | `Ctrl+Alt+C` | ` ```lang ` |
| Inline math | -- | -- | `$x^2$` |
| Block math | -- | -- | `$$E=mc^2$$` |
| Callout | `Cmd+Opt+C` | `Ctrl+Alt+C` | `>[!note]` |

### Section folding

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Fold section | `Cmd+Opt+[` | `Ctrl+Alt+[` |
| Unfold section | `Cmd+Opt+]` | `Ctrl+Alt+]` |
| Unfold all | `Cmd+Opt+0` | `Ctrl+Alt+0` |

Click the fold indicator (triangle) next to any heading to collapse everything under that heading until the next heading of equal or higher level.

## Slash commands

Type `/` on any line to open the command menu. Start typing to filter. Navigate with arrow keys, press `Enter` to insert.

### Tasks and Kanban

| Command | What it does |
|---------|-------------|
| `/Kanban Board` | Open or create a kanban board |
| `/Linked Task` | Create a task linked to a kanban board |
| `/Simple Task` | Insert standalone `!task` syntax |

### Basic blocks

| Command | What it does |
|---------|-------------|
| `/Heading 1` | Big section heading |
| `/Heading 2` | Medium section heading |
| `/Heading 3` | Small section heading |
| `/Bullet List` | Unordered list |
| `/Ordered List` | Numbered list |
| `/Task List` | Checkbox list |
| `/Quote` | Blockquote |
| `/Table` | Opens a size picker grid (up to 6x8), click to insert |
| `/Image` | Triggers image embed autocomplete (`![[`) |
| `/Template` | Opens the template picker |
| `/Link to File` | Opens the file picker, inserts a `[[wiki-link]]` |
| `/Load Gmail` | Inserts an email template with the current filename as subject |

### Formatting

| Command | What it does |
|---------|-------------|
| `/Superscript` | Raise text (x^2) |
| `/Subscript` | Lower text (H2O) |
| `/Strikethrough` | Cross out text |
| `/Highlight` | Highlight text |
| `/Horizontal Rule` | Insert a divider |

### Code

| Command | What it does |
|---------|-------------|
| `/Code` | Toggle inline code |
| `/Code Block` | Insert a fenced code block |

### Callouts

| Command | What it does |
|---------|-------------|
| `/Note Callout` | Blue info callout |
| `/Tip Callout` | Green tip callout |
| `/Warning Callout` | Orange warning callout |
| `/Danger Callout` | Red danger callout |
| `/Info Callout` | Cyan info callout |
| `/Success Callout` | Green success callout |
| `/Question Callout` | Purple question callout |
| `/Example Callout` | Gray example callout |

### Math

| Command | What it does |
|---------|-------------|
| `/Inline Math` | Opens the math formula modal for inline LaTeX |
| `/Block Math` | Opens the math formula modal for display LaTeX |

## Code blocks

Type three backticks followed by a language name, then press Space to create a syntax-highlighted code block:

````
```javascript
const greeting = "hello";
```
````

Supported languages include: JavaScript, TypeScript, Python, Java, C, C++, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, CSS, HTML/XML, JSON, YAML, Bash/Shell, SQL, and Markdown. Short aliases work too -- `js`, `ts`, `py`, `sh`, `yml`, `cs`, `md`.

Inside a code block:
- `Enter` inserts a newline (stays in the block)
- `Backspace` at the start of an empty code block converts it back to a paragraph

## Mermaid diagrams

Type `` ``mm `` (two backticks followed by `mm`) to insert a Mermaid diagram block. The block renders the diagram live as you type. Supports flowcharts, sequence diagrams, Gantt charts, and other Mermaid syntax.

## Callouts

Callouts (admonitions) are styled blocks for notes, warnings, tips, and other highlighted content. Create them by typing:

```
>[!note] Optional title
```

The callout type goes inside `[! ]`. Available types:

| Type | Color | Icon |
|------|-------|------|
| `note` | Blue | Info |
| `tip` | Green | Lightbulb |
| `warning` | Orange | Warning triangle |
| `danger` | Red | Alert |
| `info` | Cyan | Info |
| `success` | Green | Checkmark |
| `question` | Purple | Question mark |
| `example` | Gray | Book |

### Collapsible callouts

Add a `-` after the type to make the callout start collapsed:

```
>[!warning]- Click to expand
Hidden content here.
```

Click the toggle button in the callout header to expand or collapse it.

## Tables

Insert a table with the `/Table` slash command. A size picker grid appears -- hover to select dimensions (up to 6 rows by 8 columns), then click to insert.

Tables include a header row by default. Use the bubble menu that appears when you click inside a table to add/remove rows and columns.

## Images

Embed images using the `![[filename]]` syntax. Type `![[` and an autocomplete dropdown appears showing image files in your workspace. Supported formats: PNG, JPG, JPEG, GIF, WebP, SVG, BMP, AVIF.

You can also paste a URL inside `![[` to embed an external image:

```
![[https://example.com/photo.png]]
```

The `/Image` slash command triggers the same `![[` autocomplete.

## Math equations

Lokus supports LaTeX math via KaTeX.

**Inline math:** Wrap in single dollar signs: `$x^2 + y^2 = z^2$`

**Block math:** Wrap in double dollar signs:

```
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

You can also use the `/Inline Math` and `/Block Math` slash commands to open a formula editor with a live preview.

## Symbol shortcuts

Type `:shortcode:` to insert special symbols. Works for Greek letters, math symbols, arrows, and more.

Examples:

| Shortcode | Symbol |
|-----------|--------|
| `:alpha:` | α |
| `:beta:` | β |
| `:theta:` | θ |
| `:pi:` | π |
| `:omega:` | ω |
| `:Delta:` | Δ |
| `:Sigma:` | Σ |
| `:arrow:` | → |
| `:leftarrow:` | ← |
| `:uparrow:` | ↑ |
| `:downarrow:` | ↓ |
| `:inf:` | ∞ |

The full set includes all Greek letters (lowercase and uppercase), arrows, math operators, logic symbols, and set operations. You can define custom symbols in Preferences.

## Markdown paste

Paste Markdown text into the editor and it converts to rich text automatically. The editor detects Markdown formatting in clipboard content and compiles it to HTML before inserting.

Pasting inside a code block inserts plain text -- no conversion happens.

## Editor modes

Lokus has three editor modes, saved per file:

- **Edit** -- Full rich text editing
- **Live** -- Live preview of Markdown rendering
- **Reading** -- Read-only rendered view

## Section folding

Click the triangle icon next to any heading to fold/unfold the content beneath it. Fold state is saved per note in localStorage. Folding collapses all content between the heading and the next heading of equal or higher level.

## Plugin extensions

The editor supports plugin-provided extensions. Plugins can:

- Register custom TipTap nodes and marks
- Add new slash commands to the `/` menu
- Subscribe to editor events
- Provide autocomplete suggestions

Plugin slash commands appear alongside built-in commands in the slash menu.
