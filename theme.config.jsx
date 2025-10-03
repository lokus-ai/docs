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
  head: (
    <>
      <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/logo.svg" />
    </>
  ),
  footer: {
    text: 'Lokus Documentation'
  }
}