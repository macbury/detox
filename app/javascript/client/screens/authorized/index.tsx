import React from 'react'
import { useTranslation } from 'react-i18next'
import OS from '@detox/shared/os'
import { useTheme } from 'styled-components/native'

import { RootStack } from './stacks'
import ShowArticleScreen from './stories/ShowArticleScreen'
import ShowChannelScreen from './channels/ShowChannelScreen'

import EditChannelScreen from './channels/EditChannelScreen'
import DrawerNavigation from './DrawerNavigation'
import BackgroundJobsScreen from './admin/BackgroundJobsScreen'
import ApiExplorerScreen from './admin/ApiExplorerScreen'
import PlayVideoScreen from './stories/PlayVideoScreen'
import ShowBackgroundJobScreen from './admin/ShowBackgroundJobScreen'
import NewGroupScreen from './groups/NewGroupScreen'
import EditGroupScreen from './groups/EditGroupScreen'
import PlayAudioScreen from './stories/PlayAudioScreen'

export default function AuthorizedUserNavigation() {
  const { t } = useTranslation()
  const theme = useTheme()
  const mobile = theme.device === 'mobile'

  return (
    <RootStack.Navigator
      initialRouteName="Home"
      mode="modal" 
      screenOptions={{
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        headerTitleContainerStyle: {
          left: OS === 'web' ? 120 : 72,
          right: 120
        }
      }}>
      <RootStack.Screen
        name="Home"
        options={DrawerNavigation.getScreenOptions()}
        component={DrawerNavigation} />
      <RootStack.Screen
        component={NewGroupScreen}
        name="NewGroup"
        options={NewGroupScreen.getScreenOptions(t, mobile, theme)} />
      <RootStack.Screen
        component={EditGroupScreen}
        name="EditGroup"
        options={EditGroupScreen.getScreenOptions(t, mobile, theme)}  />
      <RootStack.Screen
        options={ShowChannelScreen.getScreenOptions(t, theme)}
        component={ShowChannelScreen}
        name="ShowChannel"/>
      <RootStack.Screen
        component={EditChannelScreen}
        name="EditChannel"
        options={EditChannelScreen.getScreensOptions(t, theme)} />
      <RootStack.Screen
        component={PlayVideoScreen}
        name="PlayVideo"
        options={PlayVideoScreen.getScreenOptions(t)}  />
      <RootStack.Screen
        component={PlayAudioScreen}
        name="PlayAudio"
        options={PlayAudioScreen.getScreenOptions(t, theme)}  />
      <RootStack.Screen
        component={ShowArticleScreen}
        name="ShowArticle"
        options={ShowArticleScreen.getScreenOptions(t)}  />
      <RootStack.Screen
        component={ShowBackgroundJobScreen}
        name="ShowBackgroundJob"
        options={ShowBackgroundJobScreen.getScreenOptions(t, mobile, theme)}  />
      <RootStack.Screen
        component={BackgroundJobsScreen}
        name="BackgroundJobs"
        options={BackgroundJobsScreen.getScreenOptions(t, mobile, theme)}  />
      <RootStack.Screen
        component={ApiExplorerScreen}
        name="ApiExplorer"
        options={ApiExplorerScreen.getScreenOptions(t, mobile, theme)}  />
    </RootStack.Navigator>
  )
}