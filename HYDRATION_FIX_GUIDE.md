# Hydration Error Fix Guide

## Problem
Hydration errors occur when the HTML generated on the server doesn't match what React renders on the client. The most common cause is **invalid HTML nesting**, specifically `<p>` tags inside other `<p>` tags.

## Common Causes in MDX/Nextra

### 1. Using `<p>` tags in MDX
❌ **WRONG:**
```mdx
<div className="container">
  <p className="text">Some text</p>
</div>
```

✅ **CORRECT:**
```mdx
<div className="container">
  <div className="text">Some text</div>
</div>
```

**Why:** MDX can automatically wrap content in `<p>` tags, causing nesting issues.

### 2. Bold/Strong text in markdown creating paragraphs
❌ **WRONG:**
```mdx
**Real-time Collaboration:**
- Item 1
- Item 2
```

✅ **CORRECT:**
```mdx
<div className="font-semibold">Real-time Collaboration:</div>

- Item 1
- Item 2
```

OR use HTML:
```mdx
<div>
  <div className="font-semibold">Real-time Collaboration:</div>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

### 3. Mixing Markdown and JSX
❌ **WRONG:**
```mdx
<div>
  This is some text that will be wrapped in <p>

  <div>Inner div</div>
</div>
```

✅ **CORRECT:**
```mdx
<div>
  <div>This is some text in a div</div>
  <div>Inner div</div>
</div>
```

### 4. Callouts with complex content
❌ **WRONG:**
```mdx
<Callout type="info">
  **Goal**: Some text
  **Status**: More text
</Callout>
```

✅ **CORRECT:**
```mdx
<Callout type="info">
  Goal: Some text • Status: More text • Priority: High
</Callout>
```

### 5. Lists with headers
❌ **WRONG:**
```mdx
**Features:**
- Feature 1
- Feature 2
```

✅ **CORRECT:**
```mdx
<div className="font-semibold mb-2">Features:</div>

- Feature 1
- Feature 2
```

OR:
```mdx
<div>
  <div className="font-semibold mb-2">Features:</div>
  <ul className="list-disc list-inside">
    <li>Feature 1</li>
    <li>Feature 2</li>
  </ul>
</div>
```

## Quick Fixes

### Replace all `<p>` with `<div>`
```bash
# In your MDX files, replace:
<p className="...">  →  <div className="...">
</p>                 →  </div>
```

### Replace all `<h3>` in JSX sections with `<div>`
```bash
# If you have h3 inside divs:
<h3 className="...">  →  <div className="... font-bold">
</h3>                 →  </div>
```

### Use inline formatting instead of markdown
```bash
# Replace markdown bold with HTML:
**Text**  →  <strong>Text</strong>  or  <div className="font-semibold">Text</div>
```

## File-by-File Fix Process

1. **Find problematic files:**
```bash
grep -r "<p" pages/*.mdx
```

2. **Check each file for:**
   - `<p>` tags → Replace with `<div>`
   - Markdown bold (`**`) before lists → Replace with HTML
   - Callouts with complex markdown → Simplify
   - Mixing markdown and JSX → Separate them

3. **Test each page:**
```bash
npm run dev
# Visit http://localhost:3000/[page-name]
# Check browser console for hydration errors
```

## Fixed Files
- ✅ `pages/roadmap.mdx` - Removed all `<p>` tags, used `<div>` throughout
- ✅ `components/InteractiveGraph.jsx` - Added `isMounted` check

## Files to Check
Check these common problem files:
- [ ] `pages/index.mdx`
- [ ] `pages/comparison.mdx`
- [ ] `pages/faq.mdx`
- [ ] `pages/graph-demo.mdx`
- [ ] All `pages/features/*.mdx` files
- [ ] All `pages/tutorials/*.mdx` files
- [ ] All `pages/examples/*.mdx` files

## Prevention

### Always use in MDX:
```mdx
import { Callout } from 'nextra/components'

# Title

<div className="...">
  <div>Content here</div>
</div>

## Markdown Section

Regular markdown here is fine, but don't mix it with JSX.

<div className="...">
  <div>JSX section - use div not p</div>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

### ESLint Rule (Optional)
Add to `.eslintrc`:
```json
{
  "rules": {
    "react/no-danger-with-children": "error",
    "react/no-unescaped-entities": "warn"
  }
}
```

## Common Error Messages

1. **"Expected server HTML to contain a matching <p> in <p>"**
   - Fix: Remove all `<p>` tags, use `<div>` instead

2. **"Hydration failed because the initial UI does not match"**
   - Fix: Check for markdown/JSX mixing, use consistent HTML

3. **"Text content does not match server-rendered HTML"**
   - Fix: Check for browser-only values (dates, random numbers, window/document access)

## Resources
- [Next.js Hydration Errors](https://nextjs.org/docs/messages/react-hydration-error)
- [MDX Common Pitfalls](https://mdxjs.com/docs/troubleshooting-mdx/)
- [React Hydration](https://react.dev/reference/react-dom/client/hydrateRoot)
