import React, { useMemo } from 'react'
import { ThemeProvider } from 'styled-components'
import { useTheme } from 'styled-components/native'
import parse, { HTMLReactParserOptions } from 'html-react-parser'
import dayjs, { PUBLISHED_AT_FORMAT } from '@detox/shared/dayjs'
import { ArticleContent, Container, GlobalReaderStyle, InnerContainer, Title } from './style'
import Image from './Image'

export interface IReaderProps {
  title: string
  url: string
  publishedAt: string | any
  channelName: string
  content: string
  poster?: any
}

/**
 * Show article content
 * @param props 
 */
export default function Reader(props : IReaderProps) {
  const theme = useTheme()
  const {
    title,
    url,
    poster,
    publishedAt,
    channelName,
    content
  } = props

  const date = useMemo(() => dayjs(publishedAt).format(PUBLISHED_AT_FORMAT), [publishedAt])

  const options: HTMLReactParserOptions = {
    replace: (node : any) => {
      if (node.tagName === "img" && node.attribs['data-detox']) {
        const {
          alt,
          src,
        } = node.attribs

        const props = JSON.parse(node.attribs['data-detox'])

        return (
          <div className="image-preview">
            <Image alt={alt} {...props} src={src} />
          </div>
        )
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <InnerContainer>
          <GlobalReaderStyle />
          <Title>
            <a href={url} target="_blank">{title}</a>
          </Title>
          <small>{date} / {channelName}</small>
          <ArticleContent>
            {poster && <div className="image-preview"><Image {...poster as any} src={poster.url} /></div>}
            {parse(content, options)}
          </ArticleContent>
        </InnerContainer>
      </Container>
    </ThemeProvider>
  )
}