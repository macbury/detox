import React, { useCallback } from 'react'
import { useNavigate } from '@detox/shared'
import Touchable from '../form/Touchable'
import { ILinkProps } from './types'

export default function Link({ to, onPress, children, ...props } : ILinkProps) {
  const navigation = useNavigate()

  const navigateToLink = useCallback(() => to && navigation.navigate(to), [navigation, to])

  return (
    <Touchable onPress={onPress || navigateToLink} {...props}>
      {children}
    </Touchable>
  )
}