---
title: Quick Start
description: Create your first workspace, write a note, and learn the basics of Lokus in five minutes.
---

This guide walks you through the first five minutes with Lokus: creating a workspace, writing a note, and navigating the interface.

## Create a workspace

A workspace is a folder on your computer where Lokus stores your notes as plain markdown files. You can use any folder -- a new empty one, an existing folder of `.md` files, or even an Obsidian vault.

1. Launch Lokus. The **Launcher** screen appears.
2. Click **Create New Workspace** to start fresh, or **Open Existing Workspace** to point Lokus at a folder you already have.
3. Pick or create a folder in the file dialog. Lokus will use this folder as your workspace root.

That's it. Lokus opens the workspace and you're ready to write.

:::tip
Your notes are standard markdown files stored in the folder you chose. You can browse them in Finder, Explorer, or any file manager at any time. No proprietary format, no lock-in.
:::

## The interface

The Lokus workspace has three main areas:

| Area | Location | What it does |
|------|----------|--------------|
| **File tree** | Left sidebar | Browse, create, and organize files and folders. |
| **Editor** | Center | Write and edit your notes. |
| **Right sidebar** | Right side | Document outline, backlinks, graph sidebar, and plugin panels. |

Toggle the left sidebar with `Cmd+B` (macOS) / `Ctrl+B` (Windows/Linux). Toggle the right sidebar with `Cmd+Shift+B` / `Ctrl+Shift+B`.

## Create your first note

Press `Cmd+N` (macOS) or `Ctrl+N` (Windows/Linux). A new file appears in the file tree. Type a name and press Enter.

You can also right-click in the file tree and select **New File**.

Start typing in the editor. Lokus saves automatically -- there is no manual save step needed, though `Cmd+S` / `Ctrl+S` works too.

## Create a folder

Press `Cmd+Shift+N` (macOS) or `Ctrl+Shift+N` (Windows/Linux) to create a new folder. You can also right-click in the file tree and select **New Folder**.

Drag and drop files between folders to reorganize.

## Write markdown

Lokus is a rich text editor with live markdown rendering. Type markdown and it renders inline as you write.

Common formatting:

| Syntax | Result | Shortcut |
|--------|--------|----------|
| `**bold**` | **bold** | `Cmd+B` / `Ctrl+B` |
| `*italic*` | *italic* | `Cmd+I` / `Ctrl+I` |
| `~~strike~~` | ~~strike~~ | `Cmd+Shift+X` / `Ctrl+Shift+X` |
| `` `code` `` | `code` | `Cmd+E` / `Ctrl+E` |
| `==highlight==` | highlighted text | `Cmd+Shift+H` / `Ctrl+Shift+H` |

### Headings

Type `#` followed by a space for headings. `##` for H2, `###` for H3, and so on.

### Lists and tasks

- Type `-` or `*` followed by a space for bullet lists.
- Type `1.` followed by a space for numbered lists.
- Type `- [ ]` for a task checkbox. Click the checkbox to toggle it.

### Code blocks

Type three backticks (` ``` `) followed by a language name and press Enter. Lokus highlights syntax for 100+ languages.

### Math

Inline math: wrap in single dollar signs `$E = mc^2$`.

Block math: wrap in double dollar signs `$$` on their own lines. Rendered with KaTeX.

## Link notes with wiki links

Connect notes using `[[wiki links]]`. Type `[[` and Lokus shows an autocomplete list of all notes in your workspace.

- `[[Note Name]]` links to a note by its filename.
- `[[Note Name|Display Text]]` links to a note but shows custom text.
- `[[Note Name#Heading]]` links to a specific heading within a note.

Press `Cmd+L` / `Ctrl+L` to open the wiki link picker directly.

## Use slash commands

Type `/` at the start of a line or after a space to open the slash command menu. This gives you quick access to insert blocks like:

- Headings, callouts, and dividers
- Code blocks and math blocks
- Tables
- Images
- Task lists

## Open the command palette

Press `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) to open the command palette. From here you can:

- Search and open any file in the workspace
- Run commands (toggle views, open preferences, etc.)
- Jump to actions fast without memorizing every shortcut

## Search your notes

**Find in current note:** `Cmd+F` / `Ctrl+F` opens an in-file search bar.

**Search across all notes:** `Cmd+Shift+F` / `Ctrl+Shift+F` opens global full-text search in the left panel. Results update as you type and show matching lines in context.

## Open daily notes

Press `Cmd+Shift+D` / `Ctrl+Shift+D` to open or create today's daily note. Lokus creates a markdown file named with the current date.

Configure the date format and daily notes folder in **Preferences > Daily Notes**.

## Open the graph view

Press `Cmd+Shift+G` / `Ctrl+Shift+G` to open the knowledge graph. It shows your notes as nodes and wiki links as edges. Lokus supports both 2D and 3D graph rendering.

Click any node in the graph to open that note.

## Open a canvas

Press `Cmd+Shift+C` / `Ctrl+Shift+C` to create a new canvas -- an infinite whiteboard for spatial thinking, built on TLDraw. You can place notes, draw, and arrange ideas visually.

## Open preferences

Press `Cmd+,` (macOS) or `Ctrl+,` (Windows/Linux) to open Preferences. Key sections:

- **Appearance** -- theme, font, accent color
- **Editor** -- tab size, line numbers, spell check
- **Shortcuts** -- view and customize all keyboard shortcuts
- **Import** -- import notes from other apps

## Keyboard shortcuts reference

| Action | macOS | Windows / Linux |
|--------|-------|-----------------|
| New file | `Cmd+N` | `Ctrl+N` |
| New folder | `Cmd+Shift+N` | `Ctrl+Shift+N` |
| Save | `Cmd+S` | `Ctrl+S` |
| Find in note | `Cmd+F` | `Ctrl+F` |
| Global search | `Cmd+Shift+F` | `Ctrl+Shift+F` |
| Command palette | `Cmd+K` | `Ctrl+K` |
| Insert wiki link | `Cmd+L` | `Ctrl+L` |
| Toggle left sidebar | `Cmd+B` | `Ctrl+B` |
| Toggle right sidebar | `Cmd+Shift+B` | `Ctrl+Shift+B` |
| Daily note | `Cmd+Shift+D` | `Ctrl+Shift+D` |
| Graph view | `Cmd+Shift+G` | `Ctrl+Shift+G` |
| Preferences | `Cmd+,` | `Ctrl+,` |
| Show all shortcuts | `F1` | `F1` |

Press `F1` at any time to see the full shortcut list inside Lokus.

## Next steps

- [Import notes](/getting-started/importing-notes) from Obsidian, Logseq, or Roam Research.
- Explore [wiki links and backlinks](/features/wiki-links) in depth.
- Set up [daily notes](/features/daily-notes) for journaling.
- Browse the [template system](/features/templates) to speed up note creation.
