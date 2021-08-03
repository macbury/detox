import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { FlatList, ScrollView, ViewToken } from 'react-native'
import FeedItem from '@detox/store/models/FeedItem'
import { useTheme } from 'styled-components/native'
import useDebounceCallback from '@detox/shared/useDebounceCallback'
import FeedLoadingFooter from '../ui/FeedLoadingFooter'
import CenteredScrollView from '../ui/CenteredScrollView'
import StoryItem from '../StoryItem'
import RefreshControl from './RefreshControl'
import useExternalBrowserUrl from '../hooks/useExternalBrowserUrl'
import EmptyContentOrLoading from './EmptyContentOrLoading'
import useStoryOptionsSheet from './useStoryOptionsSheet'
import { useIsFocused } from '../helpers/useIsFocused'

export interface IFeedProps {
  items: FeedItem[]
  hasNextPage: boolean
  isLoading: boolean
  unreadCount: string | number
  compact?: boolean
  newStoriesCount?: number

  onScrollChange?(height: number, y?: number)
  getLinkForStory?(story : FeedItem)
  onShowChannel?(channelId : string)
  snooze(storyId : string)
  markAsRead(storyId : string)
  markAsUnRead(storyId : string)
  markReadTo(toIndex : number)
  nextPage()
  refresh()
  onGoToNewStories?()
}

function extractKey({ id }) {
  return id
}

type TScrollState = {
  y: number
  goToNewStoriesAfterScrollingTop: boolean
}

export default React.forwardRef(function Feed(props : IFeedProps, forwardedRef : React.MutableRefObject<FlatList>) {
  const isFocused = useIsFocused()
  const scrollState = useRef<TScrollState>({ y: 0, goToNewStoriesAfterScrollingTop: false })
  const focused = useRef<boolean>(isFocused)

  const {
    isLoading,
    items,
    compact,
    newStoriesCount,
    hasNextPage,

    snooze,
    markAsRead,
    markAsUnRead,
    markReadTo,
    nextPage,
    refresh,
    getLinkForStory,
    onShowChannel,
    onScrollChange,
    onGoToNewStories
  } = props

  useEffect(() => {
    focused.current = isFocused
  }, [focused, isFocused])
  
  const openURL = useExternalBrowserUrl()
  const showStoryOptionsSheet = useStoryOptionsSheet({
    onShowChannel
  })

  const [containerWidth, setContainerWidth] = useState(0)// todo load from storage?
  const { device } = useTheme()

  const renderStoryItem = useCallback(({ item }) => {
    return (
      <StoryItem
        to={getLinkForStory(item)}
        width={containerWidth}
        story={item}
        compact={compact || device === 'mobile'}
        onSnoozeTouched={(story) => snooze(story.id)}
        onOpenOriginalTouched={(story) => {
          markAsRead(story.id)
          openURL(story.permalink)
        }}
        onMarkAsReadTouched={(story) => story.isRead ? markAsUnRead(story.id) : markAsRead(story.id)}
        onFavoriteTouched={item.toggleFavorite}
        onShowCommentsTouched={openURL}
        onOptionsMenuPress={showStoryOptionsSheet} />
    )
  }, [getLinkForStory, showStoryOptionsSheet, openURL, markAsUnRead, snooze, compact])

  const onHideMarkAsRead = useCallback(({ viewableItems } : { viewableItems: ViewToken[] }) => {
    const startIndex = viewableItems[0]?.index
    
    if (startIndex && focused.current) {
      markReadTo(startIndex)
    }
  }, [markReadTo, focused])

  const onContainerSizeChange = useCallback(({ nativeEvent: { layout: { width } } }) => {
    if (width > 0) {
      setContainerWidth(width)
    }
  }, [setContainerWidth])

  const renderScrollContainer = useCallback((props) => {
    const Scroll = compact ? ScrollView : CenteredScrollView
    return (
      <Scroll {...props} onLayout={onContainerSizeChange} />
    )
  }, [onContainerSizeChange, compact])

  const loadNextPage = useDebounceCallback(({ distanceFromEnd }) => {
    if (hasNextPage && focused.current) {
      nextPage()
    }
  }, [hasNextPage, nextPage, focused], 250)

  const renderListFooterComponent = useCallback(() => (<FeedLoadingFooter visible={hasNextPage && items.length > 0} />), [hasNextPage, items])
  const renderListEmptyComponent = useCallback(() => (<EmptyContentOrLoading loading={isLoading} />), [isLoading])
  const handleScroll = useCallback((event) => {
    const y = event.nativeEvent.contentOffset.y
    scrollState.current.y = y
    if (y === 0 && scrollState.current.goToNewStoriesAfterScrollingTop) {
      scrollState.current.goToNewStoriesAfterScrollingTop = false
      onGoToNewStories()
    }
    onScrollChange && onScrollChange(null, y)
  }, [hasNextPage, onGoToNewStories])

  const goToNewStories = useCallback(() => {
    forwardedRef.current.flashScrollIndicators()
    if (scrollState.current.y === 0) { // already on top, just show stories
      onGoToNewStories()
    } else { // scroll to top and then show stories
      scrollState.current.goToNewStoriesAfterScrollingTop = true
      forwardedRef.current.scrollToOffset({ animated: true, offset: 0 })
    }
  }, [forwardedRef, onGoToNewStories])

  return (
    <FlatList
      ref={forwardedRef}
      onContentSizeChange={(_w, h) => onScrollChange && onScrollChange(h)}
      scrollEventThrottle={50}
      ListEmptyComponent={renderListEmptyComponent}
      refreshControl={<RefreshControl newStoriesCount={newStoriesCount} onGoToNewStories={goToNewStories} refreshing={false} onRefresh={() => void refresh()} />}
      scrollsToTop={false}
      refreshing={false}
      keyExtractor={extractKey}
      data={items}
      ListFooterComponent={renderListFooterComponent}
      renderScrollComponent={renderScrollContainer}
      onViewableItemsChanged={onHideMarkAsRead}
      onScroll={handleScroll}
      extraData={[items?.length, isLoading, containerWidth, compact]}
      onEndReachedThreshold={0.1}
      onEndReached={loadNextPage}
      renderItem={renderStoryItem} />
  )
})
