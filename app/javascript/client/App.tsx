import React, { useMemo } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import Portal from '@burstware/react-native-portal'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { RootStore, StoreProvider, DiskStorage, CookiesStorage } from '@detox/store'
import { LogBox } from 'react-native'
import { enableScreens } from 'react-native-screens';
import AppThemeProvider from './app/ThemeProvider'
import Translations from './app/Translations'
import Notifications from './app/Notifications'
import BootApp from './app/BootApp'
import UpdateRequired from './app/UpdateRequired'
import ConfirmDialog from './app/ConfirmDialog'
import ProgressDialog from './app/ProgressDialog'
import InputDialog from './app/InputDialog'
import OptionDialog from './app/OptionDialog'
import Screens from './screens'
import ObserveStories from './app/ObserveStories'

enableScreens()
LogBox.ignoreAllLogs(true)

SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn)

export default function App() {
  const store = useMemo(() => (new RootStore(new DiskStorage(), new CookiesStorage())), [])

  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <Translations>
          <AppThemeProvider>
            <BootApp>
              <Portal.Host>
                <ActionSheetProvider>
                  <UpdateRequired>
                    <Screens />
                    <ObserveStories />
                    <Notifications />
                    <ConfirmDialog />
                    <InputDialog />
                    <ProgressDialog />
                    <OptionDialog />
                  </UpdateRequired>
                </ActionSheetProvider>
              </Portal.Host>
            </BootApp>
          </AppThemeProvider>
        </Translations>
      </StoreProvider>
    </SafeAreaProvider>
  )

}
