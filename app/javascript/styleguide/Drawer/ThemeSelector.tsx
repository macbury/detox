import React from 'react'
import styled from 'styled-components/native'
import ChangeThemeButton from './ChangeThemeButton'

const ThemeSelectorContainer = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`

export interface IThemeSelectorProps {
  onChangeTheme(newTheme: string)
}

export default function ThemeSelector({ onChangeTheme } : IThemeSelectorProps) {
  return (
    <ThemeSelectorContainer>
      <ChangeThemeButton
        onChangeThemePress={onChangeTheme}
        themeName="light" />
      <ChangeThemeButton
        onChangeThemePress={onChangeTheme}
        themeName="dark" />
    </ThemeSelectorContainer>
  )
}