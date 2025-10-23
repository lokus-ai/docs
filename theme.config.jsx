export default {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <img src="/logo.svg" alt="Lokus" style={{ height: '1.5rem' }} />
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Lokus</span>
    </div>
  ),
  project: {
    link: 'https://github.com/lokus-ai/lokus'
  },
  docsRepositoryBase: 'https://github.com/lokus-ai/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Lokus Documentation',
      defaultTitle: 'Lokus Documentation – Local-First Knowledge Management',
      description: 'Comprehensive documentation for Lokus - a powerful, privacy-first knowledge management system with advanced features including interactive graph visualization, AI integration, databases, canvas, and more.',
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://docs.lokus.dev',
        siteName: 'Lokus Documentation',
        images: [
          {
            url: 'https://docs.lokus.dev/og-image.png',
            width: 1200,
            height: 630,
            alt: 'Lokus Documentation'
          }
        ]
      },
      twitter: {
        handle: '@lokus_ai',
        site: '@lokus_ai',
        cardType: 'summary_large_image'
      },
      additionalMetaTags: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        },
        {
          name: 'keywords',
          content: 'lokus, knowledge management, note-taking, markdown editor, wiki links, graph visualization, local-first, privacy, tauri, rust, documentation'
        },
        {
          name: 'author',
          content: 'Lokus Team'
        },
        {
          name: 'theme-color',
          content: '#6366f1'
        }
      ]
    }
  },
  head: (
    <>
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