import React, { useCallback, useEffect, useState } from 'react'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Keyboard, KeyboardEvent } from 'react-native'
import shadow from '../helpers/shadow'

interface IFabContainerProps {
  theme: DefaultTheme
  offsetY: number
}

const FabContainer = styled.View<IFabContainerProps>`
  position: absolute;
  bottom: ${({ theme, offsetY }) => (theme.device === 'desktop' ? 35 : 25) + theme.insets.bottom + offsetY}px;
  right: ${({ theme }) => theme.device === 'desktop' ? 35 : 25}px;
`

const ActivityIndicator = styled.ActivityIndicator`
  position: absolute;
  top: 0px;
  left: 0px;
`

interface IFabInnerProps {
  disabled: boolean
  theme: DefaultTheme
}

const FabInner = styled.TouchableOpacity`
  border-radius: 50px;
  width: ${({ theme }) => theme.device === 'desktop' ? '80px' : '60px'};
  height: ${({ theme }) => theme.device === 'desktop' ? '80px' : '60px'};
  opacity: ${(props : IFabInnerProps) => props.disabled ? 0.4 : 1.0};
  background-color: ${({ theme, disabled } : IFabInnerProps) => disabled ? theme.colors.background : theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
`

const ButtonContainer = styled.View`
  display: flex;
  align-self: center;
`

export interface IFabProps {
  icon: string;
  theme?: DefaultTheme;
  loading?: boolean;

  onPress?();
}

export default function Fab({ icon, onPress, loading } : IFabProps) {
  const [offsetY, setOffsetY] = useState(0)
  const theme = useTheme()
  const size = theme.device === 'desktop' ? 42 : 24
  const loaderSize = theme.device === 'desktop' ? 80 : 60

  const handleKeyboardDidShow = useCallback((event : KeyboardEvent) => {
    const keyboardHeight = event.endCoordinates.height + theme.insets.bottom
    setOffsetY(keyboardHeight)
  }, [setOffsetY, theme])

  const handleKeyboardDidHide = useCallback((event : KeyboardEvent) => {
    setOffsetY(0)
  }, [setOffsetY])

  useEffect(() => {
    const keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow)
    const keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)

    return () => {
      keyboardDidShowSub.remove()
      keyboardDidHideSub.remove()
    }
  }, [handleKeyboardDidShow])

  return (
    <FabContainer offsetY={offsetY}>
      <FabInner onPress={onPress} disabled={loading} style={shadow(8)}>
        <ButtonContainer>
          <MaterialCommunityIcons name={icon} color={loading ? theme.colors.primary : theme.colors.background} size={size} />
        </ButtonContainer>
      </FabInner>
      {loading && <ActivityIndicator size={loaderSize} color={theme.colors.primary} />}
    </FabContainer>
  )
}