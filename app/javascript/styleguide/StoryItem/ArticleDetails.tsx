import React from 'react'
import styled from 'styled-components/native'
import { TUrlProps } from '@detox/shared'
import FeedItem from '@detox/store/models/FeedItem'
import Text from '../form/Text'
import PosterImage from './PosterImage'
import StoryContent from './StoryContent'
import StoryLink from './StoryLink'


const CardArticle = styled.View`
  margin: 0px;
  overflow: hidden;
`

const CardArticleContent = styled.View`
  padding: 18px;
  background: ${({ theme }) => theme.colors.inputBackground};
  display: flex;
  flex-direction: column;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.border};
  border-bottom-width: 1px;
  border-top-width: 1px;
`

const CardArticleTitle = styled(Text)`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 5px;
`

const CardArticlePermalink = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  opacity: 0.7;
`

export interface IArticleDetails {
  story: FeedItem
  width: number,
  articlePath: TUrlProps
}

export default function ArticleDetails(props : IArticleDetails) {
  const { articlePath, width, story: { title, domain, summary, article } } = props

  if (!article){
    return null
  }

  return (
    <StoryLink to={articlePath}>
      <StoryContent content={summary} />
      <CardArticle>
        <PosterImage
          width={width}
          poster={article.poster} />
        <CardArticleContent>
          <CardArticleTitle>{title}</CardArticleTitle>
          <CardArticlePermalink>{domain}</CardArticlePermalink>
        </CardArticleContent>
      </CardArticle>
    </StoryLink>
  )
}