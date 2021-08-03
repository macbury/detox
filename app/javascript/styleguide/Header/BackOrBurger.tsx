import React from 'react'
import { useNavigation } from '@react-navigation/native'
import BackButton from './BackButton'
import Burger from './BurgerMenu'

export default function BackOrBurger(props) {
  const navigation = useNavigation()

  if (navigation.canGoBack()) {
    return <BackButton />
  } else {
    return <Burger />
  }
}