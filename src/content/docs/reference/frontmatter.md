---
title: Frontmatter
description: Supported YAML frontmatter fields, types, and usage in Lokus v1.0.1.
---

Frontmatter is YAML metadata at the top of a markdown file, enclosed by `---` delimiters. Lokus parses frontmatter for Bases, filtering, sorting, and display in the editor.

## Syntax

```yaml
---
title: My Note
tags: [project, draft]
date: 2026-02-22
---

Note content starts here.
```

The opening `---` must be the first line of the file. The closing delimiter can be `---` or `...`.

## Supported Value Types

| Type | Example | Notes |
|---|---|---|
| String | `title: My Note` | Quotes optional unless value contains `:`, `#`, or newlines |
| Number | `priority: 3` | Integer or float |
| Boolean | `draft: true` | `true` or `false` |
| Date | `date: 2026-02-22` | ISO 8601 format (`YYYY-MM-DD`) auto-detected |
| Array (inline) | `tags: [a, b, c]` | Inline arrays for 5 or fewer items |
| Array (block) | See below | Multi-line `- item` syntax for longer lists |
| Null | `value: null` | Or omit the value entirely |
| Object | See below | Nested key-value pairs |

### Block Array

```yaml
tags:
  - project
  - draft
  - important
  - review
  - archive
  - reference
```

### Nested Object

```yaml
metadata:
  author: Jane
  version: 2
```

## Common Fields

These fields are recognized by Lokus features (Bases, search, graph, daily notes). You can add any custom field -- Lokus reads all valid YAML properties.

| Field | Type | Description | Used By |
|---|---|---|---|
| `title` | String | Note title (overrides filename) | Bases, Graph, Search |
| `tags` | Array | Categorization tags | Bases, Tag Manager, Filtering |
| `date` | Date | Creation or publication date | Bases, Sorting, Daily Notes |
| `created` | Date | When the note was created | Bases, Sorting |
| `modified` | Date | Last modification date | Bases, Sorting |
| `aliases` | Array | Alternative names for WikiLink resolution | WikiLinks, Search |
| `description` | String | Short summary | Search, Bases |
| `draft` | Boolean | Mark note as draft | Filtering |
| `status` | String | Workflow status (e.g., `todo`, `done`) | Bases, Kanban |
| `priority` | String/Number | Priority level | Bases, Sorting |
| `category` | String | Note category | Bases, Filtering |
| `author` | String | Author name | Bases |
| `cssclass` | String | Custom CSS class applied to the note | Editor styling |
| `publish` | Boolean | Whether the note should be published | Filtering |

## Bases Integration

Bases (database views) automatically scan frontmatter across all files in a folder. Every unique frontmatter key becomes a filterable, sortable column.

### Property Type Detection

Lokus auto-detects types from values:

| Value Pattern | Detected Type |
|---|---|
| `true` / `false` | Boolean |
| `123`, `3.14` | Number |
| `2026-02-22` (ISO date) | Date |
| `[a, b, c]` | Array |
| `"quoted"` or `'quoted'` | String |
| Everything else | String |

### Filtering Examples

In a Base view, filter notes by frontmatter:

| Filter | Matches |
|---|---|
| `status == "done"` | Notes with status `done` |
| `priority > 2` | Notes with priority above 2 |
| `tags contains "project"` | Notes tagged with `project` |
| `draft == false` | Non-draft notes |
| `date > 2026-01-01` | Notes dated after Jan 1, 2026 |

## Editing Frontmatter

### In the Editor

Edit frontmatter directly as YAML text at the top of any note.

### Programmatic Access

The `FrontmatterWriter` class provides methods to update frontmatter without manual text editing:

| Method | Description |
|---|---|
| `updateProperty(content, key, value)` | Add or update a property |
| `removeProperty(content, key)` | Remove a property |
| `ensureFrontmatter(content, properties)` | Add frontmatter block if missing |
| `getProperties(content)` | Read all properties |

### Formatting Rules

When Lokus writes frontmatter values:

| Value Type | Output Format |
|---|---|
| String with special chars | `"quoted with escapes"` |
| String resembling bool/number | `"true"`, `"42"` (quoted) |
| Array (5 items or fewer) | `[a, b, c]` (inline) |
| Array (6+ items) | Multi-line `- item` format |
| Empty array | `[]` |
| Empty object | `{}` |
| Date object | ISO 8601 string |
| `null` | Empty value |

## Importing from Other Apps

Lokus converts property formats from other note-taking apps during import:

| Source App | Source Format | Converted To |
|---|---|---|
| Logseq | `property:: value` | YAML frontmatter |
| Roam Research | `attribute:: value` | YAML frontmatter |
| Obsidian | YAML frontmatter | Kept as-is |

## Validation

Frontmatter parsing fails gracefully. If the YAML is invalid, Lokus treats the file as having no frontmatter rather than showing an error. The raw text remains untouched.

Common issues:

| Problem | Fix |
|---|---|
| Missing closing `---` | Add the closing delimiter |
| Tab characters in YAML | Replace tabs with spaces |
| Unquoted special characters | Wrap value in quotes: `"value: with colon"` |
| Missing space after colon | Add space: `key: value` not `key:value` |
