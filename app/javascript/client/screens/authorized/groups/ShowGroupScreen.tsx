import React, { useEffect, useCallback, useMemo } from 'react'
import { useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { useStoreData } from '@detox/store'
import { useIsFocused } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import Navbar from '@detox/styleguide/ui/Navbar'
import FeedActions from '@detox/styleguide/Feed/Actions'
import { channelPath, groupStoryPath, storyPath, useNavigate } from '@detox/shared'
import FeedItem from '@detox/store/models/FeedItem'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'

import FeedWithReader from '../../../app/FeedWithReader'
import useParamsStoryId from '../../../app/FeedWithReader/useParamsStoryId'
import BurgerMenuWithUnreadCount from '../../../app/BurgerMenuWithUnreadCount'


function useGroup() {
  return useStoreData(({ screens: { groups: { show }, stories: { unreadStoryCountText, markAsRead, markAsUnRead, sync } } }) => ({
    loading: show.isLoading,
    group: show.group,
    items: show.feed.all,
    isLoading: show.feed.isLoading || show.isLoading,
    hasNextPage: show.feed.hasNextPage,
    unreadCount: unreadStoryCountText,

    setFocused: show.setFocused,
    setGroupId: show.setGroupId,
    clear: show.clear,
    markReadTo: show.feed.markReadTo,
    nextPage: show.feed.nextPage,
    refresh: show.feed.refresh,
    markAllAsRead: show.feed.markAllAsRead,
    snooze: show.feed.snooze,
    sync,
    markAsRead,
    markAsUnRead
  }))
}

function RightNavigation() {
  const { params } = useRoute<any>()
  const sid = params?.storyId ? params?.storyId : null
  const haveStory = !!sid
  
  const {
    isLoading,
    group,
    sync,
    refresh,
    markAllAsRead
  } = useGroup()

  return (
    <FeedActions
      loading={isLoading}
      compact={haveStory}
      group={group}
      sync={sync} 
      refresh={refresh}
      markAllAsRead={markAllAsRead} />
  )
}

export default function ShowGroupScreen({ route } : StackScreenProps<any, any>) {
  const { t } = useTranslation()
  const { device } = useTheme()
  const navigation = useNavigate()
  const isFocused = useIsFocused()
  const groupId = route?.params?.groupId
  const {
    loading,
    group,
    items,
    setGroupId,
    clear,
    setFocused,
    ...feedProps
  } = useGroup()

  useEffect(() => {
    if (groupId && isFocused) {
      setGroupId(groupId)
    }
    setFocused(isFocused)
  }, [setGroupId, groupId, isFocused])

  useModalNavBar()

  const header = useMemo(() => ({
    title: group?.name,
    headerRight: (props) => <RightNavigation {...props} />
  }), [group?.name])

  const closeStory = useCallback(() => {
    navigation.setParams({ storyId: '' })
  }, [navigation])

  const showChannel = useCallback((channelId) => {
    navigation.navigate(channelPath(channelId))
  }, [navigation])

  const mobile = device === 'mobile'

  const getLinkForStory = useCallback((story : FeedItem) => {
    return mobile ? storyPath(story) : groupStoryPath(groupId, story)
  }, [groupId, mobile])

  const {
    feedList,
    storyId,
    haveStory,
    handleScroll
  } = useParamsStoryId(items)

  useEffect(() => {
    if (group) {
      navigation.setOptions({
        title: group.name,
        headerRight: () => <RightNavigation />,
      })
    } else {
      navigation.setOptions({
        title: t('screens.show_group.title'),
        headerRight: null,
      })
    }
  }, [group, loading])

  return (
    <React.Fragment>
      <FeedWithReader
        ref={feedList}
        unreadCount={0}
        closeStory={closeStory}
        storyId={storyId}
        haveStory={haveStory}
        header={header}
        items={items}
        isLoading={loading}
        onScrollChange={handleScroll}
        onShowChannel={showChannel}
        getLinkForStory={getLinkForStory}
        {...feedProps} />
      <Navbar />
    </React.Fragment>
  )
}


ShowGroupScreen.getScreenOptions = ((t, mobile: boolean) => {
  if (mobile) {
    return {
      headerLeft: (props) => <BurgerMenuWithUnreadCount {...props} />,
      headerRight: (props) => <RightNavigation {...props} />,
      headerShown: true,
      title: t('screens.show_group.title')
    }
  } else {
    return {
      headerShown: false,
      title: t('screens.show_group.title'),
      headerLeft: (props) => mobile && <BurgerMenuWithUnreadCount {...props} />,
      headerRight: (props) => <RightNavigation {...props} />,      
    }
  }
})