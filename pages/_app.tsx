import React, { Fragment, useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline } from "@material-ui/core";

import { AppThemeProvider } from "../context";

import { LicenseInfo } from "@mui/x-data-grid-pro";

import createCache from "@emotion/cache";

LicenseInfo.setLicenseKey("");

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>MUI UPGRADE ISSUE</title>
      </Head>

      <AppThemeProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </AppThemeProvider>
    </Fragment>
  );
}

export default MyApp;

export function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
