# Lokus Docs

Documentation site for [Lokus](https://lokus.app), built with [Starlight](https://starlight.astro.build/) (Astro).

## Development

```bash
npm install
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

## Structure

Content lives in `src/content/docs/` as `.md` or `.mdx` files. Each file maps to a route based on its path.

Sidebar configuration is in `astro.config.mjs`.
