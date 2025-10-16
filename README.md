# Lokus Documentation

Official documentation for Lokus - a sophisticated, local-first markdown note-taking application built with React and Rust.

## About

This repository contains the complete documentation for Lokus, built with Next.js and Nextra. The docs cover everything from basic usage to advanced plugin development, covering all features of Lokus v1.3 "Quantum Leap" and beyond.

**Live Documentation:** https://docs.lokus.dev

## Features

- **47+ comprehensive pages** covering all Lokus features
- **Developer guides** with complete code examples
- **API references** with TypeScript definitions
- **Advanced topics** including Quantum architecture, plugin system, and security
- **MCP integration** documentation with 68+ tools
- **Full-text search** powered by Nextra
- **Dark mode** support
- **Mobile responsive** design

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lokus-ai/docs.git lokus-docs
cd lokus-docs

# Install dependencies
npm install

# Start development server
npm run dev
```

The documentation will be available at `http://localhost:3000` (or 3001 if port 3000 is in use).

### Build for Production

```bash
# Build static site
npm run build

# Start production server
npm start
```

## Documentation Structure

```
pages/
├── index.mdx                    # Homepage
├── getting-started/
│   ├── installation.mdx         # Installation guide
│   ├── quick-start.mdx          # Quick start tutorial
│   └── configuration.mdx        # Configuration options
├── features/
│   ├── overview.mdx             # Features overview
│   ├── editor.mdx               # Rich text editor
│   ├── wiki-links.mdx           # Wiki links & backlinks
│   ├── graph.mdx                # Graph visualization
│   ├── bases.mdx                # Database system
│   ├── search.mdx               # Search system
│   ├── tasks.mdx                # Task management
│   ├── canvas.mdx               # Canvas whiteboard
│   ├── gmail.mdx                # Gmail integration
│   └── templates.mdx            # Template system
├── developers/
│   ├── setup.mdx                # Development setup
│   ├── architecture.mdx         # Architecture overview
│   ├── plugins/
│   │   ├── overview.mdx         # Plugin system overview
│   │   ├── getting-started.mdx  # Plugin development guide
│   │   ├── api.mdx              # Plugin API reference
│   │   ├── manifest.mdx         # Plugin manifest format
│   │   ├── editor-plugins.mdx   # Editor extensions
│   │   ├── ui-plugins.mdx       # UI extensions
│   │   ├── lifecycle.mdx        # Plugin lifecycle
│   │   ├── cli.mdx              # Plugin CLI tool
│   │   └── publishing.mdx       # Publishing plugins
│   └── mcp/
│       ├── overview.mdx         # MCP overview
│       ├── setup.mdx            # MCP setup guide
│       ├── tools.mdx            # MCP tools reference
│       ├── resources.mdx        # MCP resources
│       ├── prompts.mdx          # MCP prompts
│       ├── ai-assistants.mdx    # AI assistant integration
│       └── api-reference.mdx    # MCP API reference
├── advanced/
│   ├── performance.mdx          # Performance & Quantum architecture
│   ├── security.mdx             # Security features & OAuth 2.0
│   ├── customization.mdx        # Customization options
│   └── troubleshooting.mdx      # Troubleshooting guide
└── reference/
    └── plugin-api.mdx           # Complete API reference
```

## Contributing

We welcome contributions to improve the documentation! Here's how you can help:

### Reporting Issues

Found a typo, broken link, or unclear explanation? Please [open an issue](https://github.com/lokus-ai/docs/issues) with:
- Page URL or file path
- Description of the problem
- Suggested improvement (optional)

### Suggesting Improvements

Have ideas for new content or better explanations? We'd love to hear them:
- [Open a discussion](https://github.com/lokus-ai/docs/discussions)
- Describe what you'd like to see
- Explain why it would be helpful

### Contributing Content

Want to write documentation yourself?

1. **Fork the repository**
2. **Create a branch** for your changes
   ```bash
   git checkout -b docs/improve-plugin-guide
   ```
3. **Make your changes**
   - Follow the existing style and structure
   - Use proper markdown formatting
   - Include code examples where appropriate
   - Test locally with `npm run dev`
4. **Commit with clear messages**
   ```bash
   git commit -m "docs: improve plugin development guide with more examples"
   ```
5. **Submit a pull request**
   - Describe your changes
   - Link any related issues
   - Wait for review

### Writing Style Guide

**Tone & Voice:**
- Clear and concise
- Technical but approachable
- Use active voice
- Avoid jargon unless necessary (then explain it)

**Formatting:**
- Use proper markdown syntax
- Code blocks must specify language
- Use TypeScript for code examples
- Include inline comments for complex code
- Use callouts for important notes

**Code Examples:**
```typescript
// Good - Clear, commented, complete
async function createNote(title: string, content: string): Promise<Note> {
  // Validate inputs
  if (!title || !content) {
    throw new Error('Title and content required')
  }

  // Create note with metadata
  const note = {
    id: generateId(),
    title,
    content,
    created: Date.now(),
    modified: Date.now()
  }

  // Save to disk
  await saveNote(note)

  return note
}

// Bad - No context, incomplete
async function createNote(title, content) {
  return await saveNote({ title, content })
}
```

**Callouts:**
```mdx
> **Note:** This feature requires Lokus v1.3+

> **Warning:** Modifying this setting can cause data loss

> **Tip:** Use Cmd+K to quickly search notes
```

## Technology Stack

- **Framework:** Next.js 14
- **Documentation:** Nextra 2.13
- **Styling:** Tailwind CSS (via Nextra)
- **Search:** Built-in FlexSearch
- **Deployment:** Vercel
- **Analytics:** None (privacy-focused)

## Development

### Project Structure

```
lokus-docs/
├── pages/              # Documentation pages (MDX)
├── public/             # Static assets (images, etc.)
├── theme.config.jsx    # Nextra theme configuration
├── next.config.js      # Next.js configuration
└── package.json        # Dependencies
```

### Adding a New Page

1. Create MDX file in appropriate directory:
   ```bash
   touch pages/features/new-feature.mdx
   ```

2. Add frontmatter and content:
   ```mdx
   # New Feature Name

   Brief description of the feature.

   **Version:** 1.3.1 | **Status:** Production Ready

   ## Overview

   Detailed explanation...
   ```

3. The page will automatically appear in navigation (alphabetically)

4. To customize navigation order, edit `theme.config.jsx`:
   ```javascript
   export default {
     navigation: {
       features: [
         'overview',
         'new-feature',  // Add here
         'editor',
         // ...
       ]
     }
   }
   ```

### Updating Theme

Edit `theme.config.jsx` to customize:
- Logo and branding
- Navigation structure
- Footer content
- Search behavior
- Dark mode settings

### Testing Changes

```bash
# Start dev server
npm run dev

# Build to check for errors
npm run build

# Test production build
npm start
```

## Deployment

Documentation is automatically deployed to Vercel on push to `main` branch.

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

### Environment Variables

No environment variables required. All configuration is in `theme.config.jsx`.

## Search

The documentation includes built-in full-text search powered by FlexSearch:
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
- Search across all pages
- Results ranked by relevance
- No external dependencies

## Analytics

This documentation site does not use analytics or tracking to respect user privacy. We rely on GitHub issues and discussions for feedback.

## License

Documentation content is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Code examples in the documentation are licensed under [MIT License](https://opensource.org/licenses/MIT).

## Links

- **Main Repository:** https://github.com/lokus-ai/lokus
- **Documentation:** https://docs.lokus.dev
- **Issues:** https://github.com/lokus-ai/docs/issues
- **Discussions:** https://github.com/lokus-ai/docs/discussions
- **Website:** https://lokus.dev

## Support

Need help with Lokus or the documentation?

- **Documentation Issues:** Open an issue in this repo
- **Lokus Issues:** Open an issue in [lokus-ai/lokus](https://github.com/lokus-ai/lokus)
- **Community:** Join our [Discord server](https://discord.gg/lokus)
- **Email:** support@lokus.dev

---

Built with [Nextra](https://nextra.site) and [Next.js](https://nextjs.org)
