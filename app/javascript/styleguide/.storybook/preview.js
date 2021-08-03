import React, { useEffect } from 'react'
import { View } from 'react-native'
import i18n from 'i18next'
import { RouterContext } from 'next-server/dist/lib/router-context'
import Router from 'next/router';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { I18nextProvider } from 'react-i18next'
import Portal from '@burstware/react-native-portal'
import initI18n from '@detox/api/i18n'
import Scrollbars from '../ui/Scrollbar'
import { BaseStyle } from '../theme/style'
import AppThemeProvider from '../theme'
import { dark, light } from '../theme/variants';
import { NavigationContext, NavigationRouteContext } from '@react-navigation/core';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

function withRouter(Story) {
  return (
    <RouterContext.Provider value={Router}>
      <Story />
    </RouterContext.Provider>
  )
}

function withNavigation(Story) {
  const navigation = {
    isFocused: () => true,
    addListener: () => (() => null),
    dangerouslyGetState: () => ({ routes: [{ key: 'exampleKey' }], type: 'tab' }),
    canGoBack: () => null
  }

  const route = {
    key: 'exampleKey'
  }

  return (
    <NavigationContext.Provider value={navigation}>
      <NavigationRouteContext.Provider value={route}>
        <Story />
      </NavigationRouteContext.Provider>
    </NavigationContext.Provider>
  )
}

function withPortal(Story) {
  return (
    <Portal.Host>
      <Story/>
    </Portal.Host>
  )
}

function withI18n(Story, context) {
  const locale = context.globals.theme
  initI18n()

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <React.Fragment key={locale}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </React.Fragment>
  )
}

function withThemeProvider(Story, context) {
  const theme = context.globals.theme === 'light' ? light : dark

  return (
    <SafeAreaProvider>
      <AppThemeProvider theme={theme} device={context.globals.device}>
        <BaseStyle />
        <Scrollbars />
        <View style={{ flex: 1, backgroundColor: theme.colors.background, minHeight: '480px' }}>
          <Story />
        </View>
      </AppThemeProvider>
    </SafeAreaProvider>
  )
}

export const decorators = [
  withPortal,
  withThemeProvider,
  withI18n,
  withNavigation,
  withRouter
];

export const globalTypes = {
  device: {
    name: 'Device',
    description: 'Theme device',
    defaultValue: 'desktop',
    toolbar: {
      icon: 'mobile',
      items: ['mobile', 'desktop'],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
  locale: {
    name: 'Locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: ['en', 'pl'],
    },
  }
};