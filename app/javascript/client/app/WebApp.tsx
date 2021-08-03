import React from 'react'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import Portal from '@burstware/react-native-portal'
import { StoreProvider } from '@detox/store'
import Scrollbar from '@detox/styleguide/ui/Scrollbar'
import { GlobalReaderStyle } from '@detox/styleguide/Reader/style'
import OS from '@detox/shared/os'
import { createGlobalStyle } from 'styled-components'

import AppThemeProvider from './ThemeProvider'
import BootApp from './BootApp'
import PageActivity from './PageActivity'
import Notifications from './Notifications'
import ConfirmDialog from './ConfirmDialog'
import InputDialog from './InputDialog'
import ProgressDialog from './ProgressDialog'
import OptionDialog from './OptionDialog'
import { useStore } from '../app/helpers/useStore'
import ObserveStories from './ObserveStories'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning style={{ flex: 1, display: 'flex' }}>
      {OS === 'server' ? null : children}
    </div>
  )
}

export interface IWebAppProps {
  children : any
  initialMobxProps : any
  initialCookiesProps: any
}

const BasicStyles = createGlobalStyle`
  /** hide media video to allow background playback */
  body > .detox-media-video {
    position: absolute;
    left: -999999999px;
    top: -999999999px;
  }
`

export default function WebApp({ children, initialCookiesProps, initialMobxProps } : IWebAppProps) {
  const store = useStore(initialMobxProps, initialCookiesProps)

  return (
    <SafeHydrate>
      <StoreProvider store={store}>
        <AppThemeProvider>
          <PageActivity />
          <BasicStyles />
          <BootApp>
            <Scrollbar />
            <ActionSheetProvider>
              <Portal.Host>
                {children}
                <ObserveStories />
                <Notifications />
                <ConfirmDialog />
                <InputDialog />
                <ProgressDialog />
                <OptionDialog />
                <GlobalReaderStyle />
              </Portal.Host>
            </ActionSheetProvider>
          </BootApp>
        </AppThemeProvider>
      </StoreProvider>
    </SafeHydrate>
  )
}