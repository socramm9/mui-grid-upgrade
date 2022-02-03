import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { Children } from "react";
import { lightThemeV4 } from "../context";

let prefixer;
let cleanCSS;
if (process.env.NODE_ENV === "production") {
  /* eslint-disable global-require */
  const postcss = require("postcss");
  const autoprefixer = require("autoprefixer");
  const CleanCSS = require("clean-css");
  /* eslint-enable global-require */

  prefixer = postcss([autoprefixer]);
  cleanCSS = new CleanCSS();
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="theme-color"
            content={lightThemeV4.palette.primary.main}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  let css = sheets.toString();
  // It might be undefined, e.g. after an error.
  if (css && process.env.NODE_ENV === "production") {
    const result1 = await prefixer.process(css, { from: undefined });
    css = result1.css;
    css = cleanCSS.minify(css).styles;
  }

  return {
    ...initialProps,
    styles: [
      ...Children.toArray(initialProps.styles),
      <style
        id="jss-server-side"
        key="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: css }}
      />,
    ],
  };
};
