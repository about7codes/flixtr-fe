import Document, { Html, Head, Main, NextScript } from "next/document";

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
            name="exoclick-site-verification"
            content="7282b61ce99ff60fa82adfd51862bc53"
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
            // history.scrollRestoration = 'manual';
            // eslint-disable-next-line react/no-danger
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
        </body>
      </Html>
    );
  }
}
