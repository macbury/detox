import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { TUrlProps, useNavigate } from '@detox/shared'
import ActionButton from './ActionButton'
import HomeButton from './HomeButton'
import OS from '@detox/shared/os'

const LeftButtonsContainer = styled.View`
  margin-right: 10px;
  margin-left: 10px;
  flex-direction: row;
`

const Back = styled(ActionButton)`
  margin: 0px;
`

const Home = styled(HomeButton)`
  margin: 0px;
`


export interface IBackButtonProps {
  goBackFallback?: TUrlProps
  color?: string
}

/**
 * Shows hamburger button that after touch expands drawer
 */
export default function BackButton({ goBackFallback, color } : IBackButtonProps) {
  const navigation = useNavigate()

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate(goBackFallback)
    }
  }, [navigation, goBackFallback])

  return (
    <LeftButtonsContainer>
      <Back color={color} onPress={goBack} icon="arrow-left" />
      {OS === 'web' && <Home color={color} />}
    </LeftButtonsContainer>
  )
}