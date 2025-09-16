import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 'bold',
      fontSize: '1.2rem'
    }}>
      🌌 Lokus
    </div>
  ),
  project: {
    link: 'https://github.com/lokus-ai/lokus',
  },
  chat: {
    link: 'https://github.com/lokus-ai/lokus/discussions',
  },
  docsRepositoryBase: 'https://github.com/lokus-ai/lokus/tree/main/docs',
  footer: {
    text: 'Lokus Documentation - A modern, intuitive note-taking application',
  },
  search: {
    placeholder: 'Search documentation...'
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
      <meta property="og:description" content="Next-generation AI-powered note-taking with stunning design" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style jsx global>{`
        :root {
          --lokus-primary: #667eea;
          --lokus-secondary: #764ba2;
          --lokus-accent: #f093fb;
          --lokus-neon: #00d4ff;
          --lokus-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        code, pre {
          font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Roboto Mono', monospace !important;
        }
        
        @keyframes rainbowShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes meshMove {
          0%, 100% { 
            transform: translateX(0px) translateY(0px) rotate(0deg) scale(1);
            filter: hue-rotate(0deg);
          }
          33% { 
            transform: translateX(-30px) translateY(-20px) rotate(120deg) scale(1.1);
            filter: hue-rotate(120deg);
          }
          66% { 
            transform: translateX(30px) translateY(20px) rotate(240deg) scale(0.9);
            filter: hue-rotate(240deg);
          }
        }
        
        @keyframes floatParticles {
          0% { transform: translateY(100vh) translateX(0px) rotate(0deg) scale(0); opacity: 0; }
          10% { opacity: 1; transform: translateY(90vh) translateX(10px) rotate(36deg) scale(1); }
          90% { opacity: 1; transform: translateY(10vh) translateX(-10px) rotate(324deg) scale(1); }
          100% { transform: translateY(-10vh) translateX(0px) rotate(360deg) scale(0); opacity: 0; }
        }
        
        @keyframes morphBlob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 60% 30% 60% / 30% 40% 60% 70%; }
          75% { border-radius: 60% 40% 60% 30% / 70% 50% 40% 30%; }
        }
        
        body {
          background: 
            radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 60% 40%, rgba(240, 147, 251, 0.03) 0%, transparent 50%);
          background-attachment: fixed;
          min-height: 100vh;
        }
        
        .nextra-nav-container {
          backdrop-filter: blur(20px) saturate(180%);
          background: rgba(0, 0, 0, 0.8);
          border-bottom: 1px solid rgba(102, 126, 234, 0.2);
          position: relative;
        }
        
        .nextra-nav-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.8), rgba(240, 147, 251, 0.8), transparent);
          animation: gradientShift 3s ease-in-out infinite;
        }
        
        .nextra-sidebar-container {
          backdrop-filter: blur(20px) saturate(180%);
          background: rgba(0, 0, 0, 0.7);
          border-right: 1px solid rgba(102, 126, 234, 0.2);
        }
        
        .nextra-content {
          position: relative;
          z-index: 1;
        }
        
        h1, h2, h3, h4, h5, h6 {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
          background: rgba(0, 0, 0, 0.8) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 20px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(102, 126, 234, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        pre::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        code:not(pre code) {
          background: rgba(102, 126, 234, 0.2) !important;
          padding: 4px 8px;
          border-radius: 8px;
          border: 1px solid rgba(102, 126, 234, 0.3);
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
        }
        
        blockquote {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%);
          backdrop-filter: blur(10px);
          border-left: 4px solid;
          border-image: linear-gradient(to bottom, #667eea, #f093fb) 1;
          border-radius: 16px;
          padding: 20px 24px;
          margin: 24px 0;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.1);
          position: relative;
        }
        
        blockquote::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
          border-radius: 16px;
          z-index: -1;
          opacity: 0.5;
          filter: blur(4px);
        }
        
        a {
          background: linear-gradient(45deg, #667eea, #f093fb);
          background-size: 200% 200%;
          animation: gradientShift 3s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          position: relative;
          transition: all 0.3s ease;
        }
        
        a:hover {
          filter: brightness(1.2);
          text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }
        
        .nextra-toc {
          backdrop-filter: blur(20px);
          background: rgba(0, 0, 0, 0.6);
          border-radius: 20px;
          padding: 20px;
          border: 1px solid rgba(102, 126, 234, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .nextra-search input {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 16px;
          color: white;
          transition: all 0.3s ease;
        }
        
        .nextra-search input:focus {
          border-color: rgba(240, 147, 251, 0.6);
          box-shadow: 0 0 20px rgba(240, 147, 251, 0.3);
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
            background: 'linear-gradient(90deg, #667eea, #f093fb)',
            height: '2px',
            borderRadius: '1px',
            margin: '16px 0',
            animation: 'gradientShift 2s ease-in-out infinite'
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