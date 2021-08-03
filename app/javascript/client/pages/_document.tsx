import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { Html, Head, Main, NextScript } from 'next/document'
import Document, { getInitialProps } from '@expo/next-adapter/document'
import { BaseStyle } from '@detox/styleguide/theme'

import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { BookerlyFontUrl } from '@detox/styleguide/Reader/Fonts'

React.useLayoutEffect = React.useEffect // Fix mobx issue and libs
// this is rendered on backend
class DetoxDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="preload" href={Ionicons.font.ionicons} as="font" type="font/ttf" crossOrigin="anonymous" />
          <link rel="preload" href={MaterialIcons.font.material} type="font/ttf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href={MaterialCommunityIcons.font['material-community']} type="font/ttf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href={BookerlyFontUrl} as="font" type="font/ttf" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

DetoxDocument.getInitialProps = async (props : any) => {
  const sheet = new ServerStyleSheet()
  const originalRenderPage = props.renderPage

  try {
    props.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      })

    const initialProps = await getInitialProps(props);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
          <BaseStyle />
        </>
      )
    }
  } finally {
    sheet.seal()
  }
};

export default DetoxDocument;