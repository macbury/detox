import React from 'react'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
import Feed, { IFeedProps } from '@detox/styleguide/Feed'
import Header, { IHeaderProps } from '@detox/styleguide/Header'
import ArticleColumn from './ArticleColumn'

const TwoColumnUI = styled.View`
  flex: 1;
  flex-direction: row;
`

interface IFeedColumnProps {
  theme: DefaultTheme
  haveStory: boolean
}

const FeedColumn = styled.View`
  width: ${({ haveStory } : IFeedColumnProps) => haveStory ? '480px' : '100%'};
  border-left-width: ${({ haveStory } : IFeedColumnProps) => haveStory ? '1px' : '0px'};
  border-left-color: ${({ theme }) => theme.colors.border};
`

const ContentColumn = styled.View`
  flex: 1;
  display: ${({ haveStory } : IFeedColumnProps) => haveStory ? 'flex' : 'none'};
`

export interface IFeedWithReaderProps extends IFeedProps {
  header: IHeaderProps
  isLoading: boolean
  haveStory: boolean
  storyId: string
  closeStory()
}

export default React.forwardRef(function FeedWithReader(props : IFeedWithReaderProps, forwardedRef : any) {
  const theme = useTheme()
  const {
    header,
    unreadCount,
    isLoading,
    haveStory,
    storyId,
    closeStory,
    ...rest
  } = props

  const mobile = theme.device === 'mobile'

  const feed = (
    <Feed
      compact={haveStory && !mobile}
      ref={forwardedRef}
      unreadCount={unreadCount}
      isLoading={isLoading}
      {...rest} />
  )

  if (mobile) {
    return feed
  }

  return (
    <TwoColumnUI>
      <ContentColumn haveStory={haveStory}>
        <ArticleColumn onClosePress={closeStory} storyId={storyId} />
      </ContentColumn>
      <FeedColumn haveStory={haveStory}>
        <Header {...header} />
        {feed}
      </FeedColumn>
    </TwoColumnUI>
  )
})