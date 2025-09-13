import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 'bold',
      fontSize: '20px'
    }}>
      <span style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '24px'
      }}>🌌</span>
      Lokus
    </div>
  ),
  project: {
    link: 'https://github.com/lokus-ai/lokus',
  },
  chat: {
    link: 'https://discord.gg/your-discord',
  },
  docsRepositoryBase: 'https://github.com/lokus-ai/docs',
  footer: {
    text: (
      <div style={{
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '16px',
        textAlign: 'center' as const,
        color: 'var(--nextra-colors-gray-600)',
        margin: '20px 0'
      }}>
        © 2024 Lokus. Built with ❤️ and AI. Powered by the future of note-taking.
      </div>
    ),
  },
  search: {
    placeholder: 'Search with AI magic...'
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Lokus AI Documentation'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Lokus AI Documentation" />
      <meta property="og:description" content="Next-generation AI-powered note-taking with beautiful design" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style jsx global>{`
        :root {
          --lokus-primary: #667eea;
          --lokus-secondary: #764ba2;
          --lokus-accent: #f093fb;
          --lokus-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --lokus-gradient-soft: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        }
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        code, pre {
          font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Roboto Mono', monospace !important;
        }
        
        body {
          background: 
            radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 60% 40%, rgba(240, 147, 251, 0.1) 0%, transparent 50%);
          background-attachment: fixed;
          min-height: 100vh;
        }
        
        .nextra-nav-container {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .nextra-nav-container {
          background: rgba(0, 0, 0, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nextra-sidebar-container {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.6);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .nextra-sidebar-container {
          background: rgba(0, 0, 0, 0.6);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nextra-content {
          position: relative;
          overflow: hidden;
        }
        
        .nextra-content::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.3) 0%, transparent 25%),
            radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.3) 0%, transparent 25%);
          animation: float 20s ease-in-out infinite;
          pointer-events: none;
          z-index: -1;
          opacity: 0.5;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }
        
        h1, h2, h3, h4, h5, h6 {
          background: var(--lokus-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
        }
        
        .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6 {
          background: linear-gradient(135deg, #a8b5ff 0%, #c4a8ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        pre {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        code:not(pre code) {
          background: rgba(102, 126, 234, 0.1) !important;
          padding: 2px 6px;
          border-radius: 6px;
          border: 1px solid rgba(102, 126, 234, 0.2);
        }
        
        blockquote {
          background: var(--lokus-gradient-soft);
          backdrop-filter: blur(10px);
          border-left: 4px solid var(--lokus-primary);
          border-radius: 12px;
          padding: 16px 20px;
          margin: 24px 0;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
        }
        
        a {
          background: var(--lokus-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          position: relative;
        }
        
        a:hover {
          opacity: 0.8;
        }
        
        .nextra-toc {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.6);
          border-radius: 16px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .nextra-toc {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nextra-search input {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
        }
        
        .dark .nextra-search input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  ),
  primaryHue: 245,
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return (
          <div style={{
            background: 'var(--lokus-gradient)',
            height: '2px',
            borderRadius: '1px',
            margin: '16px 0',
            opacity: 0.3
          }} />
        )
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
    text: '✨ Edit this page on GitHub →'
  },
  feedback: {
    content: '💬 Question? Give us feedback →',
    labels: 'feedback'
  }
}

export default config