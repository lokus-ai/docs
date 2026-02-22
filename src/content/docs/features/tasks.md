---
title: Tasks
description: Task management with checkboxes, extended task states, kanban boards, and keyboard shortcuts.
---

Lokus supports tasks through Markdown checkboxes with extended states and kanban boards for visual workflow management.

## Task checkboxes

Create tasks with standard Markdown checkbox syntax:

```markdown
- [ ] Todo item
- [x] Completed item
```

Type `- [ ] ` in the editor, or use the `/Task List` slash command, or press `Cmd+Shift+9` / `Ctrl+Shift+9`.

## Extended task states

Beyond basic todo/done checkboxes, Lokus supports extended task states. Type the symbol inside brackets to set a state:

### Basic states

| Syntax | State | Description |
|--------|-------|-------------|
| `[ ]` | Todo | Not started |
| `[x]` or `[X]` | Completed | Finished |
| `[/]` | In progress | Currently working on |
| `[!]` | Urgent | Needs immediate attention |
| `[?]` | Question | Needs clarification |
| `[-]` | Cancelled | Will not do |
| `[>]` | Delegated | Assigned to someone else |

### Extended states

| Syntax | State | Description |
|--------|-------|-------------|
| `[*]` | Starred | Important / starred |
| `[~]` | Paused | Temporarily on hold |
| `[<]` | Scheduled | Scheduled for later |
| `["]` | Quote | Reference / quote |
| `[i]` | Info | Informational note |
| `[b]` | Blocked | Blocked by dependency |
| `[+]` | Added | Newly added |
| `[w]` | Waiting | Waiting on external input |
| `[@]` | Mentioned | Mentioned / flagged |
| `[R]` | Review | Needs review |
| `[D]` | Duplicate | Duplicate of another task |
| `[S]` | Started | Started but not in progress |

Each state has its own CSS class for custom styling (e.g., `task-urgent`, `task-in-progress`, `task-blocked`).

## Keyboard shortcuts

| Action | macOS | Windows/Linux | Description |
|--------|-------|---------------|-------------|
| Cycle state | `Cmd+Shift+T` | `Ctrl+Shift+T` | Cycle through todo, in-progress, completed |
| Toggle complete | `Opt+T` | `Alt+T` | Toggle between todo and completed |

### Cycle behavior

`Cmd+Shift+T` / `Ctrl+Shift+T` cycles through the three most common states:

1. **Todo** -- not started
2. **In progress** -- working on it
3. **Completed** -- done

This makes it easy to advance a task's status without reaching for the mouse.

## Kanban boards

Kanban boards provide a visual drag-and-drop interface for managing tasks in columns.

### Creating a board

Use the `/Kanban Board` slash command or create a `.kanban` file from the file tree. Boards are stored as JSON files in a `kanban/` directory in your workspace.

### Board layout

Each board has columns (e.g., "To-Do", "In Progress", "Done"). Cards live inside columns and can be dragged between them.

### Card features

Each card supports:
- **Title** -- Click to edit inline, press `Enter` to save
- **Description** -- Markdown-formatted text, rendered in the card
- **Drag and drop** -- Drag cards between columns to change status

### Keyboard navigation

Navigate kanban boards without a mouse:

| Key | Action |
|-----|--------|
| `H` / `L` | Move between columns (left / right) |
| `J` / `K` | Navigate cards within a column (up / down) |
| `N` | Create new card |
| `Q` | Quick add card |
| `Enter` | Edit selected card |
| `Delete` | Remove card (with confirmation) |
| `Esc` | Cancel current operation |

### Managing columns

- Add new columns from the board settings
- Drag columns to reorder
- Each card has a context menu (`...` button) for edit and delete

## Standalone tasks in notes

### Simple tasks

Type `!task ` in the editor (or use `/Simple Task`) to create a standalone task marker. These are parsed by the backend and can be tracked separately from checkbox tasks.

### Linked tasks

Use `/Linked Task` to create a task linked to a kanban board. A board picker appears where you select (or create) a board. The task is inserted as `@task[Board Name]` syntax in your note and linked to the corresponding kanban card.

## Task creation modal

Press the keyboard shortcut or use the command palette to open the task creation modal. It lets you:

1. Type a task name
2. Select a kanban board from your workspace
3. Choose which column to place the card in (defaults to "To-Do")
4. Create the task with one `Enter` press

Navigate the board and column lists with arrow keys. Press `Esc` to cancel.
