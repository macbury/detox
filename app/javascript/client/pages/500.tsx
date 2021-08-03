import React from 'react'
import InformationContent from '@detox/styleguide/ui/InformationContent'
import WebApp from '../app/WebApp'

//TODO: 500 page should be more light...
export default function NotFound(pageProps) {
  return (
    <WebApp {...pageProps}>
      <InformationContent
        message="server_error"
        icon="fire" />
    </WebApp>
  )
}