import React, { useCallback } from 'react'
import styled from 'styled-components'
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import { ILinkProps } from './types'

const Touchable = styled.a`
  display: flex;
  &:active {
    opacity: 0.3;
  }
`

export default function Link({ to, onPress, title, children, prefetch = false, ...props } : ILinkProps) {
  const navigation = useNavigation()

  const navigateToLink = useCallback((e) => {
    if (
      !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && // ignore clicks with modifier keys
      (e.button == null || e.button === 0) // ignore everything but left clicks
    ) {
      e.preventDefault();
      if (to) {
        if (to?.native?.navigationBehavior === 'navigate') {
          navigation.navigate(to.routeName, to.params)
        } else {
          navigation.dispatch(StackActions.push(to.routeName, to.params))
        }
      }
    }
  }, [navigation, to])

  return (
    <Touchable onClick={onPress || navigateToLink} href={to?.web?.as} title={title}>
      {children}
    </Touchable>
  )
}