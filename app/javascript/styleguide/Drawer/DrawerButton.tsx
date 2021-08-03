import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Touchable from '../form/Touchable';
import Text from '../form/Text'

export interface IDrawerButtonProps {
  children: any
  icon?: string | any
  onPress()
}

const Button = styled(Touchable)`
  background: ${({ theme }) => theme.colors.card};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`

const ButtonInner = styled.View`
  min-height: 63px;
  padding: 13px 20px;
  align-items: center;
  flex-direction: row;
`

const ButtonText = styled(Text)`
  margin-left: 15px;
  opacity: 0.7;
  margin-top: 1px;
  font-size: 16px;
`

export default function DrawerButton(props : IDrawerButtonProps) {
  const theme = useTheme()

  const {
    icon,
    children,
    onPress,
    ...rest
  } = props

  return (
    <Button onPress={onPress} {...rest}>
      <ButtonInner>
        <MaterialCommunityIcons
          name={icon}
          color={theme.colors.text}
          size={24} />
        {children && <ButtonText>{children}</ButtonText>}
      </ButtonInner>
    </Button>
  )
}
