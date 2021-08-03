import React, { useEffect, useCallback } from 'react'
import { useStoreData } from '@detox/store'
import { useIsFocused } from '@react-navigation/native'
import Navbar from '@detox/styleguide/ui/Navbar'
import Fab from '@detox/styleguide/form/Fab'
import GroupForm, { DetailsForm } from '@detox/styleguide/GroupForm'
import BackButton from '@detox/styleguide/Header/BackButton'
import { groupsPath, useNavigate } from '@detox/shared'
import { TGetScreenOptions } from '../../TGetScreenOptions'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'

function useGroupStore() {
  return useStoreData(({ screens: { groups } }) => ({
    initNewForm: groups.new.initNewForm,
    setQuery: groups.new.setQuery,
    setName: groups.new.setName,
    setIcon: groups.new.setIcon,
    create: groups.new.create,
    clear: groups.new.clear,

    saving: groups.new.isSaving,
    filteredOptions: groups.new.filteredOptions,
    query: groups.new.query,
    name: groups.new.name,
    icon: groups.new.icon,
    selectedCount: groups.new.selectedCount
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

export default function NewGroupScreen() {
  const navigate = useNavigate()
  const isFocused = useIsFocused()
  const {
    filteredOptions,
    saving,
    create,
    initNewForm,
    clear
  } = useGroupStore()

  useModalNavBar()

  useEffect(() => {
    if (isFocused) {
      initNewForm()
    }
  }, [isFocused, initNewForm])
  
  const saveGroup = useCallback(async () => {
    if (await create()) {
      navigate.navigate(groupsPath())
      clear()
    }
  }, [create, clear])

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
  title: t('screens.home.new_group.title'),
  headerLeft: (props) => <BackButton {...props} goBackFallback={groupsPath()} />,
  cardStyle: { backgroundColor: theme.colors.background }
})

NewGroupScreen.getScreenOptions = getScreenOptions
