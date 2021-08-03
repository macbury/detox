import React, { useCallback, useLayoutEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native'
import LoadingContent from '@detox/styleguide/ui/LoadingContent'
import TextField from '@detox/styleguide/form/TextField'
import Button from '@detox/styleguide/form/Button'
import { useFullScreenBar } from '@detox/styleguide/helpers/useSetNavBarColor'
import { useStoreData } from '@detox/store'
import { homePath, useNavigate } from '@detox/shared'
import useExternalBrowserUrl from '@detox/styleguide/hooks/useExternalBrowserUrl'

const FormTextField = styled(TextField)`
  width: 100%;
`

const CenterContentWrapper = styled(KeyboardAvoidingView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Form = styled.View`
  margin-top: 20px;
  max-width: 600px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
`

const SignInButton = styled(Button)`
  margin-top: 15px;
`

const DownloadButton = styled(Button)`
  margin-top: 10px;
`

function useSignInStore() {
  return useStoreData(({ screens: { signIn }, sessions }) => ({
    loading: signIn.isLoading,
    username: signIn.username,
    password: signIn.password,
    instanceUrl: signIn.instanceUrl,
    requireInstanceUrl: signIn.requireInstanceUrl,
    isLoggedIn: sessions.isLoggedIn,
    setInstanceUrl: signIn.setInstanceUrl,
    setPassword: signIn.setPassword,
    setUsername: signIn.setUsername,
    authorize: signIn.authorize
  }))
}

export default function SignInScreen() {
  const navigation = useNavigate()

  const {
    loading,
    username,
    password,
    instanceUrl,
    isLoggedIn,
    requireInstanceUrl,
  
    setInstanceUrl,
    setPassword,
    setUsername,
    authorize
  } = useSignInStore()

  const openUrl = useExternalBrowserUrl()
  const editable = !loading

  useFullScreenBar()

  useLayoutEffect(() => {
    if (isLoggedIn) {
      navigation.navigate(homePath())
    }
  }, [isLoggedIn, navigation])

  const downloadNativeApp = useCallback(() => {
    openUrl(`${instanceUrl}/data/software_update/apk`)
  }, [instanceUrl])

  if (isLoggedIn) {
    return <LoadingContent />
  }
  
  return (
    <CenterContentWrapper behavior="padding">
      <Form>
        <FormTextField
          autoCapitalize="none"
          hidden={!requireInstanceUrl}
          editable={editable}
          value={instanceUrl}
          onSubmitEditing={authorize}
          label="screens.guest.sign_in.form.instance_url"
          onChangeText={setInstanceUrl}
        />
        <FormTextField
          editable={editable}
          value={username}
          label="screens.guest.sign_in.form.username"
          onChangeText={setUsername}
          onSubmitEditing={authorize}
        />
        <FormTextField
          editable={editable}
          value={password}
          label="screens.guest.sign_in.form.password"
          secureTextEntry
          onChangeText={setPassword}
          onSubmitEditing={authorize}
        />
        <SignInButton
          title="screens.guest.sign_in.form.button"
          onPress={authorize}
          disabled={loading} />

        {!requireInstanceUrl && <DownloadButton
          outline
          title="screens.guest.sign_in.form.download"
          onPress={downloadNativeApp}
          disabled={loading} />}
      </Form>
    </CenterContentWrapper>
  );
}
