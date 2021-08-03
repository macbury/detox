import 'setimmediate'
import Head from 'next/head'
import React from 'react'
import { useStaticRendering } from 'mobx-react-lite'
import { AppInitialProps, AppProps } from 'next/app'
import OS from '@detox/shared/os'
import I18n from '../_i18n'

if (OS === "server") {
  (global as any).requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
  };
  useStaticRendering(true)
}

type TWebAppProps = AppInitialProps & AppProps

function DetoxWebApp({ Component, pageProps } : TWebAppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
      </Head>

      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default I18n.appWithTranslation(DetoxWebApp)