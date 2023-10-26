import React from 'react';

import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

import { Portal } from '~/types/portalsTypes';
import { GoogleTagManagerComponent } from '~/components/GoogleTagManager/GoogleTagManagerComponent';
import { GoogleTagManagerNoscriptComponent } from '~/components/GoogleTagManagerNoscript/GoogleTagManagerNoscriptComponent';

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component
      });

    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <GoogleTagManagerComponent />
        </Head>

        <body>
          <GoogleTagManagerNoscriptComponent />

          <Main />
          <NextScript />
        </body>

        <aside id={Portal.MODAL} />
        <aside id={Portal.TOOLTIP} />
      </Html>
    );
  }
}

export default AppDocument;
