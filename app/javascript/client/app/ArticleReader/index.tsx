import React from 'react'
import styled from 'styled-components/native'
import WebView from '@detox/styleguide/WebView'
import { IArticleReaderProps } from './types'

const HtmlWebView = styled(WebView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.articleBackground};
`

export default function ArticleReader({ articleUrl, onScroll } : IArticleReaderProps) {
  return <HtmlWebView onScroll={onScroll} src={articleUrl}  />
}