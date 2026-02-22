---
title: Contributing
description: How to contribute to Lokus, including PR process, coding standards, and branch naming.
---

Contributions are welcome. Bug fixes, features, documentation improvements, and test coverage -- all of it helps.

## Before You Start

1. Check [existing issues](https://github.com/lokus-ai/lokus/issues) to avoid duplicating work.
2. Check [open pull requests](https://github.com/lokus-ai/lokus/pulls) for in-progress work.
3. For large features, open a [discussion](https://github.com/lokus-ai/lokus/discussions) first.
4. Look for [`good first issue`](https://github.com/lokus-ai/lokus/labels/good%20first%20issue) labels if you are a first-time contributor.

## Workflow

```bash
# 1. Fork and clone
gh repo fork lokus-ai/lokus --clone
cd lokus

# 2. Create a branch
git checkout -b feat/your-feature-name
# or: fix/issue-42-editor-crash

# 3. Install dependencies
npm install

# 4. Make changes and test
npm run tauri dev       # Run the app
npm test                # Unit tests
npm run test:e2e        # E2E tests

# 5. Commit with conventional commits
git add .
git commit -m "feat: add wiki link autocomplete"

# 6. Push and open a PR
git push origin feat/your-feature-name
gh pr create --title "feat: add wiki link autocomplete"
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add wiki link autocompletion
fix: resolve math rendering issue in tables
docs: update installation instructions
test: add e2e tests for preferences
refactor: improve editor extension architecture
perf: optimize file search performance
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

## Coding Standards

### JavaScript / React

- Use ES6+ syntax and React hooks (no class components).
- Use semantic HTML and accessibility attributes in JSX.
- Format with Prettier, lint with ESLint. Both run automatically on commit.

```bash
npm run lint          # Check for lint errors
npm run lint:fix      # Auto-fix lint errors
npm run format        # Format with Prettier
```

### Naming Conventions

| What | Convention | Example |
|------|-----------|---------|
| Component files | `PascalCase.jsx` | `CommandPalette.jsx` |
| Utility files | `camelCase.js` | `markdownParser.js` |
| Components | PascalCase | `FileTree` |
| Variables/functions | camelCase | `handleClick` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_DEPTH` |
| CSS classes | kebab-case | `file-tree-item` |

### Rust

Follow standard Rust conventions. Run `cargo clippy` before submitting.

## Pull Request Checklist

Before submitting your PR, confirm:

- [ ] All tests pass (`npm test && npm run test:e2e`)
- [ ] Code follows the naming conventions above
- [ ] New functionality includes tests
- [ ] Documentation updated if user-facing behavior changed
- [ ] Branch is rebased on latest `main`

## Review Process

1. CI runs tests and builds on macOS, Windows, and Linux.
2. A maintainer reviews the code for correctness and design.
3. At least one maintainer approval is required to merge.
4. PRs are squash-merged into `main`.

## License

By contributing to Lokus, you agree that your contributions will be licensed under the [FCL 1.0 (Fair Core License)](https://fcl.dev/). The license converts to MIT after 2 years.

## Getting Help

- [GitHub Discussions](https://github.com/lokus-ai/lokus/discussions) -- questions and ideas
- [Discord](https://discord.com/invite/2rauPDEXcs) -- real-time chat
- [GitHub Issues](https://github.com/lokus-ai/lokus/issues) -- bug reports and feature requests
