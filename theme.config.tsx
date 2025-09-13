import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>🌌 Lokus</span>,
  project: {
    link: 'https://github.com/lokus-ai/lokus',
  },
  chat: {
    link: 'https://discord.gg/your-discord', // Add your Discord link
  },
  docsRepositoryBase: 'https://github.com/lokus-ai/docs',
  footer: {
    text: 'Lokus Documentation - A modern, intuitive note-taking application',
  },
  search: {
    placeholder: 'Search documentation...'
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    },
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
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Lokus'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Lokus Documentation" />
      <meta property="og:description" content="A modern, intuitive note-taking application with powerful editing capabilities" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}

export default config