import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components/native'
import { useIsAdmin } from '@detox/store/hooks/useLoggedIn'
import { useStoreData } from '@detox/store'
import { StoryKind } from '@detox/api'
import { SidebarContext } from '@detox/styleguide/ui/useSidebarWidth'
import MobileDrawerContent from '../../app/Drawer/Mobile'
import DesktopDrawerContent, { DRAWER_COLLAPSED_WIDTH, DRAWER_EXPANDED_WIDTH } from '../../app/Drawer/Desktop'
import ChannelScreen from './channels/ChannelsScreen'
import { Drawer } from './stacks'
import DesktopFeedScreen from './stories/DesktopFeedScreen'
import SettingsScreen from './admin/SettingsScreen'
import GroupsScreen from './groups/GroupsScreen'
import ShowGroupScreen from './groups/ShowGroupScreen'

function useDrawerInfo() {
  const { device } = useTheme()
  const { collapsed } =  useStoreData(({ settings }) => ({
    collapsed: settings.collapsed,
  }))

  if (device === 'mobile') {
    return {
      width: 0
    }
  } else {
    const width = (collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_EXPANDED_WIDTH)
    return {
      width,

      style: {
        width: width + 'px'
      }
    }
  }
}

/**
 * Drawer navigation with all screens accessible by signed in user
 * lazy is breaking navigation duh...
 */
export default function DrawerNavigation() {
  const { t } = useTranslation()
  const theme = useTheme()
  const mobile = theme.device !== 'desktop'
  const isAdmin = useIsAdmin()
  const drawerInfo = useDrawerInfo()

  const DrawerContent = mobile ? MobileDrawerContent : DesktopDrawerContent

  return (
    <SidebarContext.Provider value={drawerInfo.width}>
      <Drawer.Navigator
        drawerStyle={drawerInfo.style}
        drawerContent={(props) => (<DrawerContent {...props} />)}
        initialRouteName="UnreadStories"
        backBehavior="history"
        lazy={true}
        drawerType={mobile ? 'slide' : 'permanent'}
        statusBarAnimation="slide"
        openByDefault={false}>
        <Drawer.Screen
          name="UnreadStories"
          options={DesktopFeedScreen.getScreenOptions(mobile)}
          initialParams={{ kind: StoryKind.All }}
          component={DesktopFeedScreen} />
        <Drawer.Screen
          name="RecentlyReadStories"
          initialParams={{ kind: StoryKind.All }}
          options={DesktopFeedScreen.getScreenOptions(mobile)}
          component={DesktopFeedScreen} />
        <Drawer.Screen
          name="FavoriteStories"
          initialParams={{ kind: StoryKind.All }}
          options={DesktopFeedScreen.getScreenOptions(mobile)}
          component={DesktopFeedScreen} />
        <Drawer.Screen
          name="ListChannels"
          options={ChannelScreen.getScreenOptions(t, mobile)}
          component={ChannelScreen} />
        <Drawer.Screen
          component={SettingsScreen}
          name="Settings"
          options={SettingsScreen.getScreenOptions(t, mobile)} />
        <Drawer.Screen
          name="ListGroups"
          options={GroupsScreen.getScreenOptions(t, mobile)}
          component={GroupsScreen} />
        <Drawer.Screen
          name="ShowGroup"
          options={ShowGroupScreen.getScreenOptions(t, mobile)}
          component={ShowGroupScreen} />
      </Drawer.Navigator>
    </SidebarContext.Provider>
  )
}

DrawerNavigation.getScreenOptions = () => ({
  headerShown: false
})