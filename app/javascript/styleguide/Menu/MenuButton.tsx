import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'

const MenuTouchable = styled.TouchableHighlight`
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 16px;
  padding-right: 16px;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1.0}
`

const MenuContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const Text = styled.Text`
  font-weight: 400;
  line-height: 24px;
  font-family: ${({ theme }) => theme.font.main};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.buttonText};
`

const Icon = styled(MaterialIcons)`
  margin-right: 10px;
`

export interface IMenuButtonProps {
  children: any
  icon?: string
  disabled?: boolean
  onPress()
}

export default function MenuButton({ icon, disabled, children, onPress } : IMenuButtonProps) {
  const theme = useTheme()

  return (
    <MenuTouchable disabled={disabled} onPress={!disabled && onPress} underlayColor={theme.colors.cardBackgroundHover} activeOpacity={0.4}>
      <MenuContainer>
        {icon && <Icon name={icon} size={24} color={theme.colors.text} />}
        <Text>{children}</Text>
      </MenuContainer>
    </MenuTouchable>
  )
}