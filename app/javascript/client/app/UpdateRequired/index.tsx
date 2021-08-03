import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import RNRestart from 'react-native-restart'
import { useStoreData } from '@detox/store'
import ActivityIndicator from '@detox/styleguide/ui/ActivityIndicator'
import Text, { Header2 } from '@detox/styleguide/form/Text'
import Button from '@detox/styleguide/form//Button'

const Container = styled.View`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.colors.background};
`

const Inner = styled.View`
  align-items: center;
  padding: 10px 25px;
`

interface IProgress {
  progress: number;
}

const ProgressBarContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 10px;
  height: 14px;
  background: ${({ theme }) => theme.colors.inputBackground};
  border-radius: 8px;
  border-width: 1px;
  overflow: hidden;
  display: flex;
  width: 80%;
  border-color: ${({ theme }) => theme.colors.primary};
`

const ProgressValue = styled.View`
  height: 14px;
  background: ${({ theme }) => theme.colors.primary};
  width: ${(props : IProgress) => props.progress}%;
`

function useUpdater() {
  const { state, downloadProgress, check } = useStoreData(({ ui: { softwareUpdate } }) => ({
    state: softwareUpdate.refreshState,
    downloadProgress: softwareUpdate.progress,
    check: softwareUpdate.check
  }))

  useEffect(() => {
    check()
  }, [check])

  return {
    state,
    downloadProgress
  }
}

export default function UpdateRequired({ children }) {
  const { t } = useTranslation()
  const {
    state,
    downloadProgress
  } = useUpdater()

  if (state === 'UpToDate') {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }

  return (
    <Container>
      <Inner>
        <Header2>{t('errors.update.title')}</Header2>
        <Text>{t('errors.update.about')}</Text>

        <ProgressBarContainer>
          <ProgressValue progress={downloadProgress} />
        </ProgressBarContainer>

        {state === 'Downloading' && <ActivityIndicator size="large" />}
        {state === 'ReadyToInstall' && <Button title='errors.update.restart' onPress={RNRestart.Restart} />}
      </Inner>
    </Container>
  )
}