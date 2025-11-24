import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps }) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <>
      {/* Umami Analytics (Self-hosted, Privacy-friendly) */}
      <Script
        src="https://analytics.lokusmd.com/script.js"
        data-website-id="1299d78a-7f04-411f-9fa2-22ffbbc3258c"
        strategy="afterInteractive"
      />

      {/* Microsoft Clarity */}
      {clarityId && (
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}

      {/* Google Analytics 4 */}
      {gaId && <GoogleAnalytics gaId={gaId} />}

      <Component {...pageProps} />
    </>
  )
}
