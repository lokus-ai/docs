import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  staticImage: true,
  latex: true,
  defaultShowCopyCode: true
})

export default withNextra({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
    domains: ['docs.lokus.dev', 'github.com']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  async redirects() {
    return [
      // Add any redirects here if needed
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
})