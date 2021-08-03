import React from 'react'
import { useTheme } from 'styled-components/native'
import { useStoreData } from '@detox/store'
import BurgerMenu, { IBurgerMenuProps } from '@detox/styleguide/Header/BurgerMenu'

function useUnreadCount() {
  const { device } = useTheme()
  const { unreadCount } = useStoreData(({ screens: { stories } }) => ({
    unreadCount: stories.unreadStoryCountText
  }))

  return device === 'mobile' ? unreadCount : null
}

export default function BurgerMenuWithUnreadCount(props : IBurgerMenuProps) {
  const bubbleContent = useUnreadCount()

  return <BurgerMenu bubble={bubbleContent} {...props} />
}