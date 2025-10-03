# Reddit Posts for Lokus

## Post 1: r/programming or r/coding

**Title:** Built a note-taking app with Rust + React because I was tired of Electron bloat

**Body:**

So I've been working on this local-first note-taking app called Lokus for the past 6 months. Started because I was frustrated with existing tools - Notion is slow, Obsidian needs 10 plugins to be useful, and everything wants a subscription.

Tech stack:
- Frontend: React 19 + TipTap (ProseMirror)
- Backend: Rust + Tauri 2.0
- ~10MB bundle vs typical Electron apps at 100MB+
- Launches in under 1 second
- Full-text search across 10k notes in ~50ms

Features:
- Wiki-style linking with backlinks
- 2D/3D graph visualization (WebGL-accelerated)
- Notion-like database views
- Canvas/whiteboard mode
- Plugin system (VS Code-style)
- MCP server for AI integration
- Everything stored as markdown files locally

The graph rendering was the hardest part - had to move from D3-force to Sigma.js with Web Workers to handle 1000+ nodes at 60fps.

It's open source: [github link]

Would love feedback, especially on the architecture decisions. Happy to answer technical questions.

**Edit:** Wow, thanks for all the responses! Answering the common questions:
- Yes, it works offline (local-first)
- Mobile apps are on the roadmap
- Sync via your own cloud storage (Dropbox/iCloud/Syncthing)
- No telemetry, no analytics, your data stays on your machine

---

## Post 2: r/opensource

**Title:** [Release] Lokus v1.2 - Local-first note-taking app with graph visualization and database views

**Body:**

Hey r/opensource!

Just released v1.2 of Lokus, a local-first markdown note-taking app I've been working on.

**What makes it different:**
- 100% local - notes live on YOUR machine, not some cloud
- Open source (MIT license)
- No subscription, no telemetry, no BS
- Markdown files - no proprietary format
- Cross-platform (Windows/macOS/Linux)

**Tech Stack:**
- React 19 + Tauri 2.0
- Rust backend for performance
- Plugin system for extensibility
- MCP protocol support for AI tools

**Features:**
- Wiki links with backlinks panel
- Graph visualization (2D/3D)
- Database views (like Notion)
- Canvas for visual thinking
- Task management + Kanban
- Full-text search (Rust-powered)
- Gmail integration
- Custom themes

**Size:** ~10MB (Tauri vs Electron)
**License:** MIT
**Repo:** [github link]
**Docs:** [docs link]

Looking for contributors! Especially interested in:
- Plugin development
- Mobile app development (planned)
- Internationalization
- Documentation improvements

Star the repo if this interests you. Issues and PRs welcome!

---

## Post 3: r/ObsidianMD or r/PKMS

**Title:** Made an alternative to Obsidian with built-in database views and 3D graphs

**Body:**

Don't get me wrong, I love Obsidian. Used it for 2 years. But I got tired of:
- Installing 10+ plugins for basic features
- Paying $10/month for sync
- No built-in database views
- Graph view being... okay but not great

So I built Lokus over the past 6 months.

**Similar to Obsidian:**
- Local markdown files
- Wiki links with [[syntax]]
- Graph visualization
- Customizable themes
- Plugin system

**Different from Obsidian:**
- Built-in database views (no Dataview plugin needed)
- 3D graph visualization option
- Canvas mode built-in (infinite whiteboard)
- Kanban boards out of the box
- Gmail integration (import emails as notes)
- Free sync via your own cloud storage
- Faster search (Rust-powered)

**Tech:**
Built with React + Rust (Tauri). Means it's ~10MB instead of Obsidian's ~100MB. Starts faster too.

**Open source:** [github link]

Not trying to replace Obsidian for everyone. But if you've been frustrated with the plugin dependency or want more built-in features, might be worth a look.

Happy to answer questions about the workflow differences!

---

## Post 4: r/SideProject

**Title:** [Launch] Spent 6 months building a note-taking app - 500+ GitHub stars later

**Body:**

Started as a weekend project because I was frustrated with note-taking apps. 6 months later, here we are.

**What is it:**
Lokus - a local-first note-taking app that doesn't suck

**The problem I had:**
- Notion: slow, cloud-only, proprietary format
- Obsidian: needed 10 plugins, sync costs money
- Roam: expensive af
- Apple Notes: too basic
- VS Code: not made for notes

**What I built:**
- Wiki-style linking + backlinks
- Graph viz that's actually useful (2D AND 3D)
- Database views like Notion
- Canvas for visual thinking
- Task manager with Kanban
- Everything stored as markdown locally
- Plugin system for extensibility

**Tech:**
React 19 + Rust (Tauri 2.0)
~10MB bundle, launches in <1 sec

**Business model:**
Free. Open source. No ads. No tracking.
Maybe paid cloud sync later, but local-first always free.

**Stats:**
- 500+ GitHub stars in 3 months
- 50+ issues (mostly feature requests)
- 10 contributors
- Used by developers, researchers, students, writers

**What I learned:**
1. Ship early, iterate fast
2. Building in public works
3. People care about data ownership
4. Performance matters more than I thought
5. Good docs = more users

**Next:**
- Mobile apps
- Real-time collaboration
- Better plugin ecosystem

GitHub: [link]
Docs: [link]

Ask me anything about the journey, tech decisions, or whatever!

---

## Post 5: r/rust

**Title:** Built a desktop app with Tauri 2.0 - impressions after 6 months

**Body:**

Used Tauri to build Lokus, a note-taking app. Thought I'd share my experience since Tauri 2.0 is still relatively new.

**Background:**
Previously built desktop apps with Electron. Hated the bloat. Tried Tauri for this project.

**The Good:**
- Bundle size: 10MB vs 100MB+ with Electron
- Memory usage: ~50MB vs ~200MB
- Startup time: sub-1 second consistently
- Native feel on each platform
- Rust backend = actual performance for heavy operations (search, graph layout)
- Hot reload works great

**The Challenging:**
- Debugging Rust<->JS bridge can be painful
- Smaller ecosystem than Electron
- Some platform-specific quirks (especially Linux)
- IPC serialization needs careful planning
- Documentation is good but not as extensive as Electron

**Performance wins:**
- Full-text search across 10k files: ~50ms (would be 500ms+ in pure JS)
- Graph layout calculations in Web Worker + Rust: 60fps with 1000+ nodes
- File operations are instant (no Node.js overhead)

**Architecture:**
```
React Frontend <-> Tauri IPC <-> Rust Backend
                                   ├─ File System
                                   ├─ Search Engine
                                   ├─ Plugin Manager
                                   └─ MCP Server
```

**Would I use Tauri again?**
Absolutely. The performance gains are worth the learning curve. Especially for apps that do heavy computation.

**Caveats:**
- If your app is simple CRUD, Electron might be easier
- If you need extensive native integrations, Tauri 2.0 shines
- If bundle size matters, Tauri is a no-brainer

Code is open source if you want to see a real-world example: [github link]

Happy to answer questions about the Rust/Tauri experience!

---

## Post 6: r/reactjs

**Title:** Built a 50k LOC React app with some interesting patterns - lessons learned

**Body:**

Been working on Lokus (a note-taking app) for 6 months. React 19 + TipTap + Tauri. Some patterns that worked well:

**1. Context + Hooks over Redux**
```javascript
// Workspace context with all file operations
const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  // Tauri commands wrapped in hooks
  return {
    files,
    createFile: async (name) => invoke('create_file', { name }),
    // ...
  };
};
```

**2. TipTap for rich text**
Way better than building on top of ContentEditable. Custom extensions for wiki links, math, tasks.

**3. Web Workers for heavy computation**
Graph layout calculations + search indexing off the main thread. React renders smoothly even with 1000+ nodes.

**4. Virtual scrolling for large lists**
File tree with 10k+ files. React-window saved my life.

**5. Vite over CRA**
Build times went from 30s to 3s. HMR is instant. No webpack config hell.

**Things I'd do differently:**
- Use TypeScript from day 1 (added it later, painful migration)
- Better component organization (too many files in `/components`)
- More hooks composition early on

**Interesting challenges:**
- TipTap + custom extensions is powerful but complex
- State management for offline-first is tricky
- Performance with large markdown files

Open source if you want to check the code: [github link]

What patterns have worked for you in large React apps?

---

## Post 7: r/productivity

**Title:** Got tired of subscription fatigue, built my own note-taking app

**Body:**

Anyone else feel like every app wants $10/month now?

I was paying for:
- Notion ($10)
- Obsidian Sync ($10)
- Todoist ($5)
- ... you get the idea

Decided to build my own note-taking app that does everything locally.

**What it does:**
- Notes with wiki-style linking (like Obsidian)
- Database views (like Notion)
- Task management with Kanban boards
- Graph visualization to see connections
- Canvas for brainstorming
- Everything stored as markdown files on YOUR computer

**No subscription. No cloud. Your data stays yours.**

You can still sync via Dropbox/iCloud/whatever if you want. But it's not required.

Been using it daily for 4 months now. Finally off the subscription treadmill.

It's called Lokus and it's free + open source: [github link]

Not saying it's perfect or will work for everyone. But if you're also tired of paying monthly for basic features, might be worth a look.

What apps have you replaced with self-hosted/local alternatives?

---

## Post 8: r/datacurator or r/DigitalMinimalism

**Title:** Local-first note-taking: why I'm done with cloud-only apps

**Body:**

Had a wake-up call last month. A note-taking service I used shut down. 6 months notice. Export your data or lose it.

I got my data out (barely - their export was broken). But it made me realize: **I don't actually own my notes.**

So I built Lokus with a different philosophy:

**Local-first principles:**
1. Data lives on YOUR machine
2. Open file formats (markdown)
3. No cloud required
4. You control backups
5. Works offline always

**What this means:**
- Want to backup? Copy folder to external drive. Done.
- Want to sync? Use your own cloud (Dropbox/Syncthing/etc)
- Want to search? Don't need WiFi
- Company shuts down? You still have your data
- Privacy? Not sending anything to servers

**Trade-offs:**
- No real-time collaboration (yet)
- No mobile app (yet)
- You manage your own backups

**For me, it's worth it.**

My digital brain shouldn't depend on a startup's runway.

The app is open source: [github link]

Anyone else gone local-first? What tools are you using?

---

## Post 9: r/selfhosted

**Title:** Self-hosted note-taking with MCP server for AI integration

**Body:**

Built a local-first note-taking app with a built-in MCP (Model Context Protocol) server.

**What's MCP?**
Standard protocol for AI assistants to interact with your apps. Think LSP but for AI tools.

**The setup:**
- Notes stored locally as markdown
- Built-in MCP server exposes your workspace
- AI assistants can read/search/create notes via MCP
- All local - no cloud required

**Example use case:**
```bash
# AI assistant can now:
- Search your notes: "find notes about rust performance"
- Create notes: "create a new note summarizing this article"
- Link notes: "show backlinks to this concept"
- Query metadata: "show all tasks due this week"
```

**Stack:**
- React + Rust (Tauri 2.0)
- MCP server (stdio transport)
- Plugin system for custom tools
- Everything runs locally

**Privacy:**
Your notes never leave your machine unless you explicitly integrate with cloud AI tools.

**Code:** [github link]

Anyone else building with MCP? Curious what other self-hosted tools support it.

---

## Post 10: r/alphaandbetausers

**Title:** [Beta] Looking for beta testers for local-first note-taking app

**Body:**

Hey everyone!

I've been building Lokus, a local-first note-taking app, for the past 6 months. Just hit v1.2 and looking for beta testers before wider release.

**What it is:**
Note-taking app that stores everything locally (markdown files). Think Obsidian + Notion features but free and open source.

**Features:**
- Wiki links + backlinks
- Graph visualization (2D/3D)
- Database views
- Canvas/whiteboard
- Task management
- Plugin system
- Themes

**What I need feedback on:**
1. Installation experience on your OS
2. Performance with large vaults (1000+ notes)
3. UI/UX pain points
4. Feature requests
5. Bugs (there will be bugs)

**What you get:**
- Early access to new features
- Direct line to the dev (me)
- Your name in the credits if you want
- Influence over roadmap

**Requirements:**
- Windows 10+, macOS 10.15+, or Linux
- Willing to report bugs via GitHub issues
- Test for at least 2 weeks

**Not required but helpful:**
- Experience with Obsidian/Notion/Roam
- Comfortable with markdown
- GitHub account for bug reports

Interested? Drop a comment or DM me!

GitHub: [link]
Docs: [link]

---

## Post 11: r/electron_tutorials or r/tauriapps

**Title:** Migrated from Electron to Tauri 2.0 - here's what changed

**Body:**

**Before:** 100MB Electron app, 200MB RAM usage, 5 second startup

**After:** 10MB Tauri app, 50MB RAM usage, <1 second startup

Migrated Lokus from Electron to Tauri 2.0. Here's the experience:

**Migration Process:**
1. React frontend stayed mostly the same
2. Replaced Electron IPC with Tauri commands
3. Rewrote Node.js backend in Rust
4. Adjusted build process

**Challenges:**
- Learning Rust (worth it)
- IPC serialization (more strict than Electron)
- Platform-specific building took time to figure out
- Some Node packages don't have Rust equivalents

**Wins:**
- Performance is night and day
- Binary size reduced 90%
- Memory usage cut in half
- Users actually notice the difference
- Rust forced better architecture

**Time investment:**
~2 months to migrate + learn Rust properly

**Would I do it again?**
100%. Performance alone is worth it.

**Code comparison:**

*Electron:*
```javascript
// main.js
ipcMain.handle('read-file', async (_, path) => {
  return fs.readFileSync(path, 'utf-8');
});
```

*Tauri:*
```rust
// main.rs
#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    fs::read_to_string(path)
        .map_err(|e| e.to_string())
}
```

Open source if you want to see the full migration: [github link]

Questions? Ask away!

---

## Post 12: r/AppHookup (if doing a launch promotion)

**Title:** [Free] Lokus - Local-first note-taking app (normally would be paid with cloud sync)

**Body:**

**App:** Lokus
**Platform:** Windows, macOS, Linux
**Price:** Free (open source)
**Regular Price:** Would probably charge for cloud sync but that's not built yet

**What is it:**
Note-taking app that stores everything locally. No subscription, no cloud lock-in.

**Features:**
- Wiki-style linking
- Graph visualization
- Database views (like Notion)
- Task management
- Canvas mode
- Themes

**Why free:**
It's open source. Built because I was tired of subscription fatigue. Figure others might be too.

**Catch:**
- No mobile apps yet
- No built-in sync (use your own cloud)
- Some features are still rough

**Download:** [github link releases]
**Docs:** [docs link]

If you like it, star the repo. That's payment enough.

---

## Guidelines for Posting

**Important Reddit etiquette:**

1. **Read subreddit rules first** - many have strict self-promotion rules
2. **Participate in the community** before posting your own content
3. **Be genuine** - Reddit hates marketing speak
4. **Respond to ALL comments** - engagement is key
5. **Cross-post carefully** - don't spam multiple subreddits at once
6. **Timing matters** - post during peak hours (US morning/evening)

**Best subreddits for Lokus:**
- r/SideProject (most friendly to launches)
- r/opensource (loves open source projects)
- r/programming (if focused on technical aspects)
- r/rust (for Rust community)
- r/reactjs (for React community)
- r/PKMS or r/ObsidianMD (your target audience)
- r/productivity (broader audience)
- r/selfhosted (technical self-hosters)

**Avoid:**
- Posting the same thing to multiple subreddits same day
- Not responding to comments
- Being defensive about criticism
- Over-promoting

**Pro tip:**
Create a few throwaway accounts and build karma by genuinely participating in communities for a few weeks before posting about your project. Reddit hates new accounts self-promoting.