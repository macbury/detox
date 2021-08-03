import React from 'react';
import { DocumentContext } from 'next/document';
import { withSsrStore } from '@detox/store';
import WebApp from '../app/WebApp'
import Screens from '../screens'

export default function App(pageProps) {
  return (
    <WebApp {...pageProps}>
      <Screens />
    </WebApp>
  );
}

export async function getServerSideProps({ req } : DocumentContext) {
  return withSsrStore(req, async ({ channels }) => {
    await channels.refresh()
    return true
  }, { authRequired: true })
}
