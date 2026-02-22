---
title: Search
description: Full-text search across all notes with filters, fuzzy matching, and graph-enhanced results.
---

Lokus indexes every note for full-text search. Results rank by relevance with title matches weighted highest, then tags, then body content. Search runs in under 200ms for typical vaults.

## Open search

Press `Cmd+F` (macOS) or `Ctrl+F` (Windows/Linux) to open the search overlay. Start typing to see results instantly.

## How search works

The search engine indexes five fields per note:

| Field        | Boost | Description                     |
|--------------|-------|---------------------------------|
| `title`      | 3x    | Note title / filename           |
| `tags`       | 2x    | All tags on the note            |
| `content`    | 1x    | Stripped Markdown body text      |
| `folder`     | 1x    | Parent folder path              |
| `codeBlocks` | 1x    | Extracted code block contents    |

Search supports **fuzzy matching** (tolerance of 0.2) and **prefix matching**, so partial words return results.

## Filter results

Narrow results by combining your query with filters:

| Filter     | Values                                           |
|------------|--------------------------------------------------|
| `tag`      | Filter to notes with a specific tag              |
| `folder`   | Filter to notes in a folder path                 |
| `modified` | `today`, `yesterday`, `last7days`, `last30days`, or a date string |
| `created`  | Same date options as `modified`                  |

## Graph-enhanced search

Smart search augments text matches with knowledge graph data. When enabled, each result includes related notes discovered by traversing wiki links. Configure the traversal depth (1-3 hops) to control how far the graph exploration reaches.

Options for graph-enhanced search:

| Option           | Default | Description                              |
|------------------|---------|------------------------------------------|
| `depth`          | 1       | Wiki link hops to follow (1-3)           |
| `includeRelated` | true    | Show graph-connected notes in results    |
| `limit`          | 20      | Maximum results to return                |
| `folder`         | null    | Restrict search to a specific folder     |

## Explore a topic

Topic exploration starts from a single note and maps its connections through the knowledge graph. It groups related notes by distance:

- **Directly linked**: Notes one hop away
- **Second degree**: Two hops away
- **Third degree**: Three hops away

It also finds the shortest paths to hub notes (the most connected notes in your vault).

## Result highlights and snippets

Each search result includes:

- **Snippet**: A content excerpt around the first match, with surrounding context
- **Highlights**: Which fields matched and how many times
- **Score**: A relevance score combining text match quality and field boosts

## Autocomplete

Type at least 2 characters to get autocomplete suggestions. Results are ranked by title (3x boost) and tag (2x boost) relevance, returning up to 10 suggestions.

## Keyboard navigation

Navigate search results without leaving the keyboard:

| Key         | Action                    |
|-------------|---------------------------|
| `Enter`     | Open selected result      |
| `Escape`    | Close search              |
| `Arrow Up`  | Previous result           |
| `Arrow Down`| Next result               |
