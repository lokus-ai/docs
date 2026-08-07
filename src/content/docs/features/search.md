---
title: Search
description: Find anything in your vault — global search, in-note find, and the quick switcher.
---


![Global search results](/shots/search.png)

Three ways to find things in Lokus:

| Tool | Shortcut | What it does |
|---|---|---|
| **Global search** | `⌘⇧F` | Searches the text of every note on disk, instantly |
| **Quick switcher** | `⌘P` | Jumps to any file by name |
| **Find in note** | `⌘F` | Searches inside the open note |
| **Command palette** | `⌘K` | Finds commands, not notes |

## Global search

Global search reads your vault from disk on every query, so results are **always current** — a note you saved a second ago is searchable now, with no index to rebuild or corrupt.

- Matches are shown with the surrounding line as context.
- Title and filename matches rank above body matches.
- Works on vaults of any size; search is a native (Rust) scan, so it stays fast even where JS indexes would choke.

## Quick switcher

`⌘P` opens a fuzzy file picker over your whole vault. Type part of the name; arrow keys + Enter open the note. This is the fastest way to move between notes without touching the mouse.

## Find in note

`⌘F` searches the open note with match highlighting; `⌘H` opens find-and-replace.

## Tags and links as search

Two structural ways to "search" without typing a query:

- **Tags** — click a tag (or open the tags panel) to list every note carrying it. See [Tags](/features/tags/).
- **Backlinks** — open any note and the right sidebar lists every note that links to it. See [Wiki Links](/features/wiki-links/).
