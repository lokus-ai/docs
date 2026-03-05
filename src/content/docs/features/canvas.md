---
title: Canvas
description: Infinite canvas powered by Excalidraw for visual thinking, spatial note arrangement, and freeform drawing.
---

The canvas is an infinite, zoomable drawing surface built on [Excalidraw](https://excalidraw.com). Use it for spatial note arrangement, diagrams, brainstorming, or freeform sketching. Canvas files use the `.excalidraw` extension and are stored alongside your notes.

## Creating a canvas

Create a canvas file from the file tree context menu or the command palette. Canvas files appear in the file tree with a distinct icon. New canvases are initialized with an empty Excalidraw document.

## Drawing tools

The canvas provides the full Excalidraw toolset:

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

The canvas auto-saves 1500ms after any change. Every `onChange` event from Excalidraw is debounced -- if you keep editing, the timer resets and the save fires 1500ms after the last change. Camera movements do not trigger saves.

Saves are queued to prevent race conditions -- only one write happens at a time. If a save is already in progress, the next save waits for it to finish.

### Manual save

Press **Cmd+S** (or **Ctrl+S**) to save immediately. This cancels any pending debounce timer and writes the canvas to disk right away.

### Auto-fit on open

When a canvas file is opened, Lokus automatically scrolls to fit all existing content into the viewport. This ensures you see your entire drawing without needing to manually zoom or pan after opening.

## Linking canvases from notes

Type `![` (single bracket) in the editor to search for and insert a canvas link. The autocomplete shows `.excalidraw` files in your workspace. The link renders as an inline preview of the canvas.

You can also insert a canvas link via the wiki link autocomplete (`[[`) -- canvas files appear in the results alongside Markdown files.

### Canvas link hover preview

Hovering over a canvas link in the editor displays an SVG thumbnail preview of the canvas content. Previews are generated on demand and cached for 5 minutes. The preview renderer supports rectangles, ellipses, diamonds, text, arrows, lines, freehand drawings, images (placeholder), and frames.

## Canvas preview generation

Lokus generates SVG thumbnail previews from `.excalidraw` files. The preview system:

- Parses Excalidraw JSON and renders elements to an SVG (max 400x300px)
- Supports all core element types: rectangle, ellipse, diamond, text, arrow, line, freedraw, image, and frame
- Caches previews with a 5-minute TTL for performance
- Returns previews as base64 data URLs
- Automatically invalidates the cache when a canvas is saved

## Canvas format

Canvas files store Excalidraw JSON data. The format uses `type: "excalidraw"` with `version: 2` and includes all elements, their properties, positions, app state, and embedded files. Lokus handles format migration automatically for older canvas files created in previous versions.

## Legacy `.canvas` format

The older `.canvas` file extension is **deprecated**. All new canvases are created with the `.excalidraw` extension. Existing `.canvas` files will still open but should be considered legacy. If you are importing from another app that uses `.canvas` files, they will be converted to the `.excalidraw` format during import.

## Theme support

The canvas follows your app theme. Lokus detects whether the current theme is dark or light by computing the luminance of the `--bg` CSS variable. If the background color luminance is below 50%, the canvas uses Excalidraw's dark theme; otherwise it uses the light theme. The detection re-runs whenever you switch themes.

## Fullscreen mode

Toggle fullscreen mode to give the canvas the entire window. Click the maximize button in the canvas toolbar or use the keyboard shortcut. Press it again or `Esc` to exit.
