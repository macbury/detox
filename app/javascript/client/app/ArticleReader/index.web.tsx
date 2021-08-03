import React from 'react'
import styled from 'styled-components/native'
import Reader from '@detox/styleguide/Reader'
import { IArticleReaderProps } from './types'

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background: ${({ theme }) => theme.colors.articleBackground};
`

export default function ArticleReader({ story, poster, article, onScroll, ...props } : IArticleReaderProps) {
  return (
    <ScrollContainer {...props} onScroll={(e) => onScroll && onScroll(e.nativeEvent.contentOffset.y)}>
      <Reader
        poster={poster}
        title={story.title}
        content={article.body}
        publishedAt={story.publishedAt}
        url={story.permalink}
        channelName={story.channel.name} />
    </ScrollContainer>
  )
}