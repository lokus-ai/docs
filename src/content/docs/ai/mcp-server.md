---
title: MCP Server
description: Connect AI assistants to your Lokus workspace using the built-in MCP server with 68+ tools.
---

Lokus ships with a built-in [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that lets AI assistants read, write, search, and manage your entire knowledge base. The server auto-starts with Lokus and provides 68 tools across 12 categories -- notes, workspace, databases, canvas, kanban, graph, templates, themes, daily notes, tasks, search, and workspace context.

## What is MCP?

MCP is an open standard that gives AI assistants structured access to external tools and data. Instead of copying and pasting content into your AI chat, MCP lets the assistant directly interact with your workspace.

**Without MCP:** You paste note content into the chat manually. The AI has no context about your workspace structure, links, or other files.

**With MCP:** The AI can search your entire knowledge base, create and edit notes, traverse your knowledge graph, manage kanban boards, and run workspace maintenance -- all through natural language.

## Architecture

```
AI Assistant (Claude, etc.)
        |
        | MCP Protocol (JSON-RPC)
        |
Lokus MCP Server
├── Stdio Transport (desktop clients)
└── HTTP Transport (CLI clients, port 3456)
        |
        | Tool Router (68 tools)
        |
Your Workspace (local Markdown files)
```

The server supports two transports:

- **Stdio** -- for desktop AI clients like Claude Desktop. The AI spawns the server as a child process.
- **HTTP** -- for CLI-based AI clients. Lokus starts an HTTP server on `localhost:3456` that accepts MCP requests at `/mcp`.

Both transports are local-only. No data leaves your machine.

## Setup

### Automatic (default)

On first launch, Lokus:

1. Extracts the MCP server to `~/.lokus/mcp-server/`.
2. Creates a Claude Desktop config at `~/.lokus/mcp-server/claude_desktop_config.json`.
3. Creates a CLI config at `~/.lokus/mcp-server/cline_mcp_settings.json`.
4. Starts the HTTP server on port 3456.
5. Registers all 68 tools.

No manual configuration required. Check the status bar at the bottom of Lokus -- it shows "MCP: Running" with a green indicator when the server is active.

### Verify the server is running

```bash
curl http://localhost:3456/health
```

Expected response:

```json
{"status":"ok","server":"lokus-mcp","version":"1.3.1"}
```

### Configure Claude Desktop (stdio)

Copy the generated config into Claude Desktop's settings, or point it to the file directly:

```json
{
  "mcpServers": {
    "lokus": {
      "command": "node",
      "args": [
        "~/.lokus/mcp-server/index.js"
      ]
    }
  }
}
```

To specify a workspace path:

```json
{
  "mcpServers": {
    "lokus": {
      "command": "node",
      "args": ["~/.lokus/mcp-server/index.js"],
      "env": {
        "LOKUS_WORKSPACE": "/path/to/your/workspace"
      }
    }
  }
}
```

### Configure Claude Code (HTTP)

Add this to your `.mcp.json` file in your project root or home directory:

```json
{
  "mcpServers": {
    "lokus": {
      "url": "http://localhost:3456/mcp"
    }
  }
}
```

### Configure other MCP clients

Any client that supports the MCP specification works. Use stdio transport for desktop apps and HTTP transport for CLI tools. The HTTP endpoint is `http://localhost:3456/mcp` and accepts standard JSON-RPC 2.0 requests.

## Available tools (68)

### Workspace Context (6 tools)

Smart workspace detection and context switching. The server auto-detects your active workspace using this priority chain: current directory > `LOKUS_WORKSPACE` env var > Lokus app API > MCP context > last-used config > default location.

| Tool | Description |
|------|-------------|
| `list_all_workspaces` | List all available Lokus workspaces |
| `set_workspace_context` | Set the active workspace for all subsequent operations |
| `get_current_context` | Check which workspace is currently active |
| `match_workspace_by_name` | Find a workspace from natural language (e.g., "my work notes") |
| `clear_workspace_context` | Reset the active workspace context |
| `detect_workspace_from_text` | Analyze text for workspace references |

### Notes (10 tools)

Create, read, update, delete, and analyze notes.

| Tool | Description |
|------|-------------|
| `list_notes` | List notes with metadata, sorted by name/modified/size |
| `read_note` | Read full content of a note |
| `create_note` | Create a note with optional frontmatter |
| `update_note` | Update existing note content |
| `delete_note` | Delete a note |
| `search_notes` | Search notes by content or title |
| `get_note_links` | Get all outgoing wiki links from a note |
| `get_note_backlinks` | Get all notes that link to a specific note |
| `extract_note_metadata` | Extract frontmatter and metadata |
| `rename_note` | Rename a note and update references |

### Workspace (6 tools)

Workspace-level operations and statistics.

| Tool | Description |
|------|-------------|
| `get_workspace_info` | Comprehensive workspace information |
| `get_workspace_stats` | Statistics: note count, total size, etc. |
| `list_folders` | List all folders up to a specified depth |
| `get_workspace_settings` | Read workspace-specific settings |
| `search_workspace` | Global full-text search across all file types |
| `get_recent_files` | Recently modified files |

### Bases / Databases (8 tools)

Manage structured data in Lokus Bases.

| Tool | Description |
|------|-------------|
| `list_bases` | List all databases in the workspace |
| `get_base` | Get schema and records for a specific base |
| `create_base` | Create a new base with a schema definition |
| `add_base_record` | Add a record to a base |
| `query_base` | Query records with filters |
| `update_base_record` | Update an existing record |
| `delete_base_record` | Delete a record |
| `get_base_stats` | Statistics for a base |

### Canvas (6 tools)

Work with Lokus Canvas (visual whiteboard).

| Tool | Description |
|------|-------------|
| `list_canvases` | List all canvases |
| `get_canvas` | Get canvas data including shapes and connections |
| `create_canvas` | Create a new canvas |
| `add_canvas_shape` | Add a shape (text, rectangle, arrow, etc.) |
| `get_canvas_connections` | Get all arrows/connections between shapes |
| `export_canvas` | Export canvas data |

### Kanban (7 tools)

Manage kanban boards and cards.

| Tool | Description |
|------|-------------|
| `list_boards` | List all kanban boards |
| `get_board` | Get board with columns and cards |
| `create_board` | Create a board with columns (supports date-based columns) |
| `add_card` | Add a card to a column |
| `move_card` | Move a card between columns |
| `update_card` | Update card content or properties |
| `get_board_stats` | Board statistics |

### Graph (6 tools)

Navigate and analyze the knowledge graph built from wiki links.

| Tool | Description |
|------|-------------|
| `get_graph_overview` | Overview of the entire knowledge graph |
| `get_node_connections` | All connections for a specific note |
| `find_path` | Find the shortest path between two notes |
| `get_orphan_notes` | Find notes with no connections |
| `get_hub_notes` | Find the most-connected notes |
| `get_clusters` | Identify clusters of related notes |

### Templates (5 tools)

Create and manage reusable note templates. Templates support variables: `{{date}}`, `{{time}}`, `{{cursor}}`, `{{title}}`, and custom variables.

| Tool | Description |
|------|-------------|
| `list_templates` | List templates, optionally filtered by category |
| `create_template` | Create a template with variables and metadata |
| `read_template` | Read a template's content and metadata |
| `update_template` | Update an existing template |
| `delete_template` | Delete a template |

### Themes (9 tools)

Create, manage, and apply editor themes. Themes use 20+ CSS custom property tokens.

| Tool | Description |
|------|-------------|
| `list_themes` | List built-in and custom themes |
| `get_theme` | Get theme details including all tokens |
| `create_theme` | Create a custom theme |
| `update_theme` | Modify a theme's tokens |
| `delete_theme` | Delete a custom theme |
| `apply_theme` | Apply a theme to the editor |
| `get_current_theme` | Get the currently active theme |
| `export_theme` | Export a theme to JSON |
| `import_theme` | Import a theme from JSON |

### Daily Notes (1 tool)

| Tool | Description |
|------|-------------|
| `daily_note` | Open or create a daily note. Actions: `today`, `yesterday`, `tomorrow`, `date`, `list`. Notes are stored in the `Daily Notes/` folder with `yyyy-MM-dd.md` filenames. |

### Tasks (1 tool)

| Tool | Description |
|------|-------------|
| `manage_tasks` | List, search, update, and get stats for tasks across all notes. Parses checkbox syntax: `- [ ]` todo, `- [x]` done, `- [/]` in progress, `- [!]` urgent, `- [?]` question, `- [-]` cancelled, `- [>]` delegated. |

### Search (2 tools)

Graph-enhanced search that combines full-text matching with knowledge graph traversal.

| Tool | Description |
|------|-------------|
| `smart_search` | Full-text search enhanced with wiki link graph traversal. Returns matching notes plus their connected notes. |
| `explore_topic` | Navigate the knowledge graph from a starting point to discover related content. |

## Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LOKUS_WORKSPACE` | Workspace path | Auto-detected |
| `LOKUS_MCP_PORT` | HTTP server port | `3456` |
| `LOKUS_LOG_LEVEL` | Logging verbosity (`debug`, `info`, `error`) | `info` |
| `LOKUS_CACHE_SIZE` | Cache size in MB | `500` |
| `LOKUS_AUTO_START` | Auto-start the MCP server | `true` |

## Usage examples

### Ask the AI to list your notes

```
"List all notes in my workspace, sorted by last modified."
```

The AI calls `list_notes` with `sortBy: "modified"` and returns the results.

### Create a note from a conversation

```
"Create a note called 'Meeting Notes - Feb 22' with the summary we just discussed."
```

The AI calls `create_note` with the path and content.

### Search and analyze

```
"Find all notes mentioning 'machine learning' and show me how they're connected."
```

The AI calls `smart_search` to find matching notes, then `get_node_connections` to map relationships.

### Manage tasks across your workspace

```
"Show me all urgent tasks across my workspace."
```

The AI calls `manage_tasks` with action `search` and status filter `urgent`.

### Explore your knowledge graph

```
"What are the most connected notes in my workspace? Are there any orphan notes?"
```

The AI calls `get_hub_notes` and `get_orphan_notes` to analyze graph structure.

## HTTP API

Send MCP requests to the HTTP endpoint using JSON-RPC 2.0:

```bash
# List all tools
curl -X POST http://localhost:3456/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'

# Call a tool
curl -X POST http://localhost:3456/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "method":"tools/call",
    "params":{
      "name":"list_notes",
      "arguments":{"sortBy":"modified"}
    },
    "id":2
  }'
```

## Security

- **Local-only connections.** The HTTP server binds to `localhost`. No remote access by default.
- **No authentication required.** The server trusts local processes. If you expose the port externally (not recommended), add authentication middleware.
- **File system permissions.** The server respects OS-level read/write permissions.
- **No external network calls.** The MCP server never phones home or calls external APIs.
- **Audit logging.** All tool calls are logged to `~/.lokus/mcp-server/logs/server.log`.

## Troubleshooting

### Server not starting

1. Check if port 3456 is already in use:
   ```bash
   lsof -i :3456
   ```
2. Verify Node.js 18+ is installed:
   ```bash
   node --version
   ```
3. Check server logs:
   ```bash
   tail -f ~/.lokus/mcp-server/logs/server.log
   ```
4. Delete `~/.lokus/mcp-server/` and restart Lokus to rebuild.

### AI cannot see Lokus tools

1. Confirm the config file exists and points to the correct path:
   ```bash
   cat ~/.lokus/mcp-server/claude_desktop_config.json
   ```
2. Restart your AI client after adding the configuration.
3. Test the HTTP endpoint directly:
   ```bash
   curl http://localhost:3456/health
   ```

### Wrong workspace detected

Set the workspace explicitly:

```bash
export LOKUS_WORKSPACE="/path/to/your/workspace"
```

Or use the `set_workspace_context` tool to switch workspaces within a conversation.

### Slow responses on large workspaces

- Reduce cache size: `export LOKUS_CACHE_SIZE=250`
- Lower log level: `export LOKUS_LOG_LEVEL=error`
- Archive old content into a separate workspace.

## Resources

The MCP server also exposes documentation resources that AI assistants can read, including a Markdown syntax reference covering wiki links, math equations, task checkboxes, and highlights. Access resources via the `resources/list` and `resources/read` MCP methods.
