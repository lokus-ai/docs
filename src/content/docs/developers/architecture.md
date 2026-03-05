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
│  React 19 + PM       │  Tauri 2.0 + Tokio       │
│  Zustand v5          │  File I/O, Search, Sync   │
│  Tailwind CSS        │  Plugins, Auth, MCP       │
│  Vite 7 (bundler)    │  Audio, Transcription     │
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
│   ├── main.jsx                # Entry point (Sentry, PostHog, RemoteConfig, Theme)
│   ├── assets/                 # Static assets (images, icons)
│   ├── bases/                  # Bases feature (structured data views)
│   ├── components/             # Reusable UI components
│   │   ├── CommandPalette.jsx  # Cmd+K command launcher
│   │   ├── FileTree/           # Sidebar file explorer
│   │   ├── Calendar/           # Calendar integration UI
│   │   └── ui/                 # Shared primitives (toast, dialog)
│   ├── config/                 # App configuration constants
│   ├── contexts/               # React context providers
│   │   ├── RemoteConfigContext.jsx  # Feature flags & remote config
│   │   ├── CalendarContext.jsx      # Calendar data
│   │   ├── ScheduleContext.jsx      # Schedule blocks
│   │   └── MeetingContext.jsx       # Meeting detection
│   ├── views/                  # Top-level screens
│   │   ├── LoginScreen.jsx     # Authentication (first screen)
│   │   ├── Launcher.jsx        # Workspace picker
│   │   ├── Workspace.jsx       # Main editor workspace
│   │   ├── Preferences.jsx     # Settings window
│   │   ├── Canvas.jsx          # Excalidraw infinite canvas
│   │   └── ProfessionalGraphView.jsx  # 2D/3D knowledge graph
│   ├── editor/                 # ProseMirror editor setup
│   │   ├── index.jsx           # Editor initialization
│   │   ├── extensions/         # Custom ProseMirror extensions
│   │   ├── commands/           # ProseMirror command helpers
│   │   ├── components/         # Editor-specific UI (toolbar, menus)
│   │   └── lib/                # Editor utilities
│   ├── core/                   # Core application logic
│   │   ├── auth/               # Authentication context and flows
│   │   ├── canvas/             # Canvas state management
│   │   ├── clipboard/          # Clipboard operations
│   │   ├── config/             # User preferences store
│   │   ├── editor/             # Editor config cache, live settings
│   │   ├── graph/              # Graph data processing
│   │   ├── markdown/           # Markdown syntax configuration
│   │   ├── mcp/                # MCP client (stdio-based)
│   │   ├── plugins/            # Plugin state adapter
│   │   ├── search/             # Frontend search helpers
│   │   ├── shortcuts/          # Keyboard shortcut registry
│   │   ├── sync/               # Sync integration helpers
│   │   ├── templates/          # Template system
│   │   ├── theme/              # Theme management
│   │   ├── wiki/               # Wiki-link resolution
│   │   └── workspace/          # Workspace manager
│   ├── features/               # Feature modules
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Shared library utilities
│   ├── mcp-server/             # Frontend MCP server implementation
│   ├── platform/               # Platform-specific abstractions
│   ├── plugins/                # Plugin system (loader, API, sandbox)
│   ├── services/               # Platform service layer
│   ├── stores/                 # Zustand state stores
│   │   ├── editorGroups.js     # Tab groups, splits, LRU content cache
│   │   ├── editorRegistry.js   # Editor instance registry
│   │   ├── fileTree.js         # File tree state
│   │   ├── layout.js           # Layout (sidebars, panels)
│   │   └── views.js            # View state management
│   ├── styles/                 # Global CSS
│   ├── tests/                  # Test utilities
│   ├── themes/                 # Built-in theme definitions
│   ├── utils/                  # Utility functions
│   └── workers/                # Web Workers (graph processing, etc.)
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
│   │   ├── audio.rs            # Audio recording and playback
│   │   ├── meeting_detector.rs # Meeting detection service
│   │   ├── transcription.rs    # Audio transcription
│   │   ├── notifications.rs    # Native OS notifications
│   │   ├── schedule_blocks.rs  # Schedule block management
│   │   ├── sync/               # Git + Iroh P2P sync
│   │   ├── connections/        # External service connections
│   │   ├── calendar/           # Google Calendar + iCal + CalDAV
│   │   ├── mcp.rs              # MCP server manager
│   │   ├── mcp_setup.rs        # MCP first-launch setup
│   │   ├── mcp_embedded.rs     # Embedded MCP server
│   │   ├── api_server.rs       # Local REST API for MCP
│   │   ├── credentials.rs      # OS keychain storage
│   │   ├── secure_storage.rs   # Secure data storage
│   │   ├── logging.rs          # Tracing + Sentry integration
│   │   ├── remote_logging.rs   # Remote log collection
│   │   ├── menu.rs             # Native application menu
│   │   ├── file_locking.rs     # File lock management
│   │   ├── oauth_server.rs     # Local OAuth callback server
│   │   └── window_manager.rs   # Multi-window management
│   ├── Cargo.toml              # Rust dependencies
│   └── tauri.conf.json         # Tauri configuration
├── tests/                      # Test suites
│   ├── unit/                   # Vitest unit tests
│   ├── integration/            # Integration tests (plugin lifecycle, events)
│   ├── e2e/                    # Playwright E2E tests
│   ├── mcp-server/             # MCP server tests (auth, CORS, protocol)
│   └── smoke-plugin/           # Smoke test plugin fixture
├── src/test-setup.js           # Test environment setup
├── package.json                # Node.js dependencies and scripts
├── vite.config.js              # Vite bundler configuration
└── tailwind.config.cjs         # Tailwind CSS configuration
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

Lokus uses **Zustand v5** for global state management alongside React's built-in primitives.

#### Zustand Stores

Five Zustand stores manage the core application state:

| Store | File | Purpose |
|-------|------|---------|
| `editorGroups` | `src/stores/editorGroups.js` | Tab groups, split panes, active tabs, LRU content cache (20 tabs max), recently closed tabs, graph data |
| `editorRegistry` | `src/stores/editorRegistry.js` | Per-tab ProseMirror EditorView instance registry |
| `fileTree` | `src/stores/fileTree.js` | File tree state (expanded folders, selected items) |
| `layout` | `src/stores/layout.js` | Sidebar visibility, panel widths, layout preferences |
| `views` | `src/stores/views.js` | Active view state management |

The `editorGroups` store uses the `subscribeWithSelector` middleware and manages the split editor layout as a tree of groups and containers.

#### React Primitives

| Mechanism | Used For |
|-----------|----------|
| `useState` / `useReducer` | Component-local state |
| React Context | Auth state, remote config, calendar, schedule, meeting, plugin state |
| Custom hooks | Reusable logic (`usePlugins`, `useCalendar`, `useTemplates`, `useFeatureFlags`) |
| `lazy()` + `Suspense` | Code-split heavy views (Workspace, Preferences) |

### Provider Chain

The application wraps components in a specific provider chain. The outermost providers are in `main.jsx`, with inner providers in `App.jsx`:

```
RemoteConfigProvider          ← main.jsx (remote config + feature flags)
  → ThemeProvider             ← main.jsx (theme CSS variables)
    → AuthProvider            ← App.jsx (authentication state)
      → AuthGate              ← App.jsx (login wall)
        → PluginProvider      ← App.jsx (plugin system)
          → FeatureGatedProviders  ← App.jsx (conditional providers)
            → CalendarProvider     ← if enable_calendar flag
              → ScheduleProvider   ← always
                → MeetingProvider  ← if enable_meetings flag
                  → Views          ← Preferences | Workspace | Launcher
```

#### AuthGate

`AuthGate` is a component that checks authentication status before rendering children. If the user is not authenticated, it renders `LoginScreen` instead. The Preferences window bypasses the auth gate to allow signing out.

#### FeatureGatedProviders

`FeatureGatedProviders` conditionally wraps children in context providers based on remote feature flags. This avoids loading Calendar and Meeting providers when those features are disabled server-side.

### Feature Flags System

Lokus uses a remote configuration system (`RemoteConfigContext`) that fetches flags from a central server and falls back to defaults when offline.

#### Feature Flags (16 flags)

| Flag | Default | Controls |
|------|---------|----------|
| `enable_ai_assistant` | `true` | AI assistant features |
| `enable_sync` | `true` | Cloud sync |
| `enable_plugins` | `true` | Plugin system |
| `enable_canvas` | `true` | Excalidraw canvas |
| `enable_graph` | `true` | Knowledge graph |
| `enable_kanban` | `true` | Kanban boards |
| `enable_bases` | `true` | Bases (structured data) |
| `enable_daily_notes` | `true` | Daily notes |
| `enable_calendar` | `true` | Calendar provider and UI |
| `enable_meetings` | `true` | Meeting detection and provider |
| `enable_templates` | `true` | Template system |
| `enable_mcp` | `true` | MCP server |
| `enable_terminal` | `true` | Integrated terminal |
| `enable_backlinks` | `true` | Backlinks panel |
| `enable_version_history` | `true` | File version history |
| `enable_import_export` | `true` | Import/export functionality |

#### Additional Remote Config Sections

The remote config also controls:

- **Announcements** -- server-pushed toast notifications with scheduling and expiry
- **External links** -- documentation, releases, GitHub URLs (updatable without app release)
- **Service status** -- maintenance mode, sync/registry status
- **What's New** -- changelog highlights per version
- **Tips** -- tip-of-the-day content
- **Theme overrides** -- server-side accent color and token overrides
- **UI visibility** -- show/hide sidebar items and toolbar buttons remotely
- **UI strings** -- server-controllable text labels and placeholders
- **Layout defaults** -- initial sidebar widths and visibility

### Backend State

The Rust backend uses Tauri's `app.manage()` for shared state:

| State | Type | Purpose |
|-------|------|---------|
| `MCPServerManager` | `Arc<Mutex<...>>` | MCP server lifecycle |
| `SharedAuthState` | `Arc<Mutex<...>>` | OAuth flow state |
| `SharedCalendarAuthState` | `Arc<Mutex<...>>` | Calendar auth state |
| `ApiState` | `Arc<RwLock<...>>` | Current workspace for REST API |
| `IrohProviderWrapper` | `Mutex<...>` | P2P sync provider |
| `ConnectionManager` | Managed state | External service connections |
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

## Observability

Lokus integrates two observability services:

- **Sentry** -- crash reporting, performance monitoring (10% sample rate in production), and session replay (with all text masked and media blocked). Initialized in `main.jsx` when `VITE_ENABLE_CRASH_REPORTS` is enabled.
- **PostHog** -- product analytics, tracking app startup time and feature usage. Initialized alongside Sentry at app startup.

Both are opt-in via environment variables and can be disabled entirely.

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
