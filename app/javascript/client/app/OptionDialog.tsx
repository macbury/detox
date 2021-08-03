import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useStoreData } from '@detox/store'
import Dialog, { DialogAction, DialogActions, DialogNoPaddingContent, DialogTitle } from '@detox/styleguide/Dialogs'
import Option from '@detox/styleguide/Dialogs/Option'
import { Header4 } from '@detox/styleguide/form/Text'

function useOptionDialogStore() {
  return useStoreData(({ ui: { select } }) => ({
    titleKey: select.titleKey,
    visible: select.visible,
    options: select.options,
    value: select.value,
    ok: select.ok,
    dismiss: select.dismiss
  }))
}


/**
 * Shows confirm dialog
 */
export default function OptionDialog() {
  const { t } = useTranslation()
  const {
    visible,
    titleKey,
    options,
    value,
    ok,
    dismiss
  } = useOptionDialogStore()

  const items = useMemo(() => options.map((item) => (
    <Option key={item.key} label={t(item.key)} selected={item.value === value} onPress={() => ok(item)} />
  )), [options, value, ok])

  return (
    <Dialog visible={visible}>
      <DialogTitle>
        <Header4>{t(titleKey)}</Header4>
      </DialogTitle>
      <DialogNoPaddingContent>
        {items}
      </DialogNoPaddingContent>
      <DialogActions>
        <DialogAction small outline title={t('dialogs.confirm.cancel')} onPress={dismiss} />
      </DialogActions>
    </Dialog>
  )
}
