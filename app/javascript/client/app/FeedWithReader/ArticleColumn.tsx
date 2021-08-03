import React, { useEffect } from 'react'
import styled from 'styled-components/native'

import { useStoreData } from '@detox/store'

import LoadingContent from '@detox/styleguide/ui/LoadingContent'
import ActionButton from '@detox/styleguide/Header/ActionButton'
import ArticleActions from '../../screens/authorized/stories/ArticleActions'
import ArticleReader from '../ArticleReader'

const CloseButton = styled(ActionButton)`
  position: absolute;
  top: 15px;
  left: 10px;
`

const Actions = styled(ArticleActions)`
  position: absolute;
  top: 15px;
  right: 10px;
`

const ReaderContainer = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.articleBackground};
`

export interface IArticleColumnProps {
  storyId: string | number
  onClosePress()
}

function useArticle() {
  return useStoreData(({ screens: { stories: { viewArticle } } }) => ({
    loading: viewArticle.isLoading,
    article: viewArticle.article,
    story: viewArticle.story,
    poster: viewArticle.poster,
    articleUrl: viewArticle.articleUrl,

    fetchArticle: viewArticle.fetch,
    clear: viewArticle.clear
  }))
}

export default function ArticleColumn({ storyId, onClosePress } : IArticleColumnProps) {
  const {
    loading,
    story,
    article,
    poster,
    articleUrl,
    fetchArticle,
    clear
  } = useArticle()

  useEffect(() => {
    if (storyId) {
      fetchArticle(storyId, true)
    } else {
      clear()
    }
  }, [storyId])

  if (loading) {
    return (
      <ReaderContainer>
        <LoadingContent />
      </ReaderContainer>
    )
  }

  if (!story) {
    return null
  }

  return (
    <ReaderContainer>
      <ArticleReader
        poster={poster}
        story={story}
        article={article}
        articleUrl={articleUrl} />
      <CloseButton onPress={onClosePress} icon="close" />
      <Actions />
    </ReaderContainer>
  )
}