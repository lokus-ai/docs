---
title: Wiki Links
description: Link notes with [[wiki-link]] syntax, backlinks, block references, image embeds, and autocomplete.
---

Wiki links connect your notes. Type `[[` to link to another note, `![[` to embed an image, or `[[page^block]]` to reference a specific block.

## Creating links

Type `[[` and an autocomplete dropdown appears with all notes in your workspace. Start typing to filter by filename or path. Press `Enter` or click to insert the link.

```markdown
[[My Note]]
```

The autocomplete:
- Shows up to 30 results
- Scores same-folder files higher
- Matches on filename and file path
- Uses first-character caching for instant results

When you select a file, Lokus inserts a link in the format `[[path|display name]]`. The display name is the filename without the `.md` extension.

## Link syntax

### Basic link

```markdown
[[Note Title]]
```

Links to a file named `Note Title.md` in your workspace.

### Link with alias

```markdown
[[path/to/note|Custom Display Text]]
```

The text after `|` is what appears in the editor. The path before `|` is used for resolution.

### Heading link

```markdown
[[Note Title#heading-name]]
```

Links to a specific heading within a note. The `#` separator works like a URL hash.

### Block reference

```markdown
[[Note Title^block-id]]
```

Links to a specific block (paragraph, list item, etc.) within a note. Type `[[Note Title^` and the autocomplete switches to block mode, showing all blocks in that file.

If the target block does not have an explicit block ID, Lokus generates one and writes it back to the source file when you select it.

## Image embeds

Type `![[` to embed an image. The autocomplete shows image files in your workspace (PNG, JPG, JPEG, GIF, WebP, SVG, BMP, AVIF).

```markdown
![[photo.png]]
```

You can also paste a URL inside `![[`:

```markdown
![[https://example.com/image.png]]
```

The image renders inline in the editor. If an external image fails to load, a placeholder appears with a link to the URL.

## Block embeds

Embed a specific block from another note:

```markdown
![[Note Title^block-id]]
```

This renders the referenced block's content inline in the current note.

## Canvas links

Type `![` (single bracket, not double) to link to a canvas file. The autocomplete shows `.canvas` files in your workspace. Selecting one inserts a canvas link node that shows a preview of the canvas.

## Backlinks panel

The backlinks panel shows every note that links to the current note. Open it from the sidebar.

It has three sections:

### Linked mentions

Notes that contain a `[[wiki-link]]` pointing to the current file. Each backlink shows the source filename and the surrounding context.

### Block backlinks

Notes that reference specific blocks in the current file using the `^block-id` syntax.

### Unlinked mentions

Notes that mention the current file's name in plain text but do not have a wiki link. These are potential links you might want to formalize.

## Link resolution

When you create a wiki link, Lokus resolves the target asynchronously:

1. Checks the workspace file index for a matching filename or path
2. Resolves relative paths from the current file's directory
3. For image embeds, reads the file and converts it to a data URL for display
4. For external URLs (starting with `http://` or `https://`), uses the URL directly

If duplicate filenames exist in different folders, the autocomplete inserts a path prefix to disambiguate. Root-level files with duplicates get a `./` prefix.

## Hover preview

Hover over any wiki link for 500ms and a preview popup appears showing the linked note's content. Move your mouse away to dismiss it.

## Click to navigate

Click any wiki link to open the linked note. The editor dispatches an open-file event that the workspace handles -- it opens the file in the current editor tab or creates a new tab.
