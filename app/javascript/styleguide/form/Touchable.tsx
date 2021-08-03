import React from 'react'
import { useTheme } from 'styled-components/native'
import { TouchableHighlight } from 'react-native'

export interface ITouchableProps {
  children: any;
  style?: any;
  title?: string;
  disabled?: boolean;
  underlayColor?: string
  onPress();
}

export default function Touchable({ children, underlayColor, ...props} : ITouchableProps) {
  const theme = useTheme()
  //if (Platform.OS === 'web') {
    return (
      <TouchableHighlight delayPressIn={50} underlayColor={underlayColor || theme.colors.cardBackgroundHover} activeOpacity={0.4} {...props}>
        {children}
      </TouchableHighlight>
    )
 // } else {
 //   return <TouchableNativeFeedback {...props} style={style} />
 // }
}