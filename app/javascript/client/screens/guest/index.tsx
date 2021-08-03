import React from 'react'
import { useTranslation } from 'react-i18next'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from './SignInScreen'

export const GuestStack = createStackNavigator()
/**
 * Stack with sign in screen as default one
 */
export default function GuestNavigation() {
  const { t } = useTranslation()

  return (
    <GuestStack.Navigator initialRouteName="SignIn">
      <GuestStack.Screen
        name="SignIn"
        options={{
          title: t('screens.guest.sign_in.title'),
          headerShown: false
        }}
        component={SignInScreen} />
    </GuestStack.Navigator>
  )
}