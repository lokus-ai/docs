---
title: Changelog
description: Release notes for every version of Lokus.
---

All notable changes to Lokus, ordered by release date. Lokus follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.1 -- 2026-01-26

### iOS and mobile support

- **iOS app** -- Full native iOS build with optimized touch experience.
- **Bottom navigation** -- Thumb-friendly nav bar for mobile devices.
- **Safe area handling** -- Proper support for the iPhone notch and Dynamic Island.
- **Haptic feedback** -- Native touch feedback throughout the app.
- **Responsive UI** -- Adaptive font sizes, tab widths, and touch-optimized controls.
- **Mobile layout** -- Terminal panel and git menu hidden on mobile.
- **Touch media queries** -- Larger touch targets and improved interactions.

### Calendar integration

- **Google Calendar** -- Connect and sync with Google Calendar directly.
- **iCal / CalDAV** -- Sync with Apple Calendar, Outlook, Fastmail, and other CalDAV providers.
- **Intelligent sync** -- Smart calendar syncing with conflict resolution and deduplication.

### Authentication

- **Supabase auth** -- New authentication system with secure email/password login.
- **Login screen** -- Clean, modern login flow.

### Editor and writing

- **Syntax highlighting** -- Code blocks now have language-aware highlighting.
- **Instant content rendering** -- Inserted content renders immediately without reopening the file.
- **Code block indentation** -- Preserved correctly when copying and pasting.
- **Image embed autocomplete** -- Smart image path suggestions with reference tracking.

### File management

- **Multi-select** -- Select multiple files with Shift/Cmd+click for bulk operations.
- **Kanban context menu** -- Right-click actions for kanban board cards.
- **Drag and drop to root** -- Drop files directly to the workspace root folder.
- **Create in open folder** -- New files are created inside the currently selected folder.

### Plugin system

- **Plugin SDK** -- Complete API implementation for plugin developers.
- **Plugin system overhaul** -- Improved CLI, SDK, and runtime architecture.
- **Stability** -- Resolved 363 failing tests across plugin APIs and templates.

### Canvas

- **Canvas links** -- Reference `.canvas` files from Markdown with live preview support.

### UI improvements

- **Tooltips** -- Added to all icon-only buttons for accessibility.
- **Loading indicators** -- Visual feedback for server status and template actions.
- **Server-pushed toasts** -- Enhanced notifications powered by Sonner.
- **Lokus Dark theme** -- New built-in dark theme option.
- **WikiLink dialog** -- Responsive autocomplete that works on all screen sizes.
- **Link navigation** -- Fixed wikilink and internal link navigation issues.
- **Better errors** -- Meaningful feedback in Kanban, Search, and throughout the app.

### Infrastructure

- **Auto-update signing** -- Fixed code signing for automatic updates.
- **Centralized versioning** -- Single source of truth for app version.
- **Mac App Store compatibility** -- Proper handling for MAS distribution.
- **Node.js 22** -- Upgraded runtime for better performance.
- **Remote configuration** -- Server-side feature flags and announcements system.
- **Production audit** -- Pre-deployment security and stability fixes.
- **E2E tests** -- Re-enabled end-to-end testing.

### Analytics and privacy

- **PostHog analytics** -- Replaced Umami with focused, privacy-respecting analytics.
- **Opt-out toggle** -- Analytics opt-out in Preferences.
- **Session recording disabled** -- Your notes and writing stay completely private.
- **Kill switches** -- Remote feature control for Canvas, Plugins, Sync, and AI Assistant.

### Licensing

- **FCL 1.0** -- Updated from BSL 1.1 to the Fair Core License for clearer terms.

---

## 2.1.0 -- 2024-09-18

### Keyboard shortcuts

All shortcuts work on both Mac and Windows (Cmd on Mac = Ctrl on Windows).

**Tab management:**

| Shortcut | Action |
|----------|--------|
| `Cmd+Alt+Right` | Next tab |
| `Cmd+Alt+Left` | Previous tab |
| `Cmd+Shift+T` | Reopen recently closed tab |
| `Cmd+W` | Close current tab |
| `Cmd+Shift+W` | Close all tabs |

**File operations:**

| Shortcut | Action |
|----------|--------|
| `Cmd+S` | Save file |
| `Cmd+N` | New file |
| `Cmd+Shift+N` | New folder |
| `F5` | Refresh file tree |

**Navigation:**

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Command palette |
| `Cmd+B` | Toggle sidebar |
| `Cmd+F` | Find in note |
| `Cmd+Shift+F` | Global search |
| `Cmd+L` | Insert WikiLink |
| `Cmd+,` | Open preferences |

**Views and tools:**

| Shortcut | Action |
|----------|--------|
| `Cmd+Shift+G` | Graph view |
| `Cmd+Shift+K` | Kanban board |
| `Cmd+Shift+C` | New canvas |
| `Cmd+/` | Keyboard shortcuts help |

**Graph view (when active):**

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Search nodes |
| `Cmd+R` | Reset view |
| `Cmd+1` / `Cmd+2` / `Cmd+3` | 2D / 3D / Force layout |
| `Space` | Toggle layout |
| `Escape` | Close graph |

### Context menus

- **Right-click** shows a context menu with inspect, copy, clear console, reload, and context-specific options.
- **Shift+Right-click** shows the browser's native context menu.
- **Inspect Element** highlights the element and logs it to the console as `$0`.

### Tab features

- **Reopen closed tabs** -- Remembers up to 10 recently closed tabs. Excludes Graph, Kanban, and Plugins tabs.
- **Throttled switching** -- Tab navigation is throttled to prevent UI issues during rapid switching.

### Breaking changes

- Tab navigation changed from `Cmd+Tab` to `Cmd+Alt+Right/Left` to avoid the macOS system shortcut conflict.
- Right-click now shows a custom context menu. Use `Shift+Right-click` for the browser default.

### Bug fixes

- Fixed `Cmd+Shift+G` opening the wrong view.
- Resolved Mac keyboard shortcut conflicts.
- Fixed shortcut help modal theming.

---

## 1.0.3 -- 2024-09-15

### Template system

- **Template engine** -- Create, manage, and use text templates with variable substitution.
- **Template variables** -- Built-in `{{date}}`, `{{time}}`, `{{datetime}}`, and `{{cursor}}` variables.
- **Category organization** -- Group templates by category.
- **Selection-based creation** -- Select text, open command palette, and save as template.

### Markdown compiler

- **Middleware architecture** -- Centralized Markdown processing that bypasses TipTap limitations.
- **Consistent rendering** -- Unified compilation across all features.
- **Template integration** -- Native Markdown compilation for template preview.

### Command palette

- **Template integration** -- Access and apply templates from the command palette.
- **Command history** -- Track and revisit recent commands across sessions.

### Bug fixes

- Fixed Markdown paste detection.
- Improved template variable parsing reliability.
- Better keyboard navigation in the command palette.
- Improved text selection preservation during template operations.

---

## 1.0.0 -- 2024-09-14

The first release of Lokus.

### Editor

- **TipTap-based rich text editor** with Markdown support.
- **Math equations** -- KaTeX rendering for inline `$x^2$` and block `$$E=mc^2$$` math.
- **Wiki links** -- `[[page]]` syntax with autocomplete.
- **Task lists** -- Interactive checkboxes.
- **Tables** -- Resizable columns with full editing.
- **Code blocks** -- Syntax highlighting for 100+ languages.
- **Images** -- Local and web URLs with drag-and-drop.
- **Advanced formatting** -- Strikethrough, highlights, superscript, subscript.
- **Smart paste** -- Auto-converts Markdown to rich text on paste.

### Theming

- Light and dark modes with a custom theme architecture.
- Real-time preference changes.

### Plugins

- Plugin architecture with install, enable, disable, and manage.
- Security framework with granular permissions and sandboxed execution.
- Hot module replacement for plugin development.

### File management

- Native file system access with workspace management.
- Multiple tabs, auto-save, and full-text search.

### Kanban

- Visual task management with drag-and-drop columns and cards.

### Keyboard shortcuts

- Command palette (`Cmd+K`), sidebar toggle (`Cmd+B`), global search (`Cmd+Shift+F`), and more.

### Cross-platform

- macOS, Windows, and Linux support.
- Tauri v2 (Rust backend) with React 19 frontend.
- Vite build system with Tailwind CSS.

### Testing

- Unit tests with Vitest, E2E tests with Playwright, CI/CD with GitHub Actions.
