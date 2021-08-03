import React, { Ref, useCallback } from 'react'
import { WebView, WebViewNavigation } from 'react-native-webview'
import useExternalBrowserUrl from '../hooks/useExternalBrowserUrl'
import { IWebViewProps } from './types'

const PREPARE_PAGE_SCRIPT = `
  // Cleanup local storage just in case
  localStorage.clear()
`

export default React.forwardRef(function NativeWebView({ html, onScroll, src, ...props } : IWebViewProps, forwardedRef : Ref<WebView>) {
  const openURL = useExternalBrowserUrl()
  const source : any = src ? { uri: src } : { html }

  const openLinkInNewWindow = useCallback((event : WebViewNavigation) => {
    openURL(event.url)
    return false
  }, [openURL])

  return (
    <WebView
      ref={forwardedRef}
      source={source}
      injectedJavaScriptBeforeContentLoaded={PREPARE_PAGE_SCRIPT}
      sharedCookiesEnabled={true}
      onShouldStartLoadWithRequest={openLinkInNewWindow}
      onScroll={(ev : any) => onScroll && onScroll(ev.nativeEvent.contentOffset.y)}
      {...props} />
  )
})