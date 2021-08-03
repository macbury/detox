import React, { useCallback } from 'react'
import { useStoreData } from '@detox/store'
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import MobileDrawerContent from '@detox/styleguide/Drawer/MobileDrawerContent'
import GroupOptions from './GroupOptions'

function useSidebar() {
  return useStoreData(({ sessions, settings, screens: { stories, groups } }) => ({
    instanceUrl: sessions.currentInstanceUrl,
    username: settings.user?.username,
    unreadStoryCount: stories.unreadStoryCountText,

    logout: sessions.signOut
  }))
}

export default function MobileDrawer(props : DrawerContentComponentProps<DrawerContentOptions>) {
  const {
    instanceUrl,
    username,
    unreadStoryCount,
    logout
  } = useSidebar()

  return (
    <MobileDrawerContent 
      instanceUrl={instanceUrl}
      username={username}
      unreadStoryCount={unreadStoryCount}
      onLogout={logout}
      {...props}>
      <GroupOptions collapsed={false} />
    </MobileDrawerContent>
  )
}