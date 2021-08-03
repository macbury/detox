import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import ActivityIndicator from '@detox/styleguide/ui/ActivityIndicator'
import Text from '@detox/styleguide/form/Text'
import { useStoreData } from '@detox/store'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 20px;
  min-height: 300px;
`

const ProgressText = styled(Text)`
  margin-top: 20px;
  margin-bottom: 20px;
`

function useImportOpml() {
  return useStoreData(({ screens: { importOpml } }) => ({
    current: importOpml.current,
    isLoading: importOpml.isLoading,
    total: importOpml.total,
    left: importOpml.left
  }))
}

export default function ImportOpmlScreen() {
  const { t } = useTranslation()
  const {
    total,
    current,
    left,
    isLoading
  } = useImportOpml()

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size={64} />
        <ProgressText>{t('screens.home.import_opml.progress', { total, left })}</ProgressText>
        <ProgressText>{current?.title} - {current?.feedUrl}</ProgressText>
      </Container>
    )
  } else {
    return (
      <Container>
        <ProgressText>{t('screens.home.import_opml.finished.message')}</ProgressText>
      </Container>
    )
  }
}