---
title: Split Editor
description: View and edit multiple notes side-by-side with resizable panes.
---

Split your editor into multiple panes to view and edit notes side-by-side. Each pane operates independently with its own tabs, scroll position, and content.

## Create a split

Use the **split button** in the toolbar to split the current pane. You can also drag a tab toward the edge of the editor area to create a split:

| Drop position | Result                          |
|---------------|---------------------------------|
| Left edge     | New pane to the left            |
| Right edge    | New pane to the right           |
| Top edge      | New pane above                  |
| Bottom edge   | New pane below                  |
| Center        | Move tab into existing pane     |

## Resize panes

Drag the thin divider between panes to adjust their sizes. The divider highlights on hover and turns to the accent color while dragging. Panes have a minimum size of 10%.

Double-click a resizer to equalize all pane sizes in that split.

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

Empty panes auto-close when their last tab is removed or moved to another pane. Focus shifts to the first remaining pane. The last pane cannot be closed -- there is always at least one editor visible.

## Layout

Panes use Flexbox for layout. Vertical splits arrange panes side-by-side in a row; horizontal splits stack them in a column. The layout adapts automatically:

- **Vertical split**: Two panes side-by-side (equal width)
- **Horizontal split**: Two panes stacked (equal height)
- **Mixed**: Combine both directions for 3+ pane layouts

## Drag-and-drop details

Split editor uses `@dnd-kit/core` for drag interactions. A 10px distance threshold prevents accidental drags.

## Accessibility

- Active pane has a visible focus outline
