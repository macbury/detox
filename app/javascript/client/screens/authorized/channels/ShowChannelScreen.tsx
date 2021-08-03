import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useIsFocused } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { useNavigate, editChannelPath, channelsPath, channelPath, storyPath } from '@detox/shared'
import { useStoreData } from '@detox/store'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'

import Feed from '@detox/styleguide/Feed'
import FeedActions from '@detox/styleguide/Feed/Actions'
import Fab from '@detox/styleguide/form/Fab'
import NotFoundOrLoading from '@detox/styleguide/ui/NotFoundOrLoading'
import Navbar from '@detox/styleguide/ui/Navbar'
import BackButton from '@detox/styleguide/Header/BackButton'
import { DefaultTheme } from 'styled-components/native'

function useShowStore() {
  return useStoreData(({ screens: { showChannel, stories: { unreadStoryCountText, markAsRead, markAsUnRead, sync } } }) => ({
    channel: showChannel.channel,
    items: showChannel.feed.all,
    isLoading: showChannel.feed.isLoading || showChannel.isLoading,
    hasNextPage: showChannel.feed.hasNextPage,
    unreadCount: unreadStoryCountText,

    load: showChannel.load,
    clear: showChannel.clear,
    markReadTo: showChannel.feed.markReadTo,
    nextPage: showChannel.feed.nextPage,
    refresh: showChannel.feed.refresh,
    markAllAsRead: showChannel.feed.markAllAsRead,
    snooze: showChannel.feed.snooze,
    stopWaitForStories: showChannel.stopWaitForStories,
    sync,
    markAsRead,
    markAsUnRead
  }))
}

export default function ShowChannelScreen({ route } : StackScreenProps<any, any>) {
  const navigation = useNavigate()
  const { t } = useTranslation()
  const { channelId } = route.params
  const isFocused = useIsFocused()
  const {
    channel,
    isLoading,
    load,
    clear,
    refresh,
    sync,
    markAllAsRead,
    stopWaitForStories,
    ...feedProps
  } = useShowStore()

  useModalNavBar()

  useEffect(() => {
    if (isFocused) {
      console.log('load channelId', channelId)
      load(channelId)
      //TODO: start auto refresh if feed is empty
    } else {
      stopWaitForStories()
    }
  }, [isFocused, channelId, load, clear, stopWaitForStories])

  useEffect(() => {
    if (channel) {
      navigation.setOptions({
        title: channel.name,
        headerRight: () => (<FeedActions sync={sync} refresh={() => void refresh()} markAllAsRead={markAllAsRead} loading={isLoading} />),
      })
    } else {
      navigation.setOptions({
        title: t('screens.home.show_channel.title'),
        headerRight: null,
      })
    }
  }, [channel, isLoading])

  if (channel === null && !isLoading) {
    return <NotFoundOrLoading />
  }

  return (
    <React.Fragment>
      <Feed
        onShowChannel={(channelId) => navigation.navigate(channelPath(channelId))}
        getLinkForStory={storyPath}
        isLoading={isLoading}
        refresh={refresh}
        {...feedProps} />
      <Fab
        icon="cog-sync"
        onPress={() => navigation.navigate(editChannelPath(channelId))} />
      <Navbar />
    </React.Fragment>
  )
}

ShowChannelScreen.getScreenOptions = (t, theme : DefaultTheme) => ({
  headerShown: true,
  title: t('screens.home.show_channel.title'),
  headerLeft: (props) => <BackButton goBackFallback={channelsPath()} {...props} />,
  cardStyle: { backgroundColor: theme.colors.background },
})
