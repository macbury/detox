import React from 'react'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { SceneRendererProps, NavigationState } from 'react-native-tab-view'
export const CONTENT_WIDTH = 700

type Route = {
  key: string;
  icon: string;
  color: [number, number, number];
};

type State = NavigationState<Route>;


const Inner = styled.View`
  width: ${({ theme }) => theme.device === 'desktop' ? `${CONTENT_WIDTH}px` : '100%'};
  margin: ${({ theme }) => theme.device === 'desktop' ? `0 auto` : '0'};
`

const Indicator = styled(Animated.View)`
  border-bottom-width: 3px;
  border-bottom-color: ${({ theme }) => theme.colors.primary};
`

export type ITabIndicatorProps = SceneRendererProps & {
  navigationState: State;
  getTabWidth: (i: number) => number;
  width: number
}

/**
 * Custom tab bar navigation for desktop
 * https://github.com/satya164/react-native-tab-view#readme
 * https://github.com/satya164/react-native-tab-view/blob/0cf9101e211208baea7ac1eab1a12647895ee44c/example/src/CustomIndicatorExample.tsx
 * @param props
 */
export default function TabIndicator(props : any) {
  const { width, layout, position, navigationState } = props

  const tabWidth = CONTENT_WIDTH / navigationState.routes.length
  const inputRange = [
    0,
    1.0
  ];

  const translateX = Animated.interpolate(position, {
    inputRange: inputRange,
    outputRange: inputRange.map((x) => {
      const i = Math.round(x)
      return i * tabWidth
    }),
  });

  return (
    <Inner>
      <Indicator style={{ width, height: layout.height || 48, transform: [{ translateX }] }}  />
    </Inner>
  )
}