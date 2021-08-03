import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled, { DefaultTheme } from 'styled-components/native'
import { TUrlProps } from '@detox/shared'
import FeedItem from '@detox/store/models/FeedItem'
import Card from '../Card'
import CardHeader, { HeaderIcon, HeaderTitle, HeaderSubTitle, HeaderContent, HeaderAction } from '../Card/Header'
import { IStoryActionCallbacks } from './types'
import { usePublishedAtTime } from '../helpers/useTime'
import ArticleDetails from './ArticleDetails'
import VideoDetails from './VideoDetails'
import AudioDetails from './AudioDetails'
import Actions from './Actions'

export interface IContainerProps {
  theme?: DefaultTheme
  isRead?: boolean
}

export interface IStoryContainer {
  compact?: boolean
  theme?: DefaultTheme
}

const StoryItemContainer = styled(Card)`
  border-radius: ${({ compact } : IStoryContainer) => !compact ? '5px' : '0px'};
  margin-bottom: ${({ compact } : IStoryContainer) => !compact ? '25px' : '10px'};
  overflow: hidden;
  flex-direction: column;
`

const StoryTitle = styled(HeaderTitle)`
  color: ${({ theme, isRead } : IContainerProps) => isRead ? theme.colors.cardHeaderTitle : theme.colors.primary};
`

export interface IStoryItemProps extends IStoryActionCallbacks {
  story : FeedItem
  width: number
  compact?: boolean
  to: TUrlProps
  index?: number
  onOptionsMenuPress(story : FeedItem)
}

const StoryItem = observer(({ index, story, to, compact, width, onOptionsMenuPress, ...callbacks } : IStoryItemProps) => {
  const publishedAt = usePublishedAtTime(story.publishedAt)
  const onHeaderActionPress = useCallback(() => {
    onOptionsMenuPress(story)
  }, [story, onOptionsMenuPress])

  return (
    <StoryItemContainer shadow={2} compact={compact}>
      <CardHeader>
        <HeaderIcon channel={story?.channel} unread={!story?.isRead} />
        <HeaderContent>
          <StoryTitle isRead={story?.isRead}>{story?.channel?.name || '...'}</StoryTitle>
          <HeaderSubTitle>{publishedAt}</HeaderSubTitle>
        </HeaderContent>
        <HeaderAction onPress={onHeaderActionPress} name="dots-vertical" />
      </CardHeader>
      <ArticleDetails
        width={width}
        story={story}
        articlePath={to} />
      <VideoDetails
        story={story}
        width={width}
        videoPath={to} />
      <AudioDetails
        story={story}
        width={width}
        audioPath={to} />
      <Actions {...callbacks} story={story} />
    </StoryItemContainer>
  )
})

export default StoryItem