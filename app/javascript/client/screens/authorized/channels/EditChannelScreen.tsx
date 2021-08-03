import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView } from 'react-native'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import CenteredScrollView from '@detox/styleguide/ui/CenteredScrollView'
import NotFoundOrLoading from '@detox/styleguide/ui/NotFoundOrLoading'
import TextField from '@detox/styleguide/form/TextField'
import Form from '@detox/styleguide/form'
import { FormHeader } from '@detox/styleguide/form/Text'
import Fab from '@detox/styleguide/form/Fab'
import SwitchOption from '@detox/styleguide/form/SwitchOption'
import Navbar from '@detox/styleguide/ui/Navbar'
import EditChannelActions from './EditChannelActions'
import BackButton from '@detox/styleguide/Header/BackButton'
import { useStoreData } from '@detox/store'
import { channelPath } from '@detox/shared'
import { ChannelKind, RewriteRuleEnum } from '@detox/api'

function useEditChannelStore() {
  return useStoreData(({ screens: { editChannel } }) => ({
    loading: editChannel.isLoading,
    saving: editChannel.isSaving,
    channel: editChannel.channel,
    kind: editChannel.channel?.kind,
    name: editChannel.channel?.name,
    siteUrl: editChannel.channel?.siteUrl,
    source: editChannel.channel?.source,
    userAgent: editChannel.channel?.userAgent,
    downloadPage: editChannel.channel?.downloadPage,
    extractionRules: editChannel.channel?.extractionRules,
    rejectRules: editChannel.channel?.rejectRules,
    blockRules: editChannel.channel?.blockRules,
    rewriteRules: editChannel.channel?.rewriteRules,

    load: editChannel.load,
    save: editChannel.save,
    setChannelUrl: editChannel.setChannelUrl,
    setName: editChannel.setName,
    setSiteUrl: editChannel.setSiteUrl,
    setUserAgent: editChannel.setUserAgent,
    setDownloadPage: editChannel.setDownloadPage,
    setExtractionRules: editChannel.setExtractionRules,
    setRejectRules: editChannel.setRejectRules,
    setBlockRules: editChannel.setBlockRules,
    toggleRewriteRule: editChannel.toggleRewriteRule
  }))
}

export default function EditChannelScreen({ route } : StackScreenProps<any, any>) {
  const channelId = route?.params?.channelId
  const isFocused = useIsFocused()
  const { t } = useTranslation()

  const {
    downloadPage,
    saving,
    loading,
    channel,
    name,
    siteUrl,
    source,
    userAgent,
    extractionRules,
    rejectRules,
    blockRules,
    rewriteRules,
    kind,
    load,
    setName,
    setChannelUrl,
    setSiteUrl,
    setUserAgent,
    setDownloadPage,
    setExtractionRules,
    setRejectRules,
    setBlockRules,
    toggleRewriteRule,
    save
  } = useEditChannelStore()

  useModalNavBar()

  useEffect(() => {
    if (isFocused && channelId) {
      load(channelId)
    }
  }, [isFocused, channelId, load])

  const showTransformPage = kind === ChannelKind.Rss
  const showRejectRules = showTransformPage || kind === ChannelKind.Youtube

  const rewriteOptions = useMemo(() => Object.keys(RewriteRuleEnum).map((rule : RewriteRuleEnum) => {
    const toggled = rewriteRules?.includes(rule)
    return (
      <SwitchOption
        hidden={!showTransformPage}
        key={rule}
        value={toggled}
        onValueChange={() => toggleRewriteRule(rule)}
        label={`screens.home.edit_channel.form.rewrite_rules.${rule}`} />
    )
  }), [rewriteRules, toggleRewriteRule, showTransformPage])

  if (!channel) {
    return <NotFoundOrLoading loading={loading}/>
  }

  return (
    <React.Fragment>
      <CenteredScrollView>
        <Form>
          <TextField
            focusable
            value={name}
            editable={!saving}
            autoCapitalize="none"
            label="screens.home.edit_channel.form.title"
            onChangeText={setName} />
          <TextField
            hidden={!showTransformPage}
            value={siteUrl}
            editable={!saving}
            autoCapitalize="none"
            label="screens.home.edit_channel.form.site_url"
            onChangeText={setSiteUrl} />
          <TextField
            hidden={!showTransformPage}
            value={source}
            editable={!saving}
            autoCapitalize="none"
            label="screens.home.edit_channel.form.channel_url"
            onChangeText={setChannelUrl} />
          <TextField
            hidden={!showTransformPage}
            value={userAgent}
            editable={!saving}
            autoCapitalize="none"
            label="screens.home.edit_channel.form.user_agent"
            onChangeText={setUserAgent} />
          {/* <Option
            onPress={() => null}
            title="screens.home.edit_channel.form.sync_interval.title"
            description="screens.home.edit_channel.form.sync_interval.description"
            icon="timer"
            value="15 min" /> */}
          {showTransformPage || showRejectRules && <FormHeader>{t('screens.home.edit_channel.header.text_transformation')}</FormHeader>}
          <TextField
            hidden={!showRejectRules}
            value={blockRules}
            editable={!saving}
            hint={t('screens.home.edit_channel.form.block_rules_hint')}
            placeholder={t('screens.home.edit_channel.form.block_rules_placeholder')}
            autoCapitalize="none"
            label="screens.home.edit_channel.form.block_rules"
            onChangeText={setBlockRules} />
          <SwitchOption
            hidden={!showTransformPage}
            value={downloadPage}
            onValueChange={setDownloadPage}
            label="screens.home.edit_channel.form.download" />
          <TextField
            hidden={!showRejectRules}
            value={rejectRules}
            editable={!saving}
            placeholder="code, img.preview"
            autoCapitalize="none"
            label="screens.home.edit_channel.form.reject_rules"
            onChangeText={setRejectRules} />
          <TextField
            hidden={!showRejectRules}
            value={extractionRules}
            editable={!saving}
            placeholder="body article p, body article img"
            autoCapitalize="none"
            label="screens.home.edit_channel.form.scrape_rules"
            onChangeText={setExtractionRules} />
          {rewriteOptions}
        </Form>
      </CenteredScrollView>
      <Fab
        loading={saving}
        icon="content-save"
        onPress={save} />
      <Navbar />
    </React.Fragment>
  )
}


EditChannelScreen.getScreensOptions = (t, theme) => ({
  title: t('screens.home.edit_channel.title'),
  cardStyle: { backgroundColor: theme.colors.background },
  headerShown: true,
  headerLeft: (props) => {
    const { params: { channelId } } = useRoute<any>()

    return <BackButton {...props} goBackFallback={channelPath(channelId)} />
  },
  headerRight: (props) => <EditChannelActions {...props} />
})