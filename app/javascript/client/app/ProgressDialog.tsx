import React, { useEffect } from 'react'
import styled, { useTheme } from 'styled-components/native'
import Dialog, { DialogContent, } from '@detox/styleguide/Dialogs'

import { useStoreData } from '@detox/store'
import { ActivityIndicator } from 'react-native'

const Container = styled.View`
  flex-direction: row;
  align-self: center;
  padding: 20px 30px 40px 30px;
  align-items: center;
  justify-content: center;
`

function useProgressDialogStore() {
  return useStoreData(({ ui: { progressVisible } }) => ({
    visible: progressVisible
  }))
}

export default function ProgressDialog() {
  const theme = useTheme()
  const {
    visible
  } = useProgressDialogStore()

  return (
    <Dialog visible={visible}>
      <DialogContent>
        <Container>
          <ActivityIndicator color={theme.colors.text} size={64} />
        </Container>
      </DialogContent>
    </Dialog>
  )
}