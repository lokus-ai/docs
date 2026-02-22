---
title: Canvas
description: Infinite canvas powered by TLDraw for visual thinking, spatial note arrangement, and freeform drawing.
---

The canvas is an infinite, zoomable drawing surface built on TLDraw. Use it for spatial note arrangement, diagrams, brainstorming, or freeform sketching. Canvas files use the `.canvas` extension and are stored alongside your notes.

## Creating a canvas

Create a canvas file from the file tree context menu or the command palette. Canvas files appear in the file tree with a distinct icon.

## Drawing tools

The canvas provides the full TLDraw toolset:

- **Select** -- Click and drag to select shapes. Multi-select with `Shift+Click`.
- **Draw** -- Freehand drawing with pen pressure support.
- **Arrow** -- Create arrows and connectors between shapes.
- **Text** -- Add text labels anywhere on the canvas.
- **Shapes** -- Rectangle, ellipse, diamond, and other geometric shapes.
- **Sticky notes** -- Quick notes with colored backgrounds.
- **Eraser** -- Remove shapes by drawing over them.

Each shape supports:
- Color, fill style, and dash pattern
- Font and text alignment
- Resize handles and rotation
- Size presets (small, medium, large, extra-large)

## Cards with text

Add text cards to the canvas using the geo (shape) or text tools. Cards support:
- Typing text directly into shapes
- Changing the font style
- Adjusting text alignment
- Resizing the card

## Working with the canvas

### Navigation

- **Scroll** or **pinch** to zoom
- **Drag** the background to pan
- **Double-click** the background to create a text shape
- **Cmd+Z** / **Ctrl+Z** to undo, **Cmd+Shift+Z** / **Ctrl+Shift+Z** to redo

### Auto-save

The canvas auto-saves 300ms after any meaningful change. Changes are debounced and compared against the initial snapshot -- only real edits (new shapes, text changes, property changes, significant position changes) trigger a save. Camera movements and viewport changes do not trigger saves.

Save state is shown in the toolbar:
- **Idle** -- No pending changes
- **Saving** -- Write in progress
- **Saved** -- Last save succeeded
- **Error** -- Save failed (retries automatically)

Saves are queued to prevent race conditions -- only one write happens at a time.

### Save verification

After each save, Lokus reads the file back and compares node/edge counts to verify the data was written correctly. If verification fails after 3 retries, an error is shown.

## Linking canvases from notes

Type `![` (single bracket) in the editor to search for and insert a canvas link. The autocomplete shows `.canvas` files in your workspace. The link renders as an inline preview of the canvas.

You can also insert a canvas link via the wiki link autocomplete (`[[`) -- canvas files appear in the results alongside Markdown files.

## Canvas format

Canvas files store TLDraw snapshot data as JSON. The format includes all shapes, their properties, positions, and the canvas state. Lokus handles format migration automatically for older canvas files created in previous versions.

## Theme support

The canvas follows your app theme. In dark mode, the canvas background and UI elements adapt to dark colors. In light mode, they use light colors. The theme is applied via TLDraw's built-in theme system.

## Fullscreen mode

Toggle fullscreen mode to give the canvas the entire window. Click the maximize button in the canvas toolbar or use the keyboard shortcut. Press it again or `Esc` to exit.
