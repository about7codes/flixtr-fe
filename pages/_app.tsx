import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";

import { store } from "../redux/store";
import "../styles/globals.css";
import theme from "../theme";
import Layout from "../components/Layout/Layout";
import * as gtag from "../analytics";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 3,
            staleTime: 30000, // 30 seconds
          },
        },
      })
  );

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      console.log(hostname);

      // if (!hostname.endsWith(".net")) {
      //   const script = document.createElement("script");
      //   script.src = "/utilsminall.js";
      //   script.defer = true;
      //   document.body.appendChild(script);
      // }
      if (!hostname.endsWith(".net")) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.dataset.cfasync = "false";

        script.src = "/utilsminall.js";

        // Method 2: Alternative if you need to ensure loading order
        // script.async = false;
        script.defer = true;

        document.head.appendChild(script);
      }
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
