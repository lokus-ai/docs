---
title: Architecture Overview
description: Tauri 2.0 + React 19 + Vite 7 architecture, directory structure, IPC model, and state management in Lokus.
---

Lokus is a desktop application built on [Tauri 2.0](https://v2.tauri.app/), combining a Rust backend with a React 19 frontend bundled by Vite 7. This page explains how the pieces connect.

## High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                   Lokus App                     │
├──────────────────────┬──────────────────────────┤
│   Frontend (WebView) │     Backend (Rust)        │
│                      │                           │
│  React 19 + TipTap 3 │  Tauri 2.0 + Tokio       │
│  Tailwind CSS        │  File I/O, Search, Sync   │
│  Vite 7 (bundler)    │  Plugins, Auth, MCP       │
│                      │                           │
│  Port 1420 (dev)     │  Native OS APIs           │
├──────────────────────┴──────────────────────────┤
│               Tauri IPC Bridge                   │
│          invoke() ←→ #[tauri::command]           │
└─────────────────────────────────────────────────┘
```

The frontend runs inside a native webview (WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux). All file system access, search, sync, and native operations happen in Rust and are exposed to the frontend through Tauri's IPC commands.

## Directory Structure

```
lokus/
├── src/                        # React frontend
│   ├── App.jsx                 # Root component, routing, providers
│   ├── main.jsx                # Entry point
│   ├── components/             # Reusable UI components
│   │   ├── CommandPalette.jsx  # Cmd+K command launcher
│   │   ├── FileTree/           # Sidebar file explorer
│   │   ├── Calendar/           # Calendar integration UI
│   │   └── ui/                 # Shared primitives (toast, dialog)
│   ├── views/                  # Top-level screens
│   │   ├── Launcher.jsx        # Workspace picker (entry point)
│   │   ├── Workspace.jsx       # Main editor workspace
│   │   ├── Preferences.jsx     # Settings window
│   │   ├── Canvas.jsx          # TLDraw infinite canvas
│   │   ├── Gmail.jsx           # Gmail integration view
│   │   └── ProfessionalGraphView.jsx  # 2D/3D knowledge graph
│   ├── editor/                 # TipTap editor setup
│   │   ├── index.jsx           # Editor initialization
│   │   ├── extensions/         # Custom TipTap extensions
│   │   ├── components/         # Editor-specific UI (toolbar, menus)
│   │   └── lib/                # Editor utilities
│   ├── core/                   # Core application logic
│   │   ├── auth/               # Authentication context and flows
│   │   ├── canvas/             # Canvas state management
│   │   ├── clipboard/          # Clipboard operations
│   │   ├── config/             # User preferences store
│   │   ├── editor/             # Editor config cache, live settings
│   │   ├── graph/              # Graph data processing
│   │   ├── mcp/                # MCP client (stdio-based)
│   │   ├── plugins/            # Plugin state adapter
│   │   ├── search/             # Frontend search helpers
│   │   ├── shortcuts/          # Keyboard shortcut registry
│   │   ├── sync/               # Sync integration helpers
│   │   ├── templates/          # Template system
│   │   ├── theme/              # Theme management
│   │   ├── wiki/               # Wiki-link resolution
│   │   └── workspace/          # Workspace manager
│   ├── hooks/                  # Custom React hooks
│   ├── contexts/               # React context providers
│   ├── services/               # Platform service layer
│   ├── styles/                 # Global CSS
│   └── themes/                 # Built-in theme definitions
├── src-tauri/                  # Rust backend
│   ├── src/
│   │   ├── main.rs             # Binary entry point
│   │   ├── lib.rs              # App initialization, command registration
│   │   ├── handlers/           # File system and version history commands
│   │   │   ├── files.rs        # Read/write/create/delete/move
│   │   │   ├── version_history.rs  # File versioning with gzip
│   │   │   └── platform_files.rs   # OS-specific file operations
│   │   ├── search.rs           # Full-text search with regex
│   │   ├── tasks.rs            # Task management (7 statuses)
│   │   ├── kanban.rs           # Kanban board CRUD
│   │   ├── theme.rs            # Theme broadcast, import/export
│   │   ├── plugins.rs          # Plugin install/enable/permissions
│   │   ├── clipboard.rs        # Clipboard read/write
│   │   ├── auth.rs             # OAuth2 + PKCE authentication
│   │   ├── sync/               # Git + Iroh P2P sync
│   │   ├── connections/        # Gmail integration
│   │   ├── calendar/           # Google Calendar + iCal + CalDAV
│   │   ├── mcp.rs              # MCP server manager
│   │   ├── mcp_setup.rs        # MCP first-launch setup
│   │   ├── api_server.rs       # Local REST API for MCP
│   │   ├── credentials.rs      # OS keychain storage
│   │   ├── logging.rs          # Tracing + Sentry integration
│   │   └── window_manager.rs   # Multi-window management
│   ├── Cargo.toml              # Rust dependencies
│   └── tauri.conf.json         # Tauri configuration
├── tests/                      # Test suites
│   ├── unit/                   # Vitest unit tests
│   ├── e2e/                    # Playwright E2E tests
│   └── setup.js                # Test environment setup
├── package.json                # Node.js dependencies and scripts
├── vite.config.js              # Vite bundler configuration
└── tailwind.config.js          # Tailwind CSS configuration
```

## IPC Model

Communication between the React frontend and Rust backend uses Tauri's `invoke` pattern. The frontend calls a named Rust function and receives its return value as a Promise.

### Frontend Side

```javascript
import { invoke } from '@tauri-apps/api/core'

// Read all files in a workspace
const files = await invoke('read_workspace_files', {
  workspacePath: '/path/to/workspace'
})

// Write file content (atomic write with backup)
await invoke('write_file_content', {
  path: '/path/to/file.md',
  content: '# Hello World'
})
```

The `invoke` function serializes parameters to JSON, sends them over the IPC bridge, and deserializes the Rust return value back to JavaScript.

### Backend Side

```rust
#[tauri::command]
pub async fn read_workspace_files(
    workspace_path: String
) -> Result<Vec<FileEntry>, String> {
    // Rust logic with full OS access
    read_directory_contents(Path::new(&workspace_path)).await
}
```

Every `#[tauri::command]` function is registered in `lib.rs` inside the `invoke_handler` macro. The `AppHandle` parameter gives access to Tauri-managed state, the store plugin, and window management.

### Parameter Naming

Rust uses `snake_case` parameter names. When calling from JavaScript, convert to `camelCase`:

| Rust parameter | JavaScript parameter |
|---------------|---------------------|
| `workspace_path: String` | `workspacePath: 'path'` |
| `file_path: String` | `filePath: 'path'` |
| `open_tabs: Vec<String>` | `openTabs: ['file1', 'file2']` |

### Event System

For backend-to-frontend communication, Tauri uses events:

```rust
// Rust: emit to all windows
app_handle.emit("theme-changed", payload)?;
```

```javascript
// JavaScript: listen for events
import { listen } from '@tauri-apps/api/event'

const unlisten = await listen('theme-changed', (event) => {
  applyTheme(event.payload)
})
```

Theme broadcasts, deep link handling, and sync status updates all use this event model.

## State Management

### Frontend State

Lokus uses React's built-in state primitives -- no external state library.

| Mechanism | Used For |
|-----------|----------|
| `useState` / `useReducer` | Component-local state |
| React Context | Auth state, calendar data, plugin state |
| Custom hooks | Reusable logic (`usePlugins`, `useCalendar`, `useTemplates`) |
| `lazy()` + `Suspense` | Code-split heavy views (Workspace, Preferences) |

The `App.jsx` wraps the entire application in nested providers:

```
AuthProvider → CalendarProvider → PluginProvider → Views
```

### Backend State

The Rust backend uses Tauri's `app.manage()` for shared state:

| State | Type | Purpose |
|-------|------|---------|
| `MCPServerManager` | `Arc<Mutex<...>>` | MCP server lifecycle |
| `SharedAuthState` | `Arc<Mutex<...>>` | OAuth flow state |
| `SharedCalendarAuthState` | `Arc<Mutex<...>>` | Calendar auth state |
| `ApiState` | `Arc<RwLock<...>>` | Current workspace for REST API |
| `IrohProviderWrapper` | `Mutex<...>` | P2P sync provider |
| `ConnectionManager` | Managed state | Gmail connection |
| `OAuthServer` | Managed state | Local OAuth callback server |

Persistent data uses `tauri-plugin-store` (writes to `.settings.dat`) and OS keychain access for credentials.

### Data Storage

| Data | Location | Format |
|------|----------|--------|
| User preferences | `.settings.dat` (Tauri store) | JSON |
| Notes | Workspace directory | Markdown files |
| Version history | `.lokus/backups/` | Gzipped markdown |
| Kanban boards | Workspace directory | `.kanban` JSON files |
| Tasks | `.settings.dat` (Tauri store) | JSON |
| Custom themes | `~/.lokus/themes/` | JSON |
| Plugins | `~/.lokus/plugins/` | ZIP-extracted directories |
| Auth tokens | OS keychain | Encrypted |
| Logs | `~/.lokus/logs/` | Structured text |

## Plugin Architecture

Plugins run in an isolated `isolated-vm` sandbox on the frontend. The Rust backend handles plugin installation, file extraction, permissions, and settings storage.

```
Plugin ZIP → Rust validates manifest → Extracts to ~/.lokus/plugins/
                                     → Frontend loads via PluginProvider
                                     → Runs in isolated-vm sandbox
                                     → Permissions gate API access
```

## Tauri Plugins

Lokus uses these Tauri 2.0 plugins:

| Plugin | Purpose |
|--------|---------|
| `tauri-plugin-fs` | File system access |
| `tauri-plugin-dialog` | Native file/folder dialogs |
| `tauri-plugin-store` | Persistent key-value storage |
| `tauri-plugin-clipboard-manager` | Clipboard operations |
| `tauri-plugin-global-shortcut` | System-wide keyboard shortcuts |
| `tauri-plugin-updater` | Auto-update mechanism |
| `tauri-plugin-deep-link` | `lokus://` URL scheme handling |
| `tauri-plugin-shell` | Open URLs in default browser |
| `tauri-plugin-opener` | Open files with default app |

## Build Pipeline

```
Source → Vite 7 (React + Tailwind) → dist/ (frontend bundle)
                                        ↓
Source → Cargo (Rust)              → Binary with embedded WebView
                                        ↓
                                   Platform installer
                                   (.dmg / .exe / .AppImage)
```

Vite bundles the frontend into `dist/`, which Tauri embeds into the final binary. In development, Vite serves on port 1420 with HMR, and Tauri's webview connects to that URL.

## Multi-Window Architecture

Lokus uses multiple Tauri windows:

| Window | Label | Purpose |
|--------|-------|---------|
| Main/Launcher | `main` | Workspace picker, shown on launch |
| Workspace | `workspace` | Main editor, file tree, panels |
| Preferences | `preferences` | Settings UI (separate window) |

The `window_manager.rs` module creates and manages these windows. Theme changes broadcast across all windows via Tauri events.

## Security Model

- **CSP headers** restrict script sources, connections, and frame embedding
- **Asset protocol scope** limits file access to user directories (`$HOME`, `$DOCUMENT`, etc.)
- **Atomic file writes** prevent data loss during saves (write to `.tmp`, then rename)
- **OS keychain** stores auth tokens and credentials
- **Plugin sandboxing** via `isolated-vm` prevents plugins from accessing the main process
- **macOS sandbox** uses security-scoped bookmarks for persistent workspace access
