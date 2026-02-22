---
title: Tauri Backend API Reference
description: Complete reference for all Tauri IPC commands in Lokus, covering workspace, file system, search, tasks, kanban, themes, plugins, sync, auth, and MCP.
---

Every Tauri command listed here is a Rust function exposed to the React frontend via `invoke()`. The frontend sends JSON-serialized parameters over IPC; the backend returns results or errors.

## Usage Pattern

```typescript
import { invoke } from '@tauri-apps/api/core'

// Basic call
const result = await invoke<string>('command_name', {
  param1: 'value',
  param2: 123
})

// Error handling
try {
  const files = await invoke<FileEntry[]>('read_workspace_files', {
    workspacePath: '/path/to/workspace'
  })
} catch (error) {
  console.error('Command failed:', error) // error is a string
}
```

Rust uses `snake_case` parameters. Convert to `camelCase` when calling from JavaScript:
- `workspace_path` becomes `workspacePath`
- `file_path` becomes `filePath`
- `open_tabs` becomes `openTabs`

---

## Workspace Commands

### save_last_workspace

Save the last opened workspace path for auto-loading on next launch.

```rust
fn save_last_workspace(app: AppHandle, path: String) -> Result<(), String>
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | `String` | Absolute path to workspace directory |

On macOS, creates a security-scoped bookmark for sandbox persistence.

```typescript
await invoke('save_last_workspace', {
  path: '/Users/john/Documents/MyWorkspace'
})
```

### clear_last_workspace

Remove the saved workspace path from settings.

```rust
fn clear_last_workspace(app: AppHandle)
```

```typescript
await invoke('clear_last_workspace')
```

### validate_workspace_path

Check if a path is a valid Lokus workspace or can become one.

```rust
fn validate_workspace_path(app: AppHandle, path: String) -> bool
```

Returns `true` if the path exists, is a directory, is readable, and either contains a `.lokus` folder or has write permissions to create one.

```typescript
const isValid = await invoke<boolean>('validate_workspace_path', {
  path: '/Users/john/NewWorkspace'
})
```

### check_workspace_needs_reauth

Check if a workspace path needs re-authorization (macOS sandbox). Returns `true` when the workspace exists but the security-scoped bookmark is stale (common after app updates).

```rust
fn check_workspace_needs_reauth(app: AppHandle, path: String) -> bool
```

```typescript
const needsReauth = await invoke<boolean>('check_workspace_needs_reauth', {
  path: '/Users/john/MyWorkspace'
})
```

### get_validated_workspace_path

Get the last saved workspace path, but only if it is still valid. Auto-clears invalid paths from settings.

```rust
fn get_validated_workspace_path(app: AppHandle) -> Option<String>
```

```typescript
const path = await invoke<string | null>('get_validated_workspace_path')
if (path) {
  // Load workspace
} else {
  // Show launcher
}
```

### clear_all_workspace_data

Clear all workspace-related data including session states. Used for development reset.

```rust
fn clear_all_workspace_data(app: AppHandle)
```

### is_development_mode

Check if the app is running in debug mode.

```rust
fn is_development_mode() -> bool
```

Returns `true` when compiled with `debug_assertions` (i.e., `npm run tauri dev`).

### force_launcher_mode

Clear all workspace data and return `true`. Forces the launcher screen on next start.

```rust
fn force_launcher_mode(app: AppHandle) -> bool
```

### save_session_state

Save the current workspace session (open tabs, expanded folders, recent files). State is stored per-workspace using a hashed path as the key.

```rust
fn save_session_state(
    app: AppHandle,
    workspace_path: String,
    open_tabs: Vec<String>,
    expanded_folders: Vec<String>,
    recent_files: Vec<String>
)
```

```typescript
await invoke('save_session_state', {
  workspacePath: '/path/to/workspace',
  openTabs: ['/path/file1.md', '/path/file2.md'],
  expandedFolders: ['/path/folder1'],
  recentFiles: ['/path/recent.md']
})
```

### load_session_state

Load saved session state for a workspace.

```rust
fn load_session_state(app: AppHandle, workspace_path: String) -> Option<SessionState>
```

**SessionState:**

```typescript
interface SessionState {
  open_tabs: string[]
  expanded_folders: string[]
  recent_files: string[]
}
```

### get_all_workspaces

Get list of known workspaces. Currently returns only the last workspace.

```rust
fn get_all_workspaces(app: AppHandle) -> Vec<WorkspaceItem>
```

**WorkspaceItem:**

```typescript
interface WorkspaceItem {
  path: string
  name: string
}
```

### Window Management (Desktop Only)

```rust
fn open_workspace_window(app: AppHandle, workspace_path: String)
fn open_preferences_window(app: AppHandle)
fn open_launcher_window(app: AppHandle)
fn sync_window_theme(app: AppHandle, payload: ThemePayload)
```

These create and manage the multi-window layout. `sync_window_theme` broadcasts theme changes across all open windows.

---

## File System Commands

All file operations use absolute paths. Writes are atomic (write to `.tmp` file, then rename).

### read_workspace_files

Recursively read the file tree of a workspace.

```rust
pub async fn read_workspace_files(workspace_path: String) -> Result<Vec<FileEntry>, String>
```

**FileEntry:**

```typescript
interface FileEntry {
  name: string
  path: string
  is_directory: boolean
  size: number
  created?: number
  modified?: number
  children?: FileEntry[]
}
```

Excludes `.lokus`, `node_modules`, `.git`, and `.DS_Store`. Max recursion depth: 10. Skips symlinks. Results are sorted with directories first, then alphabetically.

```typescript
const files = await invoke<FileEntry[]>('read_workspace_files', {
  workspacePath: '/path/to/workspace'
})
```

### read_file_content

Read text content from a file.

```rust
pub async fn read_file_content(path: String) -> Result<String, String>
```

```typescript
const content = await invoke<string>('read_file_content', {
  path: '/path/to/file.md'
})
```

### read_binary_file

Read binary content from a file.

```rust
pub fn read_binary_file(path: String) -> Result<Vec<u8>, String>
```

### write_file_content

Write text content to a file. Uses atomic writes: content is written to a `.tmp` file, then renamed. A `.backup` file is created before overwriting existing files for rollback safety.

```rust
pub fn write_file_content(path: String, content: String) -> Result<(), String>
```

Does NOT create version history automatically. Call `save_file_version_manual` separately if needed.

```typescript
await invoke('write_file_content', {
  path: '/path/to/file.md',
  content: '# New Content\n\nHello world!'
})
```

### save_file_version_manual

Save a file version to the version history.

```rust
pub fn save_file_version_manual(path: String, content: String) -> Result<(), String>
```

Versions are stored in `.lokus/backups/{filename}/{timestamp}.md.gz`.

### create_file_in_workspace

Create a new file in the workspace.

```rust
pub fn create_file_in_workspace(workspace_path: String, name: String) -> Result<String, String>
```

Returns the full path of the created file. The `name` can include subdirectories (e.g., `notes/meeting.md`).

### create_folder_in_workspace

```rust
pub fn create_folder_in_workspace(workspace_path: String, name: String) -> Result<(), String>
```

### rename_file

```rust
pub fn rename_file(path: String, new_name: String) -> Result<String, String>
```

Returns the new full path. Validates that the source exists, the new name is not empty, and the destination does not already exist.

### move_file

```rust
pub fn move_file(source_path: String, destination_dir: String) -> Result<(), String>
```

Preserves the original filename. Fails if the destination already has a file with the same name.

### delete_file

```rust
pub fn delete_file(path: String) -> Result<(), String>
```

Permanent deletion (no trash/recycle bin). Recursive for directories.

### reveal_in_finder

Open the file or folder in the system file manager (Finder, Explorer, or default Linux file manager).

```rust
pub fn reveal_in_finder(path: String) -> Result<(), String>
```

### open_terminal

Open a terminal window at the given directory.

```rust
pub fn open_terminal(path: String) -> Result<(), String>
```

Uses Terminal.app on macOS, cmd on Windows, and the default terminal on Linux.

### Additional File Commands

```rust
pub fn read_image_file(path: String) -> Result<String, String>  // Base64 encoded
pub fn path_exists(path: String) -> Result<bool, String>
pub fn is_directory(path: String) -> Result<bool, String>
pub fn read_directory(path: String) -> Result<Vec<FileEntry>, String>
pub fn write_file(path: String, content: String) -> Result<(), String>
pub fn create_directory(path: String) -> Result<(), String>
pub fn read_all_files(workspace_path: String) -> Result<Vec<FileEntry>, String>
pub fn copy_external_files_to_workspace(files: Vec<String>, workspace_path: String, target_dir: String) -> Result<Vec<String>, String>
pub fn find_workspace_images(workspace_path: String) -> Result<Vec<String>, String>
```

---

## Version History Commands

File versioning with gzip compression and diff support.

### save_version

```rust
pub fn save_version(
    workspace_path: String,
    file_path: String,
    content: String,
    action: Option<String>
) -> Result<FileVersion, String>
```

**FileVersion:**

```typescript
interface FileVersion {
  timestamp: string
  size: number
  lines: number
  action: string    // "auto_save", "manual_save", etc.
  preview: string   // First few lines
}
```

Versions are gzip-compressed and stored in `.lokus/backups/{filename}/`.

### get_file_versions

```rust
pub fn get_file_versions(workspace_path: String, file_path: String) -> Result<Vec<FileVersion>, String>
```

Returns versions sorted newest first.

### get_version_content

```rust
pub fn get_version_content(workspace_path: String, file_path: String, timestamp: String) -> Result<String, String>
```

Decompresses and returns the content of a specific version.

### get_diff

```rust
pub fn get_diff(
    workspace_path: String,
    file_path: String,
    old_timestamp: String,
    new_timestamp: String
) -> Result<Vec<DiffLine>, String>
```

**DiffLine:**

```typescript
interface DiffLine {
  line_number_old?: number
  line_number_new?: number
  content: string
  change_type: 'add' | 'delete' | 'unchanged'
}
```

### restore_version

```rust
pub fn restore_version(workspace_path: String, file_path: String, timestamp: String) -> Result<(), String>
```

Creates a backup of the current content before restoring the selected version.

### cleanup_old_versions

```rust
pub fn cleanup_old_versions(
    workspace_path: String,
    file_path: String,
    max_versions: Option<usize>,    // Default: 50
    retention_days: Option<i64>      // Default: 30
) -> Result<usize, String>
```

Returns the number of versions deleted.

---

## Search Commands

### search_in_files

Search for text across all files in a workspace.

```rust
pub async fn search_in_files(
    query: String,
    workspace_path: Option<String>,
    options: Option<SearchOptions>
) -> Result<Vec<SearchResult>, String>
```

**SearchOptions:**

```typescript
interface SearchOptions {
  caseSensitive?: boolean    // Default: false
  wholeWord?: boolean        // Default: false
  regex?: boolean            // Default: false
  fileTypes?: string[]       // Default: ['md', 'txt']
  maxResults?: number        // Default: 100
  contextLines?: number      // Default: 2
}
```

**SearchResult:**

```typescript
interface SearchResult {
  file: string
  fileName: string
  matches: SearchMatch[]
  matchCount: number
}

interface SearchMatch {
  line: number
  column: number
  text: string
  match: string
  context: ContextLine[]
}

interface ContextLine {
  lineNumber: number
  text: string
  isMatch: boolean
}
```

Skips `target/`, `node_modules/`, `.git/`, `dist/`, `build/`, `.cache/`. Max traversal depth: 10. Regex patterns are compiled once per search.

```typescript
const results = await invoke<SearchResult[]>('search_in_files', {
  query: 'TODO',
  workspacePath: '/path/to/workspace',
  options: { caseSensitive: false, fileTypes: ['md', 'txt', 'js'] }
})
```

### search_in_file

Search within a single file.

```rust
pub fn search_in_file(file_path: String, query: String, options: Option<SearchOptions>) -> Result<Vec<SearchMatch>, String>
```

### build_search_index

Build a search index for faster searching. (Planned feature.)

```rust
pub fn build_search_index(workspace_path: String) -> Result<(), String>
```

### get_file_content_with_lines

Read file content with line numbers.

```rust
pub fn get_file_content_with_lines(file_path: String) -> Result<Vec<String>, String>
```

---

## Task Management Commands

Tasks support 7 statuses: `todo`, `in-progress`, `urgent`, `needs-info`, `completed`, `cancelled`, `delegated`.

**Task:**

```typescript
interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'urgent' | 'needs-info' | 'completed' | 'cancelled' | 'delegated'
  priority: number
  created_at: number
  updated_at: number
  note_path?: string
  note_position?: number
  tags: string[]
  kanban_board?: string
  kanban_column?: string
  kanban_card_id?: string
}
```

### create_task

```rust
pub fn create_task(
    app: AppHandle,
    title: String,
    description: Option<String>,
    note_path: Option<String>,
    note_position: Option<i32>,
    tags: Vec<String>
) -> Result<Task, String>
```

```typescript
const task = await invoke<Task>('create_task', {
  title: 'Review documentation',
  description: 'Check all API examples',
  notePath: '/workspace/project.md',
  tags: ['docs', 'review']
})
```

### get_all_tasks

```rust
pub fn get_all_tasks(app: AppHandle) -> Result<Vec<Task>, String>
```

### get_task

```rust
pub fn get_task(app: AppHandle, task_id: String) -> Result<Task, String>
```

### update_task

```rust
pub fn update_task(app: AppHandle, task: Task) -> Result<(), String>
```

### delete_task

```rust
pub fn delete_task(app: AppHandle, task_id: String) -> Result<(), String>
```

### get_tasks_by_status

```rust
pub fn get_tasks_by_status(app: AppHandle, status: TaskStatus) -> Result<Vec<Task>, String>
```

### get_tasks_by_note

```rust
pub fn get_tasks_by_note(app: AppHandle, note_path: String) -> Result<Vec<Task>, String>
```

### bulk_update_task_status

```rust
pub fn bulk_update_task_status(app: AppHandle, task_ids: Vec<String>, status: TaskStatus) -> Result<(), String>
```

```typescript
await invoke('bulk_update_task_status', {
  taskIds: ['id1', 'id2', 'id3'],
  status: 'completed'
})
```

### extract_tasks_from_content

Extract task checkboxes (`- [ ]` and `- [x]`) from markdown content.

```rust
pub fn extract_tasks_from_content(app: AppHandle, content: String, note_path: String) -> Result<Vec<Task>, String>
```

### link_task_to_kanban

```rust
pub fn link_task_to_kanban(
    app: AppHandle,
    task_id: String,
    board_path: String,
    column_id: String,
    card_id: String
) -> Result<(), String>
```

---

## Kanban Commands

Kanban boards are stored as `.kanban` JSON files in the workspace.

**Core types:**

```typescript
interface KanbanBoard {
  version: string
  name: string
  columns: Record<string, KanbanColumn>
  settings: BoardSettings
  metadata: BoardMetadata
}

interface KanbanColumn {
  name: string
  order: number
  cards: KanbanCard[]
}

interface KanbanCard {
  id: string
  title: string
  description?: string
  tags: string[]
  assignee?: string
  priority: string
  due_date?: string
  linked_notes: string[]
  checklist: { text: string; completed: boolean }[]
  created: string
  modified: string
}

interface BoardInfo {
  name: string
  path: string
  card_count: number
  column_count: number
  modified: string
}
```

### list_kanban_boards

```rust
pub fn list_kanban_boards(workspace_path: String) -> Result<Vec<BoardInfo>, String>
```

### create_kanban_board

```rust
pub fn create_kanban_board(workspace_path: String, name: String, columns: Vec<String>) -> Result<String, String>
```

Returns the board file path.

```typescript
const boardPath = await invoke<string>('create_kanban_board', {
  workspacePath: '/workspace',
  name: 'Project Tasks',
  columns: ['To Do', 'In Progress', 'Review', 'Done']
})
```

### open_kanban_board

```rust
pub fn open_kanban_board(board_path: String) -> Result<KanbanBoard, String>
```

### save_kanban_board

```rust
pub fn save_kanban_board(board_path: String, board: KanbanBoard) -> Result<(), String>
```

### delete_kanban_board

```rust
pub fn delete_kanban_board(board_path: String) -> Result<(), String>
```

### rename_kanban_board

```rust
pub fn rename_kanban_board(board_path: String, new_name: String) -> Result<String, String>
```

Returns the new board file path.

### add_card_to_board

```rust
pub fn add_card_to_board(board_path: String, column_id: String, card: KanbanCard) -> Result<(), String>
```

### move_card_between_columns

```rust
pub fn move_card_between_columns(board_path: String, card_id: String, from_column: String, to_column: String) -> Result<(), String>
```

### update_card_in_board

```rust
pub fn update_card_in_board(board_path: String, column_id: String, card: KanbanCard) -> Result<(), String>
```

### delete_card_from_board

```rust
pub fn delete_card_from_board(board_path: String, column_id: String, card_id: String) -> Result<(), String>
```

### initialize_workspace_kanban

```rust
pub fn initialize_workspace_kanban(workspace_path: String) -> Result<(), String>
```

---

## Theme Commands

### theme_broadcast

Broadcast theme changes to all windows.

```rust
pub fn theme_broadcast(app: AppHandle, payload: ThemePayload)
```

**ThemePayload:**

```typescript
interface ThemePayload {
  tokens?: Record<string, string>  // CSS vars: {"--bg": "15 23 42"}
  mode?: 'light' | 'dark' | 'system'
  accent?: string                  // Preset name or "r g b" value
  scope?: 'global'
}
```

### import_theme_file

```rust
pub fn import_theme_file(theme_file_path: String) -> Result<ThemeManifest, String>
```

**ThemeManifest:**

```typescript
interface ThemeManifest {
  name: string
  tokens: Record<string, string>
  author?: string
  description?: string
  version?: string
}
```

### validate_theme_file

```rust
pub fn validate_theme_file(theme_file_path: String) -> Result<ThemeValidationResult, String>
```

Required tokens: `--bg`, `--text`, `--panel`, `--border`, `--muted`, `--accent`, `--accent-fg`.

Recommended tokens: `--task-todo`, `--task-progress`, `--task-urgent`, `--task-completed`, `--task-cancelled`, `--task-delegated`, `--danger`, `--success`, `--warning`, `--info`, `--editor-placeholder`.

**ThemeValidationResult:**

```typescript
interface ThemeValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  manifest?: ThemeManifest
}
```

### export_theme

```rust
pub fn export_theme(theme: ThemeManifest, export_path: String) -> Result<(), String>
```

### delete_custom_theme

```rust
pub fn delete_custom_theme(theme_name: String) -> Result<(), String>
```

Themes are stored in `~/.lokus/themes/`.

### list_custom_themes

```rust
pub fn list_custom_themes() -> Result<Vec<ThemeManifest>, String>
```

### get_theme_tokens / save_theme_tokens

```rust
pub fn get_theme_tokens() -> Result<HashMap<String, String>, String>
pub fn save_theme_tokens(tokens: HashMap<String, String>) -> Result<(), String>
```

---

## Plugin Commands

Plugins are installed from ZIP files and stored in `~/.lokus/plugins/`.

### list_plugins

```rust
pub fn list_plugins(app: AppHandle) -> Result<Vec<PluginInfo>, String>
```

**PluginInfo:**

```typescript
interface PluginInfo {
  manifest: PluginManifest
  path: string
  enabled: boolean
  installed_at: string
  size: number
}

interface PluginManifest {
  name: string
  version: string
  description: string
  author: string
  main: string
  permissions: string[]
  dependencies?: Record<string, string>
  keywords?: string[]
  repository?: string
  homepage?: string
  license?: string
}
```

### install_plugin

```rust
pub fn install_plugin(app: AppHandle, plugin_path: String) -> Result<InstallResult, String>
```

Validates ZIP structure, manifest, version compatibility, and duplicate detection.

### uninstall_plugin

```rust
pub fn uninstall_plugin(app: AppHandle, plugin_name: String) -> Result<(), String>
```

Removes the plugin directory, settings, and permissions.

### get_plugin_info

```rust
pub fn get_plugin_info(app: AppHandle, plugin_name: String) -> Result<PluginInfo, String>
```

### validate_plugin_manifest

```rust
pub fn validate_plugin_manifest(manifest: PluginManifest) -> Result<ValidationResult, String>
```

### enable_plugin / disable_plugin

```rust
pub fn enable_plugin(app: AppHandle, plugin_name: String) -> Result<(), String>
pub fn disable_plugin(app: AppHandle, plugin_name: String) -> Result<(), String>
```

### get_enabled_plugins

```rust
pub fn get_enabled_plugins(app: AppHandle) -> Result<Vec<String>, String>
```

### set_plugin_permission / get_plugin_permissions

```rust
pub fn set_plugin_permission(app: AppHandle, plugin_name: String, permission: String, granted: bool) -> Result<(), String>
pub fn get_plugin_permissions(app: AppHandle, plugin_name: String) -> Result<Vec<String>, String>
```

Permission IDs follow the format `category:action` (e.g., `filesystem:read`, `filesystem:write`, `network:request`, `clipboard:read`).

### set_plugin_setting / get_plugin_setting

```rust
pub fn set_plugin_setting(app: AppHandle, plugin_name: String, key: String, value: JsonValue) -> Result<(), String>
pub fn get_plugin_setting(app: AppHandle, plugin_name: String, key: String) -> Result<Option<JsonValue>, String>
```

### read_plugin_file / get_plugin_manifest

```rust
pub fn read_plugin_file(app: AppHandle, plugin_name: String, file_path: String) -> Result<String, String>
pub fn get_plugin_manifest(app: AppHandle, plugin_name: String) -> Result<PluginManifest, String>
```

---

## Git Sync Commands (Desktop Only)

### git_init

```rust
pub fn git_init(workspace_path: String) -> Result<(), String>
```

### git_add_remote

```rust
pub fn git_add_remote(workspace_path: String, name: String, url: String) -> Result<(), String>
```

### git_commit

Stages all changes and creates a commit.

```rust
pub fn git_commit(workspace_path: String, message: String) -> Result<(), String>
```

### git_push / git_pull

```rust
pub async fn git_push(workspace_path: String, remote: String, branch: String) -> Result<(), String>
pub async fn git_pull(workspace_path: String, remote: String, branch: String) -> Result<(), String>
```

### git_force_push / git_force_pull

```rust
pub async fn git_force_push(workspace_path: String, remote: String, branch: String) -> Result<(), String>
pub async fn git_force_pull(workspace_path: String, remote: String, branch: String) -> Result<(), String>
```

### git_status

```rust
pub fn git_status(workspace_path: String) -> Result<GitStatus, String>
```

```typescript
interface GitStatus {
  branch: string
  modified: string[]
  added: string[]
  deleted: string[]
  untracked: string[]
  ahead: number
  behind: number
}
```

### git_get_current_branch

```rust
pub fn git_get_current_branch(workspace_path: String) -> Result<String, String>
```

### detect_conflicts

```rust
pub fn detect_conflicts(workspace_path: String) -> Result<Vec<String>, String>
```

Returns list of files with merge conflicts.

---

## Iroh P2P Sync Commands (Desktop Only)

Peer-to-peer sync using the [Iroh](https://iroh.computer/) protocol.

```rust
pub async fn iroh_init_document(workspace_path: String) -> Result<String, String>
pub async fn iroh_join_document(workspace_path: String, ticket: String) -> Result<(), String>
pub async fn iroh_leave_document(workspace_path: String) -> Result<(), String>
pub async fn iroh_get_ticket(workspace_path: String) -> Result<String, String>
pub async fn iroh_sync_status(workspace_path: String) -> Result<SyncStatus, String>
pub async fn iroh_list_peers(workspace_path: String) -> Result<Vec<PeerInfo>, String>
pub async fn iroh_manual_sync(workspace_path: String) -> Result<(), String>
pub async fn iroh_start_auto_sync(workspace_path: String) -> Result<(), String>
pub async fn iroh_stop_auto_sync(workspace_path: String) -> Result<(), String>
pub async fn iroh_notify_file_save(workspace_path: String, file_path: String) -> Result<(), String>
pub async fn iroh_force_sync_all(workspace_path: String) -> Result<(), String>
pub async fn iroh_get_sync_metrics(workspace_path: String) -> Result<SyncMetrics, String>
pub async fn iroh_check_saved_document(workspace_path: String) -> Result<bool, String>
pub async fn iroh_get_version() -> Result<String, String>
pub async fn iroh_migrate_to_v2(workspace_path: String) -> Result<(), String>
pub async fn iroh_configure_sync(workspace_path: String, config: SyncConfig) -> Result<(), String>
pub async fn iroh_get_metrics(workspace_path: String) -> Result<SyncMetrics, String>
```

---

## Credential Storage Commands (Desktop Only)

Credentials are stored in the OS keychain (macOS Keychain, Windows Credential Manager, Linux Secret Service).

```rust
pub fn store_git_credentials(workspace_path: String, username: String, token: String) -> Result<(), String>
pub fn retrieve_git_credentials(workspace_path: String) -> Result<Option<GitCredentials>, String>
pub fn delete_git_credentials(workspace_path: String) -> Result<(), String>
pub fn store_iroh_keys(workspace_path: String, keys: String) -> Result<(), String>
pub fn retrieve_iroh_keys(workspace_path: String) -> Result<Option<String>, String>
pub fn delete_iroh_keys(workspace_path: String) -> Result<(), String>
```

---

## Authentication Commands (Desktop Only)

OAuth2 with PKCE for user authentication.

### initiate_oauth_flow

```rust
pub async fn initiate_oauth_flow(provider: String, state: State<SharedAuthState>) -> Result<String, String>
```

Returns an authorization URL. The flow uses PKCE, starts a localhost callback server, and exchanges the auth code for tokens.

### is_authenticated

```rust
pub async fn is_authenticated(provider: String) -> Result<bool, String>
```

### get_auth_token

```rust
pub async fn get_auth_token(provider: String) -> Result<Option<AuthToken>, String>
```

```typescript
interface AuthToken {
  access_token: string
  refresh_token?: string
  expires_at?: number
  user_id?: string
  token_type: string
}
```

### get_user_profile

```rust
pub async fn get_user_profile(provider: String) -> Result<UserProfile, String>
```

```typescript
interface UserProfile {
  id: string
  email: string
  name: string
  avatar_url?: string
}
```

### refresh_auth_token

```rust
pub async fn refresh_auth_token(provider: String) -> Result<AuthToken, String>
```

### logout

```rust
pub async fn logout(provider: String) -> Result<(), String>
```

### open_auth_url

```rust
pub async fn open_auth_url(url: String) -> Result<(), String>
```

---

## Clipboard Commands

### Basic Clipboard

```rust
pub fn clipboard_write_text(text: String) -> Result<(), String>
pub fn clipboard_read_text() -> Result<String, String>
pub fn clipboard_write_html(html: String) -> Result<(), String>
pub fn clipboard_read_html() -> Result<String, String>
pub fn clipboard_has_text() -> Result<bool, String>
pub fn clipboard_clear() -> Result<(), String>
```

### Enhanced Platform Clipboard

```rust
pub fn clipboard_write_text_enhanced(text: String) -> Result<(), String>
pub fn clipboard_read_text_enhanced() -> Result<String, String>
pub fn clipboard_write_html_enhanced(html: String) -> Result<(), String>
pub fn clipboard_get_content_info() -> Result<ClipboardContentInfo, String>
pub fn clipboard_get_platform_info() -> Result<PlatformClipboardInfo, String>
pub fn clipboard_get_usage_tips() -> Result<Vec<String>, String>
pub fn clipboard_clear_enhanced() -> Result<(), String>
```

---

## MCP Commands (Desktop Only)

Model Context Protocol server for AI assistant integration.

### mcp_start

```rust
pub fn mcp_start(manager: State<MCPServerManager>, port: Option<u16>) -> Result<MCPServerStatus, String>
```

Default port: 3456.

```typescript
interface MCPServerStatus {
  is_running: boolean
  port: number
  pid?: number
  url?: string
  last_error?: string
}
```

### mcp_stop / mcp_restart

```rust
pub fn mcp_stop(manager: State<MCPServerManager>) -> Result<MCPServerStatus, String>
pub fn mcp_restart(manager: State<MCPServerManager>, port: Option<u16>) -> Result<MCPServerStatus, String>
```

### mcp_status

```rust
pub fn mcp_status(manager: State<MCPServerManager>) -> Result<MCPServerStatus, String>
```

### mcp_health_check

```rust
pub async fn mcp_health_check(manager: State<MCPServerManager>) -> Result<bool, String>
```

### MCP Setup

```rust
pub async fn setup_mcp_integration() -> Result<(), String>
pub async fn check_mcp_status() -> Result<MCPSetupStatus, String>
pub async fn restart_mcp_server() -> Result<(), String>
```

### API Server (for MCP)

```rust
pub fn api_set_workspace(workspace_path: String) -> Result<(), String>
pub fn api_clear_workspace() -> Result<(), String>
pub fn api_get_current_workspace() -> Result<Option<String>, String>
```

---

## Platform Commands

### System Information

```rust
pub fn get_system_information() -> PlatformInfo
pub fn check_platform_feature_support(feature: String) -> bool
pub fn get_platform_capabilities() -> PlatformCapabilities
pub fn platform_reveal_in_file_manager(path: String) -> Result<(), String>
pub fn platform_open_terminal(path: String) -> Result<(), String>
pub fn get_platform_information() -> PlatformInfo
```

---

## Error Handling

All commands return `Result<T, String>`. Errors are plain strings describing what went wrong:

```
"File or folder '/path' does not exist"
"Failed to read file: permission denied"
"Task with id abc123 not found"
"Parent directory does not exist: /invalid/path"
```

Wrap every `invoke()` call in try/catch to handle errors gracefully.

---

## Security

- **Path validation** prevents directory traversal attacks
- **Workspace boundaries** restrict file operations to workspace directories
- **Plugin permissions** gate access to filesystem, network, and clipboard
- **OS keychain** stores tokens and credentials (macOS Keychain, Windows Credential Manager, Linux Secret Service)
- **Atomic writes** prevent data corruption during saves
