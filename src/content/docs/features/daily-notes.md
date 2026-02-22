---
title: Daily Notes
description: Create and navigate date-based journal entries with automatic note creation and templates.
---

Daily notes give you a dedicated page for each day. Open today's note, and Lokus creates it automatically if it doesn't exist. Notes live as plain Markdown files inside a `Daily Notes/` folder in your workspace.

## Open today's note

Click the **Daily Notes** icon in the sidebar, then click **Open Today's Note**. If the file `Daily Notes/2026-02-22.md` doesn't exist, Lokus creates it with a default heading:

```markdown
# 2026-02-22 - Sunday
```

You can also use the quick-access buttons for **Yesterday** and **Tomorrow**.

## Navigate between days

When viewing a daily note, arrow buttons appear in the Daily Notes panel:

- Click **<** to go to the previous day
- Click **>** to go to the next day

The panel labels each note contextually: "Today", "Yesterday", "Tomorrow", or a formatted date like "Feb 20, 2026".

## Calendar view

Toggle **Calendar View** in the Daily Notes panel to see a month-at-a-glance calendar. Click any date to open (or create) that day's note. Dates with existing notes are highlighted.

## Recent notes list

The bottom of the Daily Notes panel shows the 10 most recent daily notes, sorted newest first. Click any entry to jump to it.

## File naming and folder

Daily notes are stored as:

```
<workspace>/Daily Notes/yyyy-MM-dd.md
```

The default format is `yyyy-MM-dd` (e.g., `2026-02-22`). The folder is created automatically when you open your first daily note.

## Configure daily notes

Lokus stores daily notes configuration in your global config. Available settings:

| Setting         | Default        | Description                             |
|-----------------|----------------|-----------------------------------------|
| `format`        | `yyyy-MM-dd`   | Date format for file names              |
| `folder`        | `Daily Notes`  | Folder name within your workspace       |
| `template`      | `null`         | Template content for new daily notes    |
| `openOnStartup` | `false`        | Auto-open today's note when Lokus starts|

## Templates for daily notes

Set a template string in your daily notes configuration to control what new daily notes contain. Templates support these variables:

| Variable              | Output                        |
|-----------------------|-------------------------------|
| `{{date}}`            | Formatted date (e.g., `2026-02-22`) |
| `{{date:MMMM do, yyyy}}` | Custom format (e.g., `February 22nd, 2026`) |
| `{{yesterday}}`       | Previous day's formatted date |
| `{{tomorrow}}`        | Next day's formatted date     |
| `{{day_name}}` / `{{day}}` | Full day name (e.g., `Sunday`) |
| `{{day_short}}`       | Short day name (e.g., `Sun`)  |
| `{{month_name}}` / `{{month}}` | Full month name (e.g., `February`) |
| `{{month_short}}`     | Short month name (e.g., `Feb`) |
| `{{week_number}}` / `{{week}}` | ISO week number       |
| `{{year}}`            | Four-digit year               |
| `{{time}}`            | Current time as `HH:mm`       |
| `{{time:HH:mm:ss}}`  | Custom time format            |

### Example template

```markdown
# {{date:MMMM do, yyyy}} - {{day_name}}

**Week:** {{week_number}} | **Year:** {{year}}

## Today's Focus


## Schedule
- 9:00 AM -
- 10:00 AM -
- 2:00 PM -

## Notes


## Tomorrow
[[{{tomorrow}}]]
```

This creates a structured daily note with the date, week number, schedule, and a wiki link to tomorrow's note.

## Link between daily notes

Use wiki links to connect daily notes:

```markdown
See yesterday's notes: [[2026-02-21]]
Continued in: [[2026-02-23]]
```

These links appear in the graph view, connecting your daily entries into a timeline.
