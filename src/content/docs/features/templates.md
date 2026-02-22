---
title: Templates
description: Create reusable note templates with dynamic variables, date operations, and conditional logic.
---

Templates let you define reusable note structures with dynamic content. Insert dates, prompt for input, run conditional logic, and loop over data -- all from a Markdown file with YAML frontmatter.

## Create a template

1. Press `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) to open the command palette.
2. Select **Create Template from Selection**.
3. Fill in name, category, tags, and content.
4. Click **Save Template**.

Templates are stored as `.md` files in `<workspace>/templates/`.

## Template file structure

Each template is a Markdown file with YAML frontmatter:

```markdown
---
id: daily-standup
name: "Daily Standup Notes"
category: Work
tags:
  - meeting
  - daily
createdAt: 2025-11-06T00:00:00.000Z
updatedAt: 2025-11-06T00:00:00.000Z
---

# Daily Standup - {{date.format('MMMM do, yyyy')}}

## What I did yesterday
{{cursor}}

## What I'll do today

## Blockers
```

The `id` must be lowercase alphanumeric with hyphens or underscores.

## Use a template

Press `Cmd+K`, type the template name or browse the list, and select it. Content is inserted at your cursor with all variables resolved.

## Variables

### Basic variables

| Variable       | Output                          |
|----------------|---------------------------------|
| `{{date}}`     | Current date (`YYYY-MM-DD`)     |
| `{{time}}`     | Current time (`HH:mm:ss`)      |
| `{{datetime}}` | Current date and time           |
| `{{timestamp}}`| Unix timestamp                  |
| `{{user}}`     | Current username                |
| `{{uuid}}`     | Unique identifier               |
| `{{cursor}}`   | Places cursor here after insert |

### Date operations

Format dates, do arithmetic, and access properties -- all chainable:

```markdown
{{date.format('MMMM do, yyyy')}}           → February 22nd, 2026
{{date.add(7, 'days')}}                     → 7 days from now
{{date.subtract(2, 'weeks')}}               → 2 weeks ago
{{date.tomorrow}}                           → Tomorrow's date
{{date.nextMonday}}                         → Next Monday
{{date.startOfWeek}}                        → Start of current week
{{date.week}}                               → Week number (1-53)
{{date.quarter}}                            → Quarter (1-4)
{{date.add(7, 'days').format('MMM do')}}    → Chained operations
```

Format tokens: `yyyy` (year), `MM` (month), `dd` (day), `MMMM` (full month), `dddd` (full day name).

Arithmetic units: `'days'`, `'weeks'`, `'months'`, `'years'`.

Relative dates: `tomorrow`, `yesterday`, `nextWeek`, `lastWeek`, `nextMonday`, `previousFriday`.

Boundaries: `startOfWeek`, `endOfWeek`, `startOfMonth`, `endOfMonth`, `startOfYear`, `endOfYear`.

## Conditionals

```markdown
{{#if priority == 'High'}}
This is a high priority task!
{{else if priority == 'Medium'}}
This is a medium priority task.
{{else}}
This is a low priority task.
{{/if}}
```

Operators: `==`, `!=`, `>`, `>=`, `<`, `<=`, `&&`, `||`. Conditionals can be nested.

## Loops

```markdown
{{#each tasks}}
  {{@index}}. {{this.title}} ({{this.status}})
{{/each}}
```

Loop variables: `{{@index}}` (0-based), `{{@first}}`, `{{@last}}`, `{{@length}}`, `{{@key}}`.

## Filters

Transform values with the pipe (`|`) operator:

```markdown
{{name | upper}}                → UPPERCASE
{{name | lower}}                → lowercase
{{name | truncate(50)}}         → Truncate to 50 chars
{{items | join(', ')}}          → Join array with comma
{{items | sort}}                → Sort alphabetically
{{date | dateFormat('yyyy-MM-dd')}}
{{date | timeAgo}}              → "3 days ago"
{{name | trim | upper | truncate(20)}}  → Chain filters
```

Other string filters: `capitalize`, `title`, `slug`, `replace('old', 'new')`.

Other array filters: `first`, `last`, `length`, `unique`.

## User prompts

Ask for input when the template is applied:

```markdown
{{prompt:title:Meeting title:Team Sync}}
```

Format: `{{prompt:variableName:label:defaultValue}}`.

For dropdown choices:

```markdown
{{suggest:status:Status:Planning,In Progress,Review,Done:Planning}}
```

## Template includes

Reuse templates inside other templates:

```markdown
{{include:header}}
{{include:greeting:name=John,time=morning}}
```

## JavaScript execution

```markdown
{{js: return new Date().getFullYear()}}
{{js: return Math.random() > 0.5 ? 'Yes' : 'No'}}
```

Available: `Math`, `Date`, `JSON`, standard object methods, plus helpers `uuid()`, `format()`, `slugify()`.

## Example: meeting notes

```markdown
---
id: meeting-notes
name: "Meeting Notes"
category: Work
tags:
  - meeting
---

# {{prompt:meetingType:Meeting type:Team Sync}} - {{date.format('MMM do')}}

**Date:** {{date.format('MMMM do, yyyy')}}
**Attendees:** {{prompt:attendees:Who attended?:}}

## Agenda
1.
2.

## Discussion
{{cursor}}

## Action Items
- [ ] Task | Due: {{date.add(7, 'days').format('MMM do')}}
```

## Manage templates

- **List**: Browse all templates, filter by category
- **Update**: Modify name, content, category, or tags
- **Delete**: Remove a template file

Edit template files directly in any text editor. Changes sync with Lokus when you refresh the Template Manager.
