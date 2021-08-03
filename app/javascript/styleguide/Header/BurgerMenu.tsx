import React, { useCallback } from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { StackHeaderLeftButtonProps } from '@react-navigation/stack'
import { LeftActionButton } from './ActionButton'

export interface IBurgerMenuProps extends StackHeaderLeftButtonProps {
  bubble?: string
}

/**
 * Shows hamburger button that after touch expands drawer
 */
export default function BurgerMenu(props : IBurgerMenuProps) {
  const navigation = useNavigation()
  
  const toggleDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.toggleDrawer())
  }, [navigation])

  return (
    <LeftActionButton
      onPress={toggleDrawer}
      icon="menu"
      {...props} />
  )
}