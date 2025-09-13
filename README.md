# Lokus Documentation

This repository contains the comprehensive documentation for [Lokus](https://github.com/lokus-ai/lokus) - A modern, intuitive note-taking application with powerful editing capabilities.

## 🌐 Live Documentation

Visit [docs.lokus.com](https://docs.lokus.com) to read the full documentation.

## 📖 What's Included

- **Getting Started Guide** - Installation and setup instructions
- **Features Overview** - Complete feature documentation
- **Keyboard Shortcuts** - Comprehensive shortcut reference
- **Development Guide** - Contributing and development setup
- **API Reference** - Technical API documentation
- **Changelog** - Version history and updates

## 🛠️ Local Development

To run the documentation site locally:

```bash
# Clone the repository
git clone https://github.com/lokus-ai/docs.git
cd docs

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Built With

- [Nextra](https://nextra.site/) - Next.js-based documentation framework
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MDX](https://mdxjs.com/) - Markdown with JSX components

## 📝 Contributing to Documentation

We welcome contributions to improve the documentation:

1. **Fork** this repository
2. **Create** a branch for your changes
3. **Edit** the relevant `.mdx` files in the `pages/` directory
4. **Test** your changes locally with `npm run dev`
5. **Submit** a pull request

### Documentation Structure

```
pages/
├── index.mdx           # Home page
├── getting-started.mdx # Installation and setup
├── features.mdx        # Feature documentation
├── shortcuts.mdx       # Keyboard shortcuts
├── development.mdx     # Development guide
├── api.mdx            # API reference
├── changelog.mdx      # Version history
└── _meta.json         # Navigation structure
```

### Writing Guidelines

- Use clear, concise language
- Include code examples where relevant
- Add screenshots for visual features
- Keep sections focused and well-organized
- Use consistent formatting and style

## 🚀 Deployment

The documentation is automatically deployed to [docs.lokus.com](https://docs.lokus.com) when changes are pushed to the main branch.

### Manual Deployment

```bash
# Build static site
npm run build

# Export static files
npm run export

# Deploy to your hosting provider
```

## 📄 License

This documentation is licensed under the same license as the main Lokus project.

## 🔗 Related Links

- [Main Repository](https://github.com/lokus-ai/lokus)
- [Issues](https://github.com/lokus-ai/lokus/issues)
- [Discussions](https://github.com/lokus-ai/lokus/discussions)
- [Discord Community](https://discord.gg/your-discord)

---

For questions about the documentation, please open an issue in the main [Lokus repository](https://github.com/lokus-ai/lokus/issues).