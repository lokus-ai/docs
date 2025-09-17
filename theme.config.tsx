import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontWeight: 'bold',
      fontSize: '1.2rem'
    }}>
      <svg width="24" height="25" viewBox="0 0 480 495" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M204 1.1333C199.6 1.79999 192.133 3.26666 187.333 4.33331C182.533 5.39999 177.6 6.33331 176.267 6.33331C174.8 6.33331 171.867 7.13333 169.6 8.06665C163.467 10.7333 156.533 13.1333 152 14.2C149.733 14.7333 146.8 15.9333 145.333 16.7333C143.867 17.5333 140 19.4 136.667 21C130.133 24.0667 128.4 25 119.6 30.6C116.4 32.7333 113.6 34.3333 113.2 34.3333C112.667 34.3333 103.6 40.8666 92 49.6667C80 58.8666 44.8 99 40.2666 109C39.7333 110.067 38.1333 112.733 36.8 115C27.7333 129.4 16.1333 155.933 10.9333 174.333C2.26663 205.133 0.666626 216.333 0.666626 246.867C0.666626 273.133 2.13329 286.067 6.79996 303.133C7.86663 306.867 8.66663 311 8.66663 312.467C8.66663 313.8 10.2666 319.133 12.1333 324.333C14 329.4 16 335.133 16.6666 337C20 347.133 32.8 373.133 40.4 385.267C64.5333 423.533 96.9333 453 135.333 471.8C158.933 483.267 171.6 487.933 185.333 490.333C189.067 491 195.067 492.2 198.667 493.133C202.8 494.067 216.533 494.733 235.333 494.733C265.067 494.867 274.667 493.8 293.333 488.733C296.267 487.933 300.8 486.867 303.333 486.2C311.2 484.467 319.333 481.267 336 472.867C353.6 464.2 355.067 463.267 362.133 457.933C364.8 455.933 367.467 454.333 368 454.333C369.733 454.333 384.533 442.2 396.4 431C419.467 409.4 440.933 377.933 454.667 345.667C455.6 343.4 457.333 339.4 458.533 336.6C459.733 333.8 460.667 330.6 460.667 329.267C460.667 328.067 461.6 325.8 462.667 324.467C463.867 323 464.667 319 464.667 315.267C464.667 307.4 465.467 308.467 420 254.867C415.6 249.667 409.6 242.467 406.667 239C403.733 235.4 400.4 231.667 399.2 230.467C398.133 229.267 395.2 225.667 392.667 222.333C390.133 219 386.8 215 385.2 213.267C383.6 211.667 381.333 207.533 380 204.2C378 198.733 377.867 197.4 379.467 192.467C380.933 187.8 385.467 179 390 171.667C390.667 170.6 392.533 167 394.267 163.667C396.8 158.333 406.533 141.133 410 135.667C410.667 134.6 412.8 130.6 414.667 127C416.533 123.267 419.2 118.467 420.533 116.333C421.733 114.067 425.467 107.533 428.667 101.667C431.867 95.8 435.467 89.1333 436.8 87C438.133 84.7333 440.8 79.9333 442.667 76.3333C444.667 72.6 448.267 66.0667 450.667 61.6667C453.2 57.2667 455.867 52.4666 456.667 51C457.467 49.5333 460.133 44.7333 462.667 40.3333C465.067 35.9333 468.8 29.2667 470.667 25.6667C472.533 21.9333 475.6 16.4666 477.333 13.4C481.067 6.59998 479.867 5.1333 474.667 10.0667C469.867 14.4666 461.867 21.4 453.333 28.3333C449.867 31.2667 446 34.6 444.8 35.8C443.6 36.8666 440 39.9333 436.667 42.3333C433.333 44.8666 426.8 50.2 422 54.0667C417.2 57.9333 410.933 63.1333 408.133 65.4C405.2 67.8 402 70.6 400.8 71.8C399.6 72.8666 394.8 76.7333 390 80.3333C385.2 83.9333 381.067 87.2667 380.667 87.6667C380.267 88.0667 376.667 91 372.667 94.3333C368.667 97.6667 363.2 102.333 360.533 104.733C357.867 107.133 352.533 111.4 348.533 114.333C344.667 117.267 341.2 120.2 340.8 120.733C340.267 121.4 334 126.867 326.667 133C315.067 142.733 306.667 150.067 301.467 155.133C300.667 155.933 294 161.8 286.667 168.333C265.733 186.867 259.333 193.667 259.333 197.267C259.333 200.067 264 208.067 266.933 210.2C267.6 210.6 274.533 218.467 282.667 227.667C290.667 236.867 300.533 247.8 304.667 252.2C308.667 256.467 312.667 260.6 313.467 261.533C315.2 263.4 337.467 288.467 341.333 292.867C342.8 294.467 345.333 297.4 347.067 299.267C351.333 303.933 356.667 316.333 356.667 321.667C356.667 337.933 325.733 369.8 296.667 383.667C293.333 385.267 289.6 387.133 288.133 387.933C284.933 389.667 273.6 392.733 259.333 395.667C236.667 400.333 206.533 396.6 183.6 386.2C179.067 384.067 175.067 382.333 174.8 382.333C174.4 382.333 170.4 379.8 165.733 376.733C112.667 341.667 87.8666 286.467 96.4 222.333C98.1333 209.4 102.8 192.2 106.133 186.333C106.8 185.267 107.733 183.4 108.133 182.333C110.667 175.667 117.2 164.467 124.267 154.867C136.533 138.333 156.267 121.133 174 111.8C180.4 108.467 182.533 107.533 187.6 105.667C205.733 99 222.533 95.8 238.533 95.6667C251.6 95.5333 270.133 98.2 275.333 101C276.667 101.667 278.8 102.333 280 102.333C281.2 102.333 285.733 104.067 290.267 106.333C299.867 111.133 306.533 111.4 311.467 107.267C313.467 105.667 323.733 97 334.4 87.9333C345.2 79 355.067 70.6 356.267 69.2667C357.6 67.9333 361.333 64.7333 364.667 62.0667C368 59.4 373.067 55.1333 376 52.3333L381.333 47.5333L376.667 43.5333C374.133 41.2667 370.8 38.8666 369.333 38.2C367.867 37.5333 364.933 35.8 362.667 34.3333C360.533 32.8666 357.733 31.4 356.667 30.8666C355.6 30.4666 353.733 29.5333 352.667 28.8666C351.6 28.2 349.733 27.2667 348.667 26.8666C347.6 26.4666 342.8 24.2 338 22.0667C321.467 14.6 314.667 11.9333 307.2 10.4666C304.667 9.93332 301.733 8.99997 300.8 8.46664C298.533 6.99997 283.6 3.79999 272 2.06665C259.467 0.333313 214 -0.333344 204 1.1333Z" fill="currentColor"/>
      </svg>
      Lokus
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
        
        .nextra-code-block {
          position: relative;
        }
        
        .nextra-code-block:hover .copy-button {
          opacity: 1;
        }
        
        .copy-button {
          position: absolute;
          top: 12px;
          right: 12px;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 10;
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
        
        /* Mobile responsiveness improvements */
        @media (max-width: 768px) {
          .nextra-nav-container {
            padding: 0 1rem;
          }
          
          .nextra-sidebar-container {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          
          .nextra-sidebar-container.open {
            transform: translateX(0);
          }
          
          .nextra-content {
            padding: 0 1rem;
          }
          
          h1 { font-size: 2rem; }
          h2 { font-size: 1.5rem; }
          h3 { font-size: 1.25rem; }
          
          pre {
            margin: 1rem -1rem;
            border-radius: 0;
            border-left: none;
            border-right: none;
          }
          
          .nextra-toc {
            display: none;
          }
        }
        
        /* Smooth scrolling for better UX */
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
        
        /* Loading states */
        .loading-skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
          background-size: 400% 100%;
          animation: skeleton-loading 1.4s ease-in-out infinite;
        }
        
        .dark .loading-skeleton {
          background: linear-gradient(90deg, #374151 25%, transparent 37%, #374151 63%);
          background-size: 400% 100%;
        }
        
        @keyframes skeleton-loading {
          0% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Focus states for accessibility */
        .focus-visible {
          outline: 2px solid rgba(102, 126, 234, 0.8);
          outline-offset: 2px;
        }
        
        /* Improved link hover effects */
        .nextra-content a:not(.no-underline) {
          position: relative;
        }
        
        .nextra-content a:not(.no-underline)::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(45deg, #667eea, #f093fb);
          transition: width 0.3s ease;
        }
        
        .nextra-content a:not(.no-underline):hover::after {
          width: 100%;
        }
        
        /* Enhanced code block styling */
        .nextra-code-block pre {
          position: relative;
          overflow-x: auto;
          padding: 1.5rem;
        }
        
        .nextra-code-block pre::-webkit-scrollbar {
          height: 8px;
        }
        
        .nextra-code-block pre::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        
        .nextra-code-block pre::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #667eea, #f093fb);
          border-radius: 4px;
        }
        
        /* Card hover effects for better interactivity */
        .interactive-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
        }
        
        .interactive-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .dark .interactive-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
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