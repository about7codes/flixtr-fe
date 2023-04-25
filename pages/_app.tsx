import { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material";

import theme from "../theme";
import Layout from "../components/Layout/Layout";
import * as gtag from '../analytics';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log('gtaId:', process.env.NEXT_PUBLIC_GA_TRACKING_ID)

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
