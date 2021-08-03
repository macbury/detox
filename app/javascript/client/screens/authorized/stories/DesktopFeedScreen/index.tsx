import React, { useCallback, useEffect } from 'react'
import FeedActions from '@detox/styleguide/Feed/Actions'
import FeedItem from '@detox/store/models/FeedItem'
import { useRoute } from '@react-navigation/native'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'
import { useStoreData } from '@detox/store'
import FeedStore from '@detox/store/screens/Stories/FeedStore'
import { useTheme } from 'styled-components/native'
import { archiveDesktopStoryPath, channelPath, favoriteDesktopStoryPath, storyPath, unreadDesktopStoryPath, useNavigate } from '@detox/shared'
import Navbar from '@detox/styleguide/ui/Navbar'

import BurgerMenuWithUnreadCount from '../../../../app/BurgerMenuWithUnreadCount'
import FeedWithReader from '../../../../app/FeedWithReader'
import useParamsStoryId from '../../../../app/FeedWithReader/useParamsStoryId'
import renderHeaderTitle from '../renderHeaderTitle'
import useReaderTitle from './useReaderTitle'

type ScreenName = 'UnreadStories' | 'RecentlyReadStories' | 'FavoriteStories'

function useFeedStore(screenName : ScreenName) {
  return useStoreData(({ screens: { stories: { unreadFeed, archiveFeed, favoriteFeed } } }) => {
    switch(screenName) {
      case 'UnreadStories':
        return unreadFeed
      case 'RecentlyReadStories':
        return archiveFeed
      case 'FavoriteStories':
        return favoriteFeed
      default:
        throw `Unsupported screen: ${screenName}`
    }
  })
}

function useStoriesFeedFeed(feed: FeedStore) {
  return useStoreData(({ screens: { stories: { unreadStoryCountText, sync, markAsRead, markAsUnRead } } }) => {
    return {
      setOptions: feed.setOptions,
      refresh: feed.refresh,
      nextPage: feed.nextPage,
      markReadTo: feed.markReadTo,
      snooze: feed.snooze,
      markAllAsRead: feed.markAllAsRead,
      sync,
      markAsRead,
      markAsUnRead,
  
      hasNextPage: feed.hasNextPage,
      items: feed.all,
      isLoading: feed.isLoading,
      unreadCount: unreadStoryCountText,
      totalCount: feed.totalStoriesCount,
      newStoriesCount: feed.newStoriesCount,
      showNewItems: feed.showNewItems
    }
  })
}

function RightNavigation() {
  const { name } = useRoute() as any
  const feed = useFeedStore(name)
  const {
    isLoading,
    sync,
    refresh,
    markAllAsRead
  } = useStoriesFeedFeed(feed)

  return (
    <FeedActions
      loading={isLoading}
      compact={true}
      sync={sync} 
      refresh={refresh}
      markAllAsRead={markAllAsRead} />
  )
}

export default function DesktopFeedScreen() {
  const { params, name } = useRoute() as any
  const feed = useFeedStore(name)
  const { device } = useTheme()

  useModalNavBar()

  const {
    isLoading,
    items,
    unreadCount,
    newStoriesCount,
    refresh,
    setOptions,
    sync,
    showNewItems,
    markAllAsRead,
    ...rest
  } = useStoriesFeedFeed(feed)

  const mobile = device === 'mobile'
  const navigation = useNavigate()
  
  const kind = params?.kind
  const {
    feedList,
    storyId,
    haveStory,
    handleScroll
  } = useParamsStoryId(items)

  useReaderTitle()

  const closeStory = useCallback(() => {
    navigation.setParams({ storyId: '' })
  }, [navigation])
  
  useEffect(() => {
    if (kind) {
      setOptions({ kind })
    }
  }, [name, kind, navigation, setOptions])

  const showChannel = useCallback((channelId) => {
    navigation.navigate(channelPath(channelId))
  }, [navigation])

  const getLinkForStory = useCallback((story : FeedItem) => {
    const screenName : ScreenName = name

    if (mobile) {
      return storyPath(story)
    } else {
      switch (screenName) {
        case 'UnreadStories':
          return unreadDesktopStoryPath(story, kind)
        case 'RecentlyReadStories':
          return archiveDesktopStoryPath(story, kind)
        case 'FavoriteStories':
          return favoriteDesktopStoryPath(story, kind)
        default:
          throw `Unsupported screen: ${screenName}`
      }
    }
  }, [name, kind])

  return (
    <React.Fragment>
      <FeedWithReader
        ref={feedList}
        closeStory={closeStory}
        storyId={storyId}
        haveStory={haveStory}
        header={{
          headerTitle: (props) => renderHeaderTitle(props, !haveStory),
          headerRight: (props) => <RightNavigation {...props} />
        }}
        newStoriesCount={newStoriesCount}
        items={items}
        unreadCount={unreadCount}
        isLoading={isLoading}
        onScrollChange={handleScroll}
        onShowChannel={showChannel}
        getLinkForStory={getLinkForStory}
        onGoToNewStories={showNewItems}
        refresh={refresh}
        {...rest} />
      <Navbar />
    </React.Fragment>
  )
}

DesktopFeedScreen.getScreenOptions = (mobile: boolean) => {
  if (mobile) {
    return {
      headerLeft: (props) => <BurgerMenuWithUnreadCount {...props} />,
      headerTitle: (props) => renderHeaderTitle(props, false),
      headerRight: (props) => <RightNavigation />,
      headerShown: true
    }
  } else {
    return {
      headerShown: false,
      title: 'Loading...'
    }
  }
}