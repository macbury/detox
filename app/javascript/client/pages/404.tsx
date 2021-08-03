import InformationContent from '@detox/styleguide/ui/InformationContent'
import React from 'react'
import WebApp from '../app/WebApp'

//TODO: 404 page should be more light...
export default function NotFound(pageProps) {
  return (
    <WebApp {...pageProps}>
      <InformationContent
        message="http_not_found"
        icon="compass-off-outline" />
    </WebApp>
  )
}