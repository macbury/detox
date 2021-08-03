import React, { useMemo } from 'react'
import { observer } from "mobx-react-lite"
import { useRoute } from '@react-navigation/core'
import { useStoreData } from '@detox/store'
import { groupPath } from '@detox/shared'
export { DRAWER_COLLAPSED_WIDTH, DRAWER_EXPANDED_WIDTH } from '@detox/styleguide/Drawer/DesktopDrawerContent'
import DrawerLink from '@detox/styleguide/Drawer/DrawerLink'
import { Group } from '@detox/store/models/Group'

function useSidebar() {
  return useStoreData(({ screens: { groups } }) => ({
    groups: groups.items,
    selectedGroupId: groups.show.groupId,
    isFocused: groups.show.isFocused
  }))
}

export interface IGroupOptionsProps {
  collapsed: boolean
}

export interface IGroupOptionProps {
  group: Group
  selected: boolean
  collapsed: boolean
}

const GroupOption = observer(({ selected, group, collapsed } : IGroupOptionProps) => {
  return (
    <DrawerLink
      collapsed={collapsed}
      bubble={group.bubbleCount}
      selected={selected}
      title={group.name}
      to={groupPath(group.id)} 
      icon={group.icon}>
        {group.name}
    </DrawerLink>
  )
})


export default function GroupOptions({ collapsed } : IGroupOptionsProps) {
  const route = useRoute() as any
  const {
    screen
  } = route?.params || {}

  const {
    selectedGroupId,
    groups,
    isFocused
  } = useSidebar()

  const items = useMemo(() => {
    return groups.map((group) => (
      <GroupOption 
        key={group.id}
        group={group}
        selected={isFocused && selectedGroupId === group.id}
        collapsed={collapsed} />
    ))
  }, [groups, selectedGroupId, collapsed, isFocused])

  return (
    <React.Fragment>
      {items}
    </React.Fragment>
  )
}