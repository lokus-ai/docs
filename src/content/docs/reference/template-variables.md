---
title: Template Variables
description: Complete reference for Lokus template syntax, variables, filters, and control flow.
---

Templates use `{{variable}}` syntax. Variables are resolved at insertion time.

## Basic Variables

| Variable | Output | Example |
|---|---|---|
| `{{date}}` | Current date | `2026-02-22` |
| `{{time}}` | Current time | `14:30:00` |
| `{{datetime}}` | Date and time | `2026-02-22 14:30:00` |
| `{{timestamp}}` | Unix timestamp | `1771948200` |
| `{{user}}` | Current username | `pratham` |
| `{{uuid}}` | Unique identifier | `a1b2c3d4-e5f6-...` |
| `{{random}}` | Random number (0-1) | `0.7342` |
| `{{cursor}}` | Cursor position after insertion | (places cursor here) |

## Date Formatting

Chain `.format()` to any date variable:

```
{{date.format('MMMM do, yyyy')}}     → February 22nd, 2026
{{date.format('yyyy-MM-dd')}}        → 2026-02-22
{{date.format('dddd, MMM D')}}       → Sunday, Feb 22
```

| Token | Output | Example |
|---|---|---|
| `yyyy` | 4-digit year | `2026` |
| `MM` | 2-digit month | `02` |
| `dd` | 2-digit day | `22` |
| `MMMM` | Full month name | `February` |
| `MMM` | Short month name | `Feb` |
| `dddd` | Full day name | `Sunday` |
| `ddd` | Short day name | `Sun` |

## Date Arithmetic

| Expression | Result |
|---|---|
| `{{date.add(7, 'days')}}` | 7 days from now |
| `{{date.subtract(2, 'weeks')}}` | 2 weeks ago |
| `{{date.addMonths(3)}}` | 3 months from now |
| `{{date.subtractYears(1)}}` | 1 year ago |

Units: `'days'`, `'weeks'`, `'months'`, `'years'`.

## Relative Dates

| Variable | Result |
|---|---|
| `{{date.tomorrow}}` | Tomorrow's date |
| `{{date.yesterday}}` | Yesterday's date |
| `{{date.nextWeek}}` | Same day next week |
| `{{date.lastWeek}}` | Same day last week |
| `{{date.nextMonth}}` | Same day next month |
| `{{date.lastMonth}}` | Same day last month |
| `{{date.nextMonday}}` | Next Monday |
| `{{date.previousFriday}}` | Previous Friday |

## Date Properties

| Variable | Result |
|---|---|
| `{{date.week}}` | Week number (1-53) |
| `{{date.quarter}}` | Quarter (1-4) |
| `{{date.weekday}}` | Day of week (0-6, 0=Sunday) |
| `{{date.daysInMonth}}` | Days in current month |
| `{{date.isLeapYear}}` | `true` or `false` |

## Date Boundaries

| Variable | Result |
|---|---|
| `{{date.startOfWeek}}` | Start of current week |
| `{{date.endOfWeek}}` | End of current week |
| `{{date.startOfMonth}}` | Start of current month |
| `{{date.endOfMonth}}` | End of current month |
| `{{date.startOfYear}}` | Start of current year |
| `{{date.endOfYear}}` | End of current year |

## Chaining

Combine operations:

```
{{date.add(7, 'days').format('MMMM do, yyyy')}}
{{date.nextMonday.format('yyyy-MM-dd')}}
{{date.startOfMonth.format('dddd')}}
```

## Conditionals

```
{{#if condition}}
  Content shown when true
{{/if}}

{{#if condition}}
  True branch
{{else}}
  False branch
{{/if}}

{{#if condition1}}
  First
{{else if condition2}}
  Second
{{else}}
  Default
{{/if}}
```

### Comparison Operators

| Operator | Meaning |
|---|---|
| `==` | Equals |
| `!=` | Not equals |
| `>` | Greater than |
| `>=` | Greater or equal |
| `<` | Less than |
| `<=` | Less or equal |

### Logical Operators

| Operator | Meaning |
|---|---|
| `&&` | AND |
| `\|\|` | OR |

## Loops

```
{{#each items}}
  {{this}}
{{/each}}

{{#each tasks}}
  {{@index}}. {{this.title}}
{{/each}}
```

### Loop Variables

| Variable | Description |
|---|---|
| `{{@index}}` | Current index (0-based) |
| `{{@first}}` | `true` on first iteration |
| `{{@last}}` | `true` on last iteration |
| `{{@length}}` | Total item count |
| `{{@key}}` | Current key (for objects) |

Arithmetic in loops: `{{@index + 1}}` produces 1-based numbering.

## Filters

Transform values with the pipe (`|`) operator. Chain multiple filters: `{{name | trim | upper | truncate(20)}}`.

### String Filters

| Filter | Output |
|---|---|
| `{{text \| upper}}` | `UPPERCASE` |
| `{{text \| lower}}` | `lowercase` |
| `{{text \| capitalize}}` | `Capitalize first letter` |
| `{{text \| title}}` | `Title Case` |
| `{{text \| slug}}` | `url-friendly-slug` |
| `{{text \| truncate(50)}}` | Truncate to 50 chars |
| `{{text \| trim}}` | Remove whitespace |
| `{{text \| replace('old', 'new')}}` | Replace text |

### Array Filters

| Filter | Output |
|---|---|
| `{{items \| join(', ')}}` | Join with comma |
| `{{items \| first}}` | First item |
| `{{items \| last}}` | Last item |
| `{{items \| length}}` | Number of items |
| `{{items \| sort}}` | Sort alphabetically |
| `{{items \| unique}}` | Remove duplicates |

### Number Filters

| Filter | Output |
|---|---|
| `{{price \| round}}` | Round to integer |
| `{{price \| floor}}` | Round down |
| `{{price \| ceil}}` | Round up |
| `{{price \| format}}` | Format with commas (`1,000`) |
| `{{value \| abs}}` | Absolute value |

### Utility Filters

| Filter | Output |
|---|---|
| `{{value \| default('N/A')}}` | Default if empty |
| `{{obj \| json}}` | JSON string |
| `{{value \| typeOf}}` | Get type |
| `{{value \| isEmpty}}` | Check if empty |
| `{{date \| dateFormat('yyyy-MM-dd')}}` | Format date |
| `{{date \| timeAgo}}` | `"3 days ago"` |
| `{{date \| fromNow}}` | `"in 5 days"` |

## Template Includes

Reuse templates inside other templates:

```
{{include:header}}
{{include:footer}}
{{include:greeting:name=John,time=morning}}
```

The included template receives the passed variables.

## JavaScript Execution

Run inline JavaScript for complex logic:

```
{{js: return 2 + 2}}
{{js: return new Date().getFullYear()}}
{{js: return Math.random() > 0.5 ? 'Yes' : 'No'}}
```

Available APIs: `Math`, `Date`, `JSON`, `String`, `Number`, `Array`, `Object`, plus helpers `uuid()`, `format()`, `slugify()`.

## Escaping

Show literal template syntax without processing:

```
\{{date}}
```

Variables inside fenced code blocks are also not processed.
