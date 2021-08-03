import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import { useLoggedIn } from '@detox/store'

import AuthorizedUserNavigation from './authorized'
import GuestNavigation from './guest'
import useLinking from './useLinking'

// This is going to behave differently depending if desktop or mobile
export default function Router() {
  const theme = useTheme()
  const {
    isLoggedIn,
    isLoading
  } = useLoggedIn()
  const linking = useLinking()

  const documentTitle = {
    formatter: (options, route) => `${options?.title} - Detox`,
  }


  return (
    <NavigationContainer
      theme={theme}
      linking={linking}
      documentTitle={documentTitle}>
      {isLoggedIn ? <AuthorizedUserNavigation /> : <GuestNavigation />}
    </NavigationContainer>
  );
}