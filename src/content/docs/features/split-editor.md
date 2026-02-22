---
title: Split Editor
description: View and edit multiple notes side-by-side with resizable panes.
---

Split your editor into multiple panes to view and edit notes side-by-side. Each pane operates independently with its own tab, scroll position, and content.

## Create a split

Drag a tab toward the edge of the editor area. Drop zones appear as you drag:

| Drop position | Result                          |
|---------------|---------------------------------|
| Left edge     | New pane to the left            |
| Right edge    | New pane to the right           |
| Top edge      | New pane above                  |
| Bottom edge   | New pane below                  |
| Center        | Move tab into existing pane     |

The drop zone highlights with a dashed border to confirm your target.

## Resize panes

Drag the thin divider between panes to adjust their sizes. The divider highlights on hover and turns to the accent color while dragging. Panes have a minimum width of 200px and minimum height of 150px.

## Focus a pane

Click anywhere inside a pane to make it active. The active pane shows a colored border matching your accent color. Only the active pane receives keyboard input and editor commands.

## Navigate between panes

Switch focus between panes without the mouse:

| Action              | Description                     |
|---------------------|---------------------------------|
| Focus next pane     | Cycle forward through panes     |
| Focus previous pane | Cycle backward through panes    |
| Focus pane by number| Jump to pane 1, 2, 3, etc.     |

## Move tabs between panes

Drag a tab from one pane and drop it onto another pane's area. The tab moves to the target pane, and the source pane updates accordingly.

## Close a pane

Click the close button in a pane's header. If you close the active pane, focus shifts to the first remaining pane. The last pane cannot be closed -- there is always at least one editor visible.

## Layout

Panes use CSS Grid for layout. Vertical splits add columns; horizontal splits add rows. The layout adapts automatically:

- **Vertical split**: Two panes side-by-side (`1fr 1fr` columns)
- **Horizontal split**: Two panes stacked (`1fr 1fr` rows)
- **Mixed**: Combine both directions for 3+ pane layouts

## Drag-and-drop details

Split editor uses `@dnd-kit/core` for drag interactions. A 10px distance threshold prevents accidental drags. While dragging, a floating preview shows the tab name with a slight rotation for visual feedback.

## Accessibility

- Active pane has a visible focus outline
- Pane resizers are keyboard-focusable
- Supports `prefers-reduced-motion` (disables animations)
- Supports `prefers-contrast: high` (thicker borders)
- Print styles hide resizers and controls
