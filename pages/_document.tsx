import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { disableAds } from "../utils/utils";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          <meta
            name="6a97888e-site-verification"
            content="5edf59ad050b91fad1b87fa4ac1dcea0"
          />

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7007879471382156"
          ></script>

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `,
            }}
          />
        </Head>
        <body>
          {/* <script
            async
            type="application/javascript"
            src="https://a.exdynsrv.com/ad-provider.js"
          ></script> */}

          <Main />
          <NextScript />

          {/* <ins
            className="eas6a97888ec52c042c679a36e919843cca"
            data-zoneid="5018914"
          ></ins>

          <ins
            className="eas6a97888ec52c042c679a36e919843cca"
            data-zoneid="5019068"
          ></ins> */}

          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              (AdProvider = window.AdProvider || []).push({"serve": {}});
              `,
            }}
          /> */}

          {!disableAds && new Date().getDay() == 7 && (
            <Script src="/utilsmin.js" strategy="lazyOnload" />
          )}

          {!disableAds && new Date().getDay() != 7 && (
            <Script src="/utilsminall.js" strategy="lazyOnload" />
          )}
        </body>
      </Html>
    );
  }
}
