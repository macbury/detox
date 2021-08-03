import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'

import { useStoreData } from '@detox/store'
import Dialog, { DialogAction, DialogActions, DialogContent, DialogTitle } from '@detox/styleguide/Dialogs'
import { Paragraph, Header4 } from '@detox/styleguide/form/Text'
import TextField from '@detox/styleguide/form/TextField'

function useInputDialogStore() {
  return useStoreData(({ ui: { input } }) => ({
    titleKey: input.titleKey,
    descriptionKey: input.descriptionKey,
    value: input.value,
    visible: input.visible,
    multiline: input.multiline,
    ok: input.ok,
    setValue: input.setValue,
    dismiss: input.dismiss
  }))
}

/**
 * Shows confirm dialog
 */
export default function ConfirmDialog() {
  const { t } = useTranslation()
  const {
    visible,
    value,
    multiline,
    descriptionKey,
    titleKey,
    ok,
    dismiss,
    setValue
  } = useInputDialogStore()

  useEffect(() => {
    if (visible) {
      Keyboard.dismiss()
    }
  }, [visible])

  return (
    <Dialog visible={visible}>
      <DialogTitle>
        <Header4>{t(titleKey)}</Header4>
      </DialogTitle>
      <DialogContent>
        {descriptionKey && <Paragraph>{t(descriptionKey)}</Paragraph>}
        <TextField
          onChangeText={setValue}
          value={value}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1} />
      </DialogContent>
      <DialogActions>
        <DialogAction small outline title={t('dialogs.input.cancel')} onPress={dismiss} />
        <DialogAction small title={t('dialogs.input.ok')} onPress={ok} />
      </DialogActions>
    </Dialog>
  )
}
