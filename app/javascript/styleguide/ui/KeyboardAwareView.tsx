import React from 'react'
import { KeyboardAvoidingView as Kav, KeyboardAvoidingViewProps } from 'react-native'
import { HeaderHeightContext } from "@react-navigation/stack";

export interface IKeyboardAwareViewProps extends KeyboardAvoidingViewProps {
  children: any
}

export default function KeyboardAwareView({ children, ...props } : IKeyboardAwareViewProps) {
  //TODO: replace with hook, based on https://dev.to/chakrihacker/how-to-fix-keyboardavoidingview-in-react-native-5f3b
  return (
    <HeaderHeightContext.Consumer>
      {headerHeight => (
        <Kav behavior="padding" style={{flex: 1}} contentContainerStyle={{flex: 1}} keyboardVerticalOffset={headerHeight} {...props}>
          {children}
        </Kav>
      )}
    </HeaderHeightContext.Consumer>
  )
}