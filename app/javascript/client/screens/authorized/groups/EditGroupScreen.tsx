import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRoute } from '@react-navigation/core'
import { useIsFocused } from '@react-navigation/native'
import Navbar from '@detox/styleguide/ui/Navbar'
import Fab from '@detox/styleguide/form/Fab'
import BackButton from '@detox/styleguide/Header/BackButton'
import { groupPath, groupsPath, useNavigate } from '@detox/shared'
import { useStoreData } from '@detox/store'
import GroupForm, { DetailsForm } from '@detox/styleguide/GroupForm'
import LoadingContent from '@detox/styleguide/ui/LoadingContent'
import { TGetScreenOptions } from '../../TGetScreenOptions'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'

function useGroupStore() {
  return useStoreData(({ screens: { groups } }) => ({
    load: groups.edit.load,
    setQuery: groups.edit.setQuery,
    setName: groups.edit.setName,
    setIcon: groups.edit.setIcon,
    update: groups.edit.update,
    clear: groups.edit.clear,

    loading: groups.edit.isLoading,
    saving: groups.edit.isSaving,
    filteredOptions: groups.edit.filteredOptions,
    query: groups.edit.query,
    name: groups.edit.name,
    icon: groups.edit.icon,
    selectedCount: groups.edit.selectedCount
  }))
}

function Form() {
  const {
    query,
    name,
    icon,
    saving,
    selectedCount,
    setQuery,
    setIcon,
    setName,
  } = useGroupStore()

  return (
    <DetailsForm
      editable={!saving}
      selectedCount={selectedCount}
      name={name}
      icon={icon}
      searchChannelQuery={query}
      setSearchChannelQuery={setQuery}
      setIcon={setIcon}
      setName={setName} />
  )
}

export default function EditGroupScreen() {
  const { t } = useTranslation()
  const navigation = useNavigate()
  const isFocused = useIsFocused()
  const { params } = useRoute()
  const {
    filteredOptions,
    saving,
    loading,
    update,
    load,
    clear
  } = useGroupStore()

  useModalNavBar()

  const { groupId } = (params || {}) as any

  useEffect(() => {
    const onLoad = async () => {
      if (isFocused && groupId) {
        navigation.setOptions({
          title: t('screens.home.edit_group.loading')
        })
        const group : any = await load(groupId)

        navigation.setOptions({
          title: t('screens.home.edit_group.title', { name: group.name }),
          headerLeft: (props) => <BackButton {...props} goBackFallback={groupPath(group.id)} />,
        })
      }
    }

    onLoad()
  }, [isFocused, groupId, load])

  const saveGroup = useCallback(async () => {
    if (await update()) {
      navigation.navigate(groupPath(groupId))
      clear()
    }
  }, [update, clear, groupId])

  if (loading) {
    return <LoadingContent />
  }

  return (
    <React.Fragment>
      <GroupForm
        editable={!saving}
        DetailsForm={Form}
        options={filteredOptions} />
      <Fab
        icon="content-save"
        loading={saving}
        onPress={saveGroup} />
      <Navbar />
    </React.Fragment>
  )
}

export const getScreenOptions: TGetScreenOptions = (t, mobile : boolean, theme) => ({
  headerShown: true,
  title: t('screens.home.edit_group.loading'),
  cardStyle: { backgroundColor: theme.colors.background },
  headerLeft: (props) => <BackButton {...props} goBackFallback={groupsPath()} />
})

EditGroupScreen.getScreenOptions = getScreenOptions
