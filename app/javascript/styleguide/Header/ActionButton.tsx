import React from 'react'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import Text from '../form/Text'
import Touchable from '../form/Touchable'
import ActivityIndicator from '../ui/ActivityIndicator'

const InnerContainer = styled.View`

`

const FloatBubble = styled(Text)`
  position: absolute;
  font-size: 10px;
  padding: 3px 5px;
  top: -8px;
  right: -15px;
  color: #fff;
  min-width: 27px;
  text-align: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 15px;
`

const Button = styled(Touchable)`
  padding: 10px;
  border-radius: 50px;
  min-width: 50px;
  min-height: 50px;
  max-width: 50px;
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
  margin-right: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
`

export interface IActionButtonProps {
  icon: string;
  color?: string;
  theme?: DefaultTheme;
  loading?: boolean
  bubble?: string
  onPress();
}

/**
 * Shows hamburger button that after touch expands drawer
 */
export default function ActionButton({ onPress, bubble, loading, color, icon, ...props } : IActionButtonProps) {
  const { colors } = useTheme()

  return (
    <Button onPress={onPress} {...props}>
      <InnerContainer>
        {
          loading ? <ActivityIndicator size={24} /> : <MaterialCommunityIcons name={icon} size={24} color={color || colors.label} />
        }
        {bubble?.length > 0 && <FloatBubble>{bubble}</FloatBubble>}
      </InnerContainer>
    </Button>
  )
}

export const LeftActionButton = styled(ActionButton)`
  margin-left: 10px;
`

export const RightActionButton = styled(ActionButton)`
  margin-right: 10px;
`