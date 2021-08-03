import React from 'react'
import styled from 'styled-components/native'
import { light, dark } from '../theme'

export interface IChangeThemeButtonProps {
  themeName: string
  onChangeThemePress(themeName: string)
}

const ThemeButtonTouchable = styled.TouchableOpacity`
  height: 80px;
  flex: 1;
  display: flex;
  padding: 10px;
`

const BackgroundPreview = styled.View`
  background: ${({ theme }) => theme.colors.background};
  height: 100%;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  font-family: ${({ theme }) => theme.font.main};
  font-size: ${({ theme }) => theme.fontSize.text};
  color: ${({ theme }) => theme.colors.text};
`

export default function ChangeThemeButton({ themeName, onChangeThemePress } : IChangeThemeButtonProps) {
  const theme = themeName === 'light' ? light : dark

  return (
    <ThemeButtonTouchable onPress={() => onChangeThemePress(themeName)}>
      <BackgroundPreview theme={theme}>
        <Text theme={theme}>{themeName}</Text>
      </BackgroundPreview>
    </ThemeButtonTouchable>
  )
}