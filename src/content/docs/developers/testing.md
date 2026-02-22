---
title: Testing
description: Test setup, frameworks, and commands for running unit and E2E tests in Lokus.
---

Lokus uses [Vitest](https://vitest.dev/) for unit tests and [Playwright](https://playwright.dev/) for end-to-end tests, with [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for component testing.

## Test Structure

```
src/
├── core/
│   ├── config/store.test.js           # Settings persistence
│   ├── theme/manager.test.js          # Theme switching
│   ├── shortcuts/registry.test.js     # Keyboard shortcut registration
│   ├── editor/live-settings.test.js   # Real-time editor settings
│   └── clipboard/shortcuts.test.js    # Clipboard operations
├── components/
│   └── CommandPalette.test.jsx        # Command palette UI
└── utils/
    └── markdown.test.js               # Markdown parsing

tests/
├── e2e/
│   ├── app-navigation.spec.js         # Route and sidebar navigation
│   ├── math-rendering.spec.js         # KaTeX inline/block math
│   ├── editor-functionality.spec.js   # Typing, formatting, wiki links
│   ├── preferences.spec.js            # Settings dialog
│   ├── markdown-paste.spec.js         # Rich text paste handling
│   └── file-operations.spec.js        # Create, open, save, delete files
├── unit/
│   ├── editor-utils.test.js           # Editor utility functions
│   └── math.test.js                   # Math rendering logic
└── setup.js                           # Global test setup and mocks
```

## Running Tests

### Unit Tests

```bash
npm test                    # Run all unit tests once
npm run test:watch          # Watch mode (re-runs on file changes)
npm run test:watch:silent   # Watch mode with minimal output
npm run test:summary        # Verbose output with test names
npm run test:failures       # Show only failures
```

Run a specific test file:

```bash
npx vitest run src/core/config/store.test.js
```

### E2E Tests

```bash
npm run test:e2e            # Headless (no visible browser)
npm run test:e2e:headed     # Visible browser window
npm run test:e2e:ui         # Playwright UI mode (interactive)
```

### Development Workflow

Run the dev server and tests side by side:

```bash
npm run dev:test
```

This uses `concurrently` to start Vite and Vitest watch mode in parallel.

## Test Environment

Unit tests run in `jsdom` with comprehensive mocks for Tauri APIs and browser APIs.

### Tauri API Mocks

The test setup (`tests/setup.js`) stubs Tauri's IPC layer:

```javascript
global.window.__TAURI_INTERNALS__ = {
  invoke: vi.fn()
}

global.window.__TAURI_METADATA__ = {
  currentWindow: { label: 'main' }
}
```

### Browser API Mocks

These browser APIs are mocked for consistent test results:

- `navigator.clipboard` (read/write)
- `ResizeObserver`
- `IntersectionObserver`
- `matchMedia`
- `CSS.supports`

## Configuration

### Vitest (`vitest.config.js`)

```javascript
{
  environment: 'jsdom',
  setupFiles: ['./tests/setup.js'],
  globals: true,
  css: true,
  testTimeout: 10000,
  coverage: {
    reporter: ['text', 'json', 'html'],
    exclude: ['node_modules/', 'tests/', 'src-tauri/']
  }
}
```

### Playwright (`playwright.config.js`)

```javascript
{
  testDir: './tests/e2e',
  timeout: 30000,
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure'
  }
}
```

## Writing Tests

### Unit Test Example

```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders the button', () => {
    render(<MyComponent />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

### E2E Test Example

```javascript
import { test, expect } from '@playwright/test'

test('creates a new note', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="new-note"]')
  await expect(page.locator('.editor')).toBeVisible()
})
```

## Debugging Tests

```bash
npx vitest run --reporter=verbose     # Detailed unit test output
npx playwright test --headed          # See the browser during E2E
npx playwright test --debug           # Step through E2E tests
```

Common fixes for flaky tests:
- Clear mocks between tests with `vi.clearAllMocks()`
- Use explicit waits (`await expect(...).toBeVisible()`) instead of fixed delays
- Increase `testTimeout` for slow CI environments
