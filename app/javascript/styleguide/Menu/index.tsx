import React, { useRef, useLayoutEffect, useState } from 'react'
import { View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Portal from '@burstware/react-native-portal'
import styled from 'styled-components/native'
import shadow from '../helpers/shadow'
import OS from '@detox/shared/os'

export const Overlay = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.overlay};
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`

const MenuContainer = styled.View`
  min-width: 240px;
  width: 240px;
  position: absolute;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.modalBackground};
  padding-top: 8px;
  padding-bottom: 8px;
`

export interface IMenuProps {
  style?: any
  children?: any
  visible?: boolean
  anchor: any

  onCloseMenu?()
}

export default function Menu(props : IMenuProps) {
  const {
    visible,
    style,
    children,
    anchor,
    onCloseMenu,
    ...restProps
  } = props

  const [anchorCords, setAnchorCords] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const anchorRef = useRef<View>()
  const isFocused = useIsFocused()

  useLayoutEffect(() => {
    if (anchorRef.current) {
      anchorRef.current.measure((x = 0, y = 0, width = 0, height = 0, pageX = 0, pageY = 0) => {
        setAnchorCords({ x: pageX, y: pageY, width, height })
        //console.log(`${pageX}:${pageY}`)
      })
    }
  }, [anchorRef.current, visible, isFocused])

  const menuPositionStyle = OS === 'web' ? {
    top: anchorCords.y + anchorCords.height,
    left: anchorCords.x - 190
  } : {
    top: 50,
    right: 10,
  }

  return (
    <View ref={anchorRef} {...props}>
      {anchor}
      {
        isFocused && visible && (
          <Portal>
            <Overlay onPress={onCloseMenu} />
            <MenuContainer style={[style, shadow(5), menuPositionStyle]} {...restProps}>
              {children}
            </MenuContainer>
          </Portal>
        )
      }
    </View>
  )
}