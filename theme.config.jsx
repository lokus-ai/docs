import { useConfig } from 'nextra-theme-docs'

export default {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <img
        src="/logo.svg"
        alt="Lokus"
        style={{ height: '1.5rem' }}
        className="nx-logo"
      />
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Lokus</span>
      <style jsx>{`
        .nx-logo {
          filter: brightness(0) saturate(100%);
        }
        :global(.dark) .nx-logo {
          filter: brightness(0) saturate(100%) invert(1);
        }
      `}</style>
    </div>
  ),
  project: {
    link: 'https://github.com/lokus-ai/lokus'
  },
  docsRepositoryBase: 'https://github.com/lokus-ai/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Lokus Documentation'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Lokus Documentation: Local-First Knowledge Management" />
      <meta name="og:title" content="Lokus Documentation" />
      <meta name="og:description" content="Lokus Documentation: Local-First Knowledge Management" />
      <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/logo.svg" />
      <meta name="msapplication-TileColor" content="#6366f1" />
    </>
  ),
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} © Lokus Documentation. Built with{' '}
        <a href="https://nextra.site" target="_blank" rel="noopener noreferrer">
          Nextra
        </a>
      </span>
    )
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  toc: {
    backToTop: true
  },
  editLink: {
    text: 'Edit this page on GitHub →'
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback'
  },
  navigation: {
    prev: true,
    next: true
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark'
  }
}