import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useStoreData } from '@detox/store'
import Dialog, { DialogAction, DialogActions, DialogContent } from '@detox/styleguide/Dialogs'
import { Paragraph } from '@detox/styleguide/form/Text'
import { Keyboard } from 'react-native'

function useConfirmDialogStore() {
  return useStoreData(({ ui: { confirm } }) => ({
    message: confirm.message,
    visible: confirm.visible,
    respondWith: confirm.respondWith
  }))
}

/**
 * Shows confirm dialog
 */
export default function ConfirmDialog() {
  const { t } = useTranslation()
  const {
    visible,
    message,
    respondWith
  } = useConfirmDialogStore()

  const cancel = useCallback(() => {
    respondWith(false)
  }, [respondWith])

  const confirm = useCallback(() => {
    respondWith(true)
  }, [respondWith])

  useEffect(() => {
    if (visible) {
      Keyboard.dismiss()
    }
  }, [visible])

  return (
    <Dialog visible={visible}>
      <DialogContent>
        <Paragraph>{message}</Paragraph>
      </DialogContent>
      <DialogActions>
        <DialogAction small outline title={t('dialogs.confirm.cancel')} onPress={cancel} />
        <DialogAction small title={t('dialogs.confirm.ok')} onPress={confirm} />
      </DialogActions>
    </Dialog>
  )
}
