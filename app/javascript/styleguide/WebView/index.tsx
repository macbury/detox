import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { IWebViewProps } from './types'

export default function WebView({ html, onScroll, src, ...props } : IWebViewProps) {
  const iframeRef = useRef<HTMLIFrameElement>()

  useLayoutEffect(() => {
    if (iframeRef.current && html) {
      const {
        contentDocument,
      } = iframeRef.current

      contentDocument.open()
      contentDocument.write(html)
      contentDocument.close()
    }
  }, [html, iframeRef])

  useEffect(() => {
    if (iframeRef.current) {
      const {
        contentWindow
      } = iframeRef.current

      const onIframeScrollCallback = (ev : Event) => {
        onScroll && onScroll(contentWindow.scrollY)
      }

      contentWindow.addEventListener('scroll', onIframeScrollCallback)
      return () => {
        contentWindow.removeEventListener('scroll', onIframeScrollCallback)
      }
    }
  }, [iframeRef.current, onScroll])

  return (
    <View {...props}>
      <iframe src={src} style={{ borderWidth: '0px', flex: 1 }} ref={iframeRef}></iframe>
    </View>
  )
}