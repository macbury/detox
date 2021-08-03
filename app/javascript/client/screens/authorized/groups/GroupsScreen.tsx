import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components/native'
import Navbar from '@detox/styleguide/ui/Navbar'
import Fab from '@detox/styleguide/form/Fab'
import { Group } from '@detox/store/models/Group'
import { newGroupPath, useNavigate, groupPath } from '@detox/shared'
import { useAsyncEffectOnFocus } from '@detox/styleguide/hooks/useAsyncEffect'
import InformationContent from '@detox/styleguide/ui/InformationContent'
import { useStoreData } from '@detox/store'
import { FlatList, RefreshControl } from 'react-native'
import LoadingContent from '@detox/styleguide/ui/LoadingContent'
import OS from '@detox/shared/os'
import { renderCenteredScroll } from '@detox/styleguide/ui/CenteredScrollView'
import GroupItem from '@detox/styleguide/Groups/GroupItem'
import BurgerMenuWithUnreadCount from '../../../app/BurgerMenuWithUnreadCount'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'

function useGroupsStore() {
  return useStoreData(({ screens: { groups } }) => ({
    items: groups.items,
    loading: groups.isLoading,
    refresh: groups.refresh
  }))
}

const ItemsContainer = styled.View`
  flex: 1; 
`

export default function GroupsScreen() {
  const {
    items,
    loading,
    refresh
  } = useGroupsStore()
  useModalNavBar()
  
  const navigation = useNavigate()
  const [containerHeight, setContainerHeight] = useState<number>(0)

  const goToNewGroupScreen = useCallback(() => {
    navigation.navigate(newGroupPath())
  }, [navigation])

  useAsyncEffectOnFocus(refresh)

  const ListEmptyComponent = useCallback(() => {
    const style = OS === "web" ? { minHeight: `${containerHeight}px` } : { height: Math.round(containerHeight) }
    return loading ? <LoadingContent style={style} /> : <InformationContent style={style} message="screens.home.groups.empty" icon="folder-pound" />
  }, [containerHeight, loading])

  const refreshControl = useMemo(() => (
    <RefreshControl onRefresh={() => void refresh()} refreshing={false} />
  ), [refresh])

  const renderItem = useCallback(({ item } : { item : Group }) => (
    <GroupItem group={item} groupPath={groupPath(item.id)} key={item.id} />
  ), [])

  return (
    <ItemsContainer onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}>
      <FlatList
        renderItem={renderItem}
        renderScrollComponent={renderCenteredScroll}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={refreshControl}
        initialNumToRender={50}
        data={items} />
      <Fab
        icon="plus"
        onPress={goToNewGroupScreen} />
      <Navbar />
    </ItemsContainer>
  )
}

GroupsScreen.getScreenOptions = (t, mobile : boolean) => ({
  headerShown: true,
  title: t('screens.home.groups.title'),
  headerLeft: (props) => mobile && <BurgerMenuWithUnreadCount {...props} />
})
