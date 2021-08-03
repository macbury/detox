import React, { useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { useStoreData } from '@detox/store'
import FeedActions from '@detox/styleguide/Feed/Actions'
import renderHeaderTitle from './renderHeaderTitle'

import BurgerMenuWithUnreadCount from '../../../app/BurgerMenuWithUnreadCount'
import MobileFeed from './MobileFeed'

function useArticlesFeed(screenName : string) {
  return useStoreData(({ screens: { stories: { unreadCount, unreadFeed, archiveFeed, sync, markAsRead, markAsUnRead } } }) => {
    const feed = screenName === 'UnreadStories' ? unreadFeed : archiveFeed
    return {
      setOptions: feed.setOptions,
      refresh: feed.refresh,
      nextPage: feed.nextPage,
      markReadTo: feed.markReadTo,
      markAllAsRead: feed.markAllAsRead,
      snooze: feed.snooze,
      markAsRead,
      markAsUnRead,
      sync,
      hasNextPage: feed.hasNextPage,
      items: feed.all,
      isLoading: feed.isLoading,
      unreadCount,
      totalCount: feed.totalStoriesCount
    }
  })
}

function RightNavigation() {
  const { name } = useRoute() as any
  const {
    isLoading,
    sync,
    refresh,
    markAllAsRead
  } = useArticlesFeed(name)

  return (
    <FeedActions
      loading={isLoading}
      compact={true}
      sync={sync} 
      refresh={refresh}
      markAllAsRead={markAllAsRead} />
  )
}

export default function StoriesScreen({ navigation } : StackScreenProps<any, any>) {
  const { params, name } = useRoute() as any
  const isFocused = useIsFocused()
  const kind = params?.kind
  const {
    setOptions,
    ...mobileFeedProps
  } = useArticlesFeed(name)

  useEffect(() => {
    if (isFocused) {
      setOptions({ kind })
    }
  }, [kind, name, setOptions, isFocused])
  
  return <MobileFeed {...mobileFeedProps} />
}

StoriesScreen.getScreenOptions = () => ({
  headerLeft: (props) => <BurgerMenuWithUnreadCount {...props} />,
  headerTitle: (props) => renderHeaderTitle(props, false),
  headerRight: (props) => <RightNavigation />,
  headerShown: true
})