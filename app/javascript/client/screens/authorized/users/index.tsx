import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components/native'
import BurgerMenu from '@detox/styleguide/Header/BurgerMenu'
import EditProfileScreen from './EditProfileScreen'
import { UsersStack } from '../stacks'

export default function UsersNavigation() {
  const { t } = useTranslation()

  return (
    <UsersStack.Navigator initialRouteName="EditProfile">
      <UsersStack.Screen
        component={EditProfileScreen}
        name="EditProfile"
        options={{
          title: t('screens.home.edit_user.title'),
          headerLeft: (props) => <BurgerMenu {...props} />
        }} />
    </UsersStack.Navigator>
  )
}