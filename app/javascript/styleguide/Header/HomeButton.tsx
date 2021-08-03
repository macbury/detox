import React, { useCallback } from 'react'
import { homePath, useNavigate } from '@detox/shared'
import ActionButton, { IActionButtonProps } from './ActionButton'

export interface IHomeButtonProps {
  color?: string
}

export default function HomeButton(props : IHomeButtonProps) {
  const navigation = useNavigate()

  const goHome = useCallback(() => {
    navigation.navigate(homePath())
  }, [navigation])

  return (
    <ActionButton onPress={goHome} icon="home" {...props} />
  )
}