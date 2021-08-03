import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Form from '../form'
import SearchField from '../form/SearchField'
import { FormHeader } from '../form/Text'
import TextField from '../form/TextField'
import Card from '../Card'
import { IFormDetailsProps } from './types'

export const DETAILS_HEIGHT = 370

const FieldWithIconPreview = styled(Card)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 20px;
`

const Icon = styled(MaterialCommunityIcons)`

`

export function DetailsForm({ editable, selectedCount, name, icon, searchChannelQuery, setSearchChannelQuery, setName, setIcon } : IFormDetailsProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  
  return (
    <Form style={{ paddingBottom: 0 }}>
      <FieldWithIconPreview shadow={3}>
        <Icon
          size={48}
          color={theme.colors.text}
          name={icon} />
      </FieldWithIconPreview>
      <TextField
        focusable
        value={name}
        editable={editable}
        autoCapitalize="none"
        placeholder="new group name"
        label="screens.home.new_group.form.name"
        onChangeText={setName} />
      <TextField
        value={icon}
        editable={editable}
        autoCapitalize="none"
        placeholder="bank-minus"
        label="screens.home.new_group.form.icon"
        onChangeText={setIcon} />
      <FormHeader>{t('screens.home.new_group.form.subscriptions', { selectedCount })}</FormHeader>

      <SearchField
        editable={editable}
        placeholder={t('screens.home.new_group.form.search.placeholder')}
        value={searchChannelQuery}
        onChangeText={setSearchChannelQuery} />
    </Form>
  )
}

export function useRenderDetailsHeader(props : IFormDetailsProps) {
  return useCallback(() => (
    <DetailsForm {...props} />
  ), [props])
}