import React from 'react'
import { useTranslation } from 'react-i18next'
import styled, { DefaultTheme } from 'styled-components/native'

interface IButtonContainerProps {
  small?: boolean
  outline?: boolean
  theme?: DefaultTheme
  disabled?: boolean
}

const ButtonContainer = styled.TouchableOpacity`
  min-height: ${({ small } : IButtonContainerProps) => small ? '36px' : '49px'};
  background-color: ${({ theme, outline } : IButtonContainerProps) => outline ? theme.colors.buttonOutlineBackground : theme.colors.primary};
  border-width: 2px;
  border-color: ${({ theme } : IButtonContainerProps) => theme.colors.primary};
  border-radius: 9999px;
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled } : IButtonContainerProps) => disabled ? 0.3 : 1.0};
`

const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.font.main};
  color: ${({ theme, outline } : IButtonContainerProps) => outline ? theme.colors.buttonOutlineText : theme.colors.buttonTextColor};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.buttonText};
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-direction: row;
  text-align: center;
  display: flex;
  text-transform: uppercase;
`

export interface IButtonProps {
  title: string
  disabled?: boolean
  theme?: DefaultTheme
  small?: boolean
  outline?: boolean
  onPress?() : void
}

export default function Button(props : IButtonProps) {
  const { t } = useTranslation()

  const {
    title,
    disabled,
    outline,
    onPress,
    ...rest
  } = props

  return (
    <ButtonContainer onPress={onPress} disabled={disabled} outline={outline} {...rest}>
      <ButtonText outline={outline}>{t(title)}</ButtonText>
    </ButtonContainer>
  )
}