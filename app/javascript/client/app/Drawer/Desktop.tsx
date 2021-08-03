import React from 'react'
import { useRoute } from '@react-navigation/native'
import { useStoreData } from '@detox/store'
import {
  DrawerContentComponentProps,
  DrawerContentOptions
} from '@react-navigation/drawer'
import DesktopDrawerContent from '@detox/styleguide/Drawer/DesktopDrawerContent'
export { DRAWER_COLLAPSED_WIDTH, DRAWER_EXPANDED_WIDTH } from '@detox/styleguide/Drawer/DesktopDrawerContent'

import GroupOptions from './GroupOptions'


function useSidebar() {
  return useStoreData(({ sessions, settings, screens: { stories, groups } }) => ({
    collapsed: settings.collapsed,
    groups: groups.items,
    unreadStoryCount: stories.unreadStoryCountText,
    toggleSidebar: settings.toggleSidebar,
    logout: sessions.signOut
  }))
}

export default function DesktopDrawer(props : DrawerContentComponentProps<DrawerContentOptions>) {
  const {
    collapsed,
    unreadStoryCount,
    toggleSidebar,
    logout
  } = useSidebar()

  return (
    <DesktopDrawerContent
      collapsed={collapsed}
      unreadStoriesCount={unreadStoryCount}
      onToggleSidebar={toggleSidebar}
      onLogout={logout}
      {...props}>
      <GroupOptions collapsed={collapsed} />
    </DesktopDrawerContent>
  )
}