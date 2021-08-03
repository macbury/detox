import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import Button from '../form/Button'
import Overlay from './Overlay'
import shadow from '../helpers/shadow'

const DialogWrapper = styled.View`
  background: ${({ theme }) => theme.colors.modalBackground};
  max-width: 600px;
  width: 100%;
  min-width: 320px;
  border-radius: 10px;
  margin: 10px;
`

export const DialogTitle = styled.View`
  padding: 20px 24px 10px 24px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.colors.inputBorder};
`

export const DialogNoPaddingContent = styled.ScrollView`
  max-height: 300px;
`

export const DialogContent = styled(DialogNoPaddingContent)`
  padding: 20px 24px 0px 24px;
  max-height: 300px;
`

export const DialogActions = styled.View`
  flex: 0 0 auto;
  flex-direction: row;
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: flex-end;
  border-top-width: 2px;
  border-top-color: ${({ theme }) => theme.colors.inputBorder};
`

export const DialogAction = styled(Button)`
  margin-left: 10px;
  min-width: 120px;
  max-width: 200px;
  display: flex;
`

export interface IDialogProps {
  children: any
  visible: boolean
}

export default function Dialog({ children, visible } : IDialogProps) {
  const theme = useTheme()

  if (!visible) {
    return null
  }

  return (
    <Overlay>
      <DialogWrapper style={shadow(theme.device === 'desktop' ? 30 : 10)}>
        {children}
      </DialogWrapper>
    </Overlay>
  )
}