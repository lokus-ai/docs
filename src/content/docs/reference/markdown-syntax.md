---
title: Markdown Syntax
description: All supported markdown syntax in Lokus v1.0.1 with examples.
---

Lokus uses a markdown compiler built on [markdown-it](https://github.com/markdown-it/markdown-it) with extensions for highlights, strikethrough, task lists, math, callouts, and WikiLinks.

## Text Formatting

| Syntax | Output | Notes |
|---|---|---|
| `**bold**` | **bold** | Also supports `__bold__` |
| `*italic*` | *italic* | Also supports `_italic_` |
| `~~strikethrough~~` | ~~strikethrough~~ | Requires `markdown-it-strikethrough-alt` |
| `==highlight==` | Highlighted text | Requires `markdown-it-mark` |
| `` `inline code` `` | `inline code` | Single backticks |
| `<u>underline</u>` | Underlined text | HTML tags enabled |

## Headings

| Syntax | Level |
|---|---|
| `# Heading` | H1 |
| `## Heading` | H2 |
| `### Heading` | H3 |
| `#### Heading` | H4 |
| `##### Heading` | H5 |
| `###### Heading` | H6 |

A space after `#` is required. Maximum depth: 6 levels.

### Alternative Heading Marker

Enable in **Preferences > Markdown** to use a custom marker (default `^`):

| Syntax | Level |
|---|---|
| `^ Heading` | H1 |
| `^^ Heading` | H2 |
| `^^^ Heading` | H3 |

## Links

### Standard Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Title")
```

### WikiLinks

```markdown
[[Note Name]]
[[Note Name|Display Text]]
```

WikiLinks create bidirectional connections visible in the Graph View. Toggle WikiLink support in **Preferences > Markdown**.

### Auto-linking

URLs are automatically converted to clickable links when `linkify` is enabled (on by default).

```markdown
https://example.com
```

## Images

```markdown
![Alt text](path/to/image.png)
![Alt text](https://example.com/image.jpg "Optional title")
```

WikiLink-style images are also supported:

```markdown
![[image.png]]
```

## Lists

### Unordered Lists

```markdown
- Item one
- Item two
  - Nested item
```

Valid markers: `-`, `*`, `+`. Default: `-`.

### Ordered Lists

```markdown
1. First item
2. Second item
3. Third item
```

### Task Lists

```markdown
- [ ] Incomplete task
- [x] Complete task
- [/] Partially complete task
```

Task checkboxes are interactive in the editor -- click to toggle state.

## Blockquotes

```markdown
> Single blockquote

> Nested blockquotes
>> Second level
>>> Third level
```

## Callouts

Callouts use Obsidian-compatible syntax:

```markdown
> [!note] Optional Title
> Callout content here.
```

| Type | Description |
|---|---|
| `[!note]` | General information |
| `[!tip]` | Helpful advice |
| `[!warning]` | Caution notice |
| `[!danger]` | Critical warning |
| `[!info]` | Informational |
| `[!success]` | Success message |
| `[!question]` | Question or FAQ |
| `[!example]` | Example content |

Collapsible callouts use a `-` suffix:

```markdown
> [!tip]- Click to expand
> Hidden content here.
```

## Code Blocks

### Fenced Code Blocks

````markdown
```javascript
const greeting = "Hello, Lokus!";
console.log(greeting);
```
````

Language identifiers are supported for syntax highlighting. The alternative `~~~` fence marker also works.

### Inline Code

```markdown
Use `inline code` in a sentence.
```

## Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|:--------:|---------:|
| Left     | Center   | Right    |
| Cell     | Cell     | Cell     |
```

| Alignment | Syntax |
|---|---|
| Left (default) | `:--` or `---` |
| Center | `:-:` |
| Right | `--:` |

Tables pasted from spreadsheets are automatically detected and formatted.

## Math (LaTeX)

### Inline Math

```markdown
The equation $E = mc^2$ is well-known.
```

### Block Math

```markdown
$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$
```

Insert inline math with `Cmd+M` / `Ctrl+M`. Insert math blocks with `Cmd+Shift+M` / `Ctrl+Shift+M`.

## Horizontal Rules

Any of these produce a horizontal rule:

```markdown
---
***
___
```

Minimum 3 characters required.

## HTML

Inline HTML is supported because the compiler runs with `html: true`:

```markdown
<details>
<summary>Click to expand</summary>
Hidden content here.
</details>

Text with <mark>HTML highlight</mark> or <kbd>keyboard</kbd> styling.
```

## Escape Characters

Prefix any markdown character with `\` to render it literally:

```markdown
\*not italic\*
\# not a heading
\[[not a wikilink]]
```

## Compiler Options

The markdown compiler accepts these options (configured in source):

| Option | Default | Description |
|---|---|---|
| `html` | `true` | Allow HTML tags in markdown |
| `linkify` | `true` | Auto-convert URLs to links |
| `typographer` | `true` | Smart quotes and dashes |
| `breaks` | `true` | Convert newlines to `<br>` |
| `aggressive` | `true` | Aggressively detect markdown in pasted content |
| `minLength` | `5` | Minimum text length for markdown detection |

## Syntax Configuration

Per-workspace syntax settings are stored in `.lokus/markdown-syntax.json`. Configure which features are enabled in **Preferences > Markdown**.

| Feature | Config Key | Default |
|---|---|---|
| WikiLinks | `link.wikiLink.enabled` | `true` |
| Task Lists | `taskList.enabled` | `true` |
| Tables | `table.enabled` | `true` |
| Strikethrough | `strikethrough.enabled` | `true` |
| Highlight | `highlight.enabled` | `true` |
| Inline Math | `math.inline.enabled` | `true` |
| Block Math | `math.block.enabled` | `true` |
| Auto-link URLs | `link.autoLink.enabled` | `true` |
| Images | `image.enabled` | `true` |
| Comments (`%%`) | `comments.enabled` | `false` |
| Footnotes | `footnote.enabled` | `false` |
