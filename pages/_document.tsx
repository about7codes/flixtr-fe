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

          <script
            type="text/javascript"
            data-cfasync="false"
            dangerouslySetInnerHTML={{
              __html: `
      (function(){var w=window,f="d90f92c639eb9d862f40bf5856c17060",z=[["siteId",829+396-409+5195756],["minBid",0],["popundersPerIP","0"],["delayBetween",12],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],k=["d3d3LmFudGlhZGJsb2Nrc3lzdGVtcy5jb20vYnN1cnZleS5rby5taW4uY3Nz","ZDNjb2Q4MHRobjdxbmQuY2xvdWRmcm9udC5uZXQvZkROVEgvY2NhbnZhcy1uZXN0Lmpz"],d=-1,p,n,v=function(){clearTimeout(n);d++;if(k[d]&&!(1772188249000<(new Date).getTime()&&1<d)){p=w.document.createElement("script");p.type="text/javascript";p.async=!0;var u=w.document.getElementsByTagName("script")[0];p.src="https://"+atob(k[d]);p.crossOrigin="anonymous";p.onerror=v;p.onload=function(){clearTimeout(n);w[f.slice(0,16)+f.slice(0,16)]||v()};n=setTimeout(v,5E3);u.parentNode.insertBefore(p,u)}};if(!w[f]){try{Object.freeze(w[f]=z)}catch(e){}v()}})();
    `,
            }}
          ></script>
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

          {!disableAds && (
            <></>
            // <Script src="/utilsminall.js" strategy="lazyOnload" />
          )}
        </body>
      </Html>
    );
  }
}
