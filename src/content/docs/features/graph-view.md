---
title: Graph View
description: Visualize your knowledge graph with 2D, 3D, and force-directed layouts. Navigate, filter, and explore connections.
---

The graph view shows every note in your workspace as a node and every wiki link as an edge. Open it from the sidebar or via the command palette.

## View modes

Switch between three view modes using the toolbar buttons or keyboard shortcuts:

| Mode | Shortcut (macOS) | Shortcut (Win/Linux) | Description |
|------|-------------------|----------------------|-------------|
| 2D | `Cmd+1` | `Ctrl+1` | Flat force-directed graph using `react-force-graph-2d` |
| 3D | `Cmd+2` | `Ctrl+2` | Three-dimensional graph using `react-force-graph-3d` and Three.js |
| Force | `Cmd+3` | `Ctrl+3` | Alternative force-directed layout |

All modes use D3 force simulation under the hood. The 3D mode adds depth and camera rotation via Three.js.

## Node types

The graph contains several node types, each rendered differently:

- **Document nodes** -- Your Markdown files. Sized by word count or connection count (configurable).
- **Placeholder nodes** -- Wiki link targets that do not yet have a corresponding file. These appear when you link to a note that does not exist.
- **Tag nodes** -- When tag display is enabled, tags appear as separate nodes connected to the notes that use them.

## Interacting with the graph

### Navigation

- **Click a node** to select it. Its details appear in the graph sidebar.
- **Click a document node** to open that note in the editor.
- **Hover a node** to see its label and highlight its connections.
- **Scroll** to zoom in and out.
- **Drag the background** to pan.
- **Drag a node** to reposition it. The simulation adjusts around it.

### Search

Type in the search bar at the top of the graph view to find nodes by name. Results highlight in the graph.

### Reset

Press `Cmd+R` / `Ctrl+R` to reset the graph layout and zoom to fit all nodes.

### Layout simulation

Press `Space` to pause or resume the force simulation. Pausing freezes nodes in place so you can inspect the layout without it shifting.

## Graph sidebar

The sidebar panel on the right shows:

### Selected node details

When you click or hover a node, the sidebar shows:
- Node name and type
- Backlink count
- Word count
- Tags
- A list of connected nodes (click any to navigate to it)

### Filters section

Control which nodes are visible:

- **Show orphans** -- Toggle nodes with no connections
- **Show tags** -- Toggle tag nodes
- **Show attachments** -- Toggle image and attachment nodes

### Display section

Configure how nodes look:

- **Color scheme** -- Color nodes by type, folder, or custom groups
- **Color groups** -- Define custom groupings with colors
- **Node size** -- Scale node size by word count, connection count, or a fixed size

### Forces section

Tune the physics simulation:

- **Repel strength** -- How strongly nodes push each other away
- **Link distance** -- Target distance between connected nodes
- **Link strength** -- How strongly links pull connected nodes together
- **Center strength** -- How strongly nodes are pulled toward the center

Changes apply in real time. The graph view saves your configuration per workspace and restores it on next open.

### Animation tour

Start an animation tour that cycles through nodes one by one, zooming to each in sequence. Adjust the speed (milliseconds per node) in the sidebar. Press the play/pause button to start or stop.

## Focused graph view

The focused graph view is a small graph panel that appears in the sidebar next to the editor. It shows only the current note and its direct connections (up to 10 links).

It updates as you edit -- when you add or remove wiki links, the focused graph reflects the change after a 300ms debounce.

Click any node in the focused graph to open that note.

## Performance

The graph handles large workspaces:
- File tree changes are debounced (150ms) and compared by hash to avoid redundant reloads
- Bulk file reading loads all Markdown files in one Tauri `invoke` call
- Performance mode available for very large graphs (10,000+ nodes)
- Performance stats (node count, link count, FPS, memory) available via the stats panel
