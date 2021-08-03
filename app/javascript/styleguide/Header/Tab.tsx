import React from 'react'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import OS from '@detox/shared/os'
import Touchable from '../form/Touchable'
import Text from '../form/Text'

interface ITabItemContainerProps {
  focused?: boolean
  theme: DefaultTheme
}

const TabItemContainer = styled(Touchable)`
  height: ${() => OS === "android" ? '56px' : '62px'};
  padding: 18px 10px 10px 10px;
  flex: 1;
  align-items: center;
  border-bottom-width: 3px;
  border-bottom-color: ${({ theme, focused } : ITabItemContainerProps) => focused ? theme.colors.primary : 'transparent'};
`

const TabInner = styled.View`
  
`

const Icon = styled(Ionicons)`

`

export interface IBubbleProps {
  theme: DefaultTheme
  focused?: boolean
}

const Bubble = styled(Text)`
  position: absolute;
  font-size: 10px;
  padding: 2px 7px;
  margin-left: 10px;
  top: -8px;
  right: -30px;
  color: #fff;
  background: ${({ theme } : IBubbleProps) => theme.colors.primary};
  opacity: ${({ focused } : IBubbleProps) => focused ? '1.0' : '0.5'};
  border-radius: 15px;
  border: 2px solid ${({ theme }) => theme.colors.background};
  min-width: 23px;
  text-align: center;
`

export interface ITabProps {
  focused?: boolean
  unfocusedIcon: string
  focusedIcon: string
  bubble?: number

  onPress()
}

export default function Tab({ onPress, bubble, focused, unfocusedIcon, focusedIcon, ...props } : ITabProps) {
  const theme = useTheme()
  const iconSize = 24
  const bubbleVisible = bubble && bubble > 0
  const bubbleContent = bubble > 999 ? `999+` : bubble

  return (
    <TabItemContainer focused={focused} onPress={onPress}>
      <TabInner>
        {bubbleVisible ? <Bubble focused={focused}>{bubbleContent}</Bubble> : null}
        <Icon {...props} size={iconSize} name={focused ? focusedIcon : unfocusedIcon} color={focused ? theme.colors.primary : theme.colors.inactiveTab} />
      </TabInner>
    </TabItemContainer>
  )
}