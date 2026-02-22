---
title: Bases
description: Query your notes as structured data using YAML frontmatter, with table, list, and gallery views, filters, sorting, and formulas.
---

Bases let you treat your notes as a database. Define a base that pulls notes from a folder, tag, or search query, then view and filter them by their YAML frontmatter properties. Think of it like a spreadsheet view over your Markdown files.

## Creating a base

Create a `.base` file from the sidebar or command palette. A base file is JSON that defines:

- **Source** -- Where to pull notes from (folder, tag, or search query)
- **Properties** -- Which frontmatter fields to display
- **Views** -- How to display the data (table, list, gallery)
- **Filters and sorts** -- How to narrow and order the results

### Example base file

```json
{
  "name": "Project Notes",
  "source": {
    "type": "folder",
    "path": "/projects",
    "recursive": true
  },
  "properties": {
    "title": { "type": "text", "name": "Title" },
    "status": { "type": "select", "name": "Status", "options": ["draft", "review", "published"] },
    "tags": { "type": "multi-select", "name": "Tags" },
    "created": { "type": "date", "name": "Created" },
    "modified": { "type": "date", "name": "Modified" }
  },
  "views": {
    "default": {
      "type": "table",
      "name": "All Notes",
      "sort": [{ "property": "modified", "direction": "desc" }],
      "display": {
        "columns": [
          { "property": "title", "width": 200, "visible": true },
          { "property": "status", "width": 120, "visible": true },
          { "property": "tags", "width": 150, "visible": true },
          { "property": "modified", "width": 120, "visible": true }
        ],
        "pageSize": 50
      }
    }
  }
}
```

## Data sources

Each base has a `source` that determines which notes it includes:

| Source type | Config | Description |
|-------------|--------|-------------|
| `folder` | `path`, `recursive` | All Markdown files in a folder (optionally including subfolders) |
| `tag` | `tag` | All notes with a specific tag in frontmatter |
| `search` | `query` | Notes matching a text search query |
| `manual` | -- | Manually selected notes |

## Property types

Properties map to YAML frontmatter fields. Lokus auto-detects types from values, but you can also define them explicitly.

| Type | Description | Example value |
|------|-------------|---------------|
| `text` | Plain text string | `"Meeting notes"` |
| `number` | Numeric value | `42` |
| `date` | Date or datetime | `2025-01-15` |
| `boolean` | True/false | `true` |
| `select` | Single choice from options | `"draft"` |
| `multi-select` | Multiple choices | `["react", "typescript"]` |
| `file` | File path reference | `"/path/to/note.md"` |
| `url` | URL | `"https://example.com"` |
| `email` | Email address | `"user@example.com"` |
| `phone` | Phone number | `"+1-555-0123"` |
| `rating` | Numeric rating (0-5) | `4` |
| `formula` | Computed value | `concat(title, " - ", status)` |
| `relation` | Link to another base | -- |
| `rollup` | Aggregation over a relation | -- |

The frontmatter in your Markdown files provides the data:

```yaml
---
title: Weekly Review
status: draft
tags: [planning, weekly]
priority: high
due: 2025-02-28
---
```

## Views

### Table view

The default view. Shows notes as rows and properties as columns. Features:

- Click column headers to sort ascending/descending
- Drag column borders to resize
- Show/hide columns via the column manager
- Pagination (configurable page size, default 50)
- Click a row to open that note

### List view

A compact vertical list showing note names and selected properties. Good for scanning through many notes quickly.

### Gallery view

A grid of cards, each showing a note's properties in a card layout. Useful when notes have images or you want a more visual overview.

## Filtering

Click the filter icon to open the filter builder. Each filter has three parts:

1. **Property** -- Which field to filter on
2. **Operator** -- How to compare
3. **Value** -- What to compare against

### Filter operators

| Category | Operators |
|----------|-----------|
| Equality | `==`, `!=` |
| Comparison | `>`, `>=`, `<`, `<=` |
| Text | `contains`, `not-contains`, `starts-with`, `ends-with`, `matches` |
| Array | `in`, `not-in` |
| Existence | `is-empty`, `is-not-empty` |
| Tags | `taggedWith`, `not-taggedWith` |
| Files | `inFolder`, `not-inFolder`, `hasOutlink`, `hasBacklink` |
| Dates | `before`, `after`, `on`, `between` |

Combine multiple filters with `AND` or `OR` logic.

### Built-in filter functions

These functions work in filter expressions:

| Function | Description |
|----------|-------------|
| `taggedWith(file, tag)` | File has a specific tag |
| `inFolder(file, path)` | File is in a folder |
| `hasLink(file, target)` | File links to target |
| `hasProperty(file, prop)` | File has a frontmatter property |
| `isEmpty(file)` | File content is empty |
| `hasContent(file, text)` | File contains specific text |
| `wordCount(file)` | Word count of file |
| `createdAfter(file, date)` | Created after a date |
| `createdBefore(file, date)` | Created before a date |
| `modifiedAfter(file, date)` | Modified after a date |

## Sorting

Sort by any property in ascending or descending order. You can apply multiple sort levels -- the first sort is primary, subsequent sorts break ties.

```json
"sort": [
  { "property": "priority", "direction": "desc" },
  { "property": "modified", "direction": "desc" }
]
```

Type-aware sorting is built in: numbers sort numerically, dates sort chronologically, booleans sort by value, and text sorts alphabetically using locale-aware comparison.

## Formulas

Define computed properties using formula expressions. The formula engine supports:

### Math functions

`sum`, `average`, `min`, `max`, `count`, `round`, `ceil`, `floor`, `abs`, `sqrt`, `power`

### Text functions

`concat`, `length`, `upper`, `lower`, `trim`, `substring`, `replace`, `split`, `join`

### Date functions

`now`, `today`, `year`, `month`, `day`, `weekday`, `dateAdd`, `dateDiff`, `formatDate`

### Logic functions

`if`, `and`, `or`, `not`, `switch`

### Note-specific functions

`noteTitle`, `notePath`, `noteTags`, `noteCreated`, `noteModified`, `backlinks`, `outlinks`

### Example formula property

```json
"daysSinceModified": {
  "type": "formula",
  "name": "Days Since Modified",
  "formula": "dateDiff(noteModified(), now(), 'days')"
}
```

## Scope

By default, a base queries all files matching its source. You can narrow the scope to the currently selected folder in the file tree by toggling the scope mode between "all" and "current folder" in the bases toolbar.

## Exporting

Click the export button to download the current view as a CSV file. The export includes all visible rows and columns, with arrays joined by semicolons and dates formatted as ISO strings.

## Settings

Each base has configurable settings:

| Setting | Default | Description |
|---------|---------|-------------|
| `defaultView` | `"default"` | Which view to show when opening the base |
| `allowCreate` | `true` | Allow creating new notes from the base |
| `allowEdit` | `true` | Allow editing note properties inline |
| `allowDelete` | `false` | Allow deleting notes from the base |
| `template` | -- | Template to use when creating new notes |
| `autoRefresh` | `false` | Auto-refresh data on an interval |
| `refreshInterval` | `30000` | Refresh interval in milliseconds |
