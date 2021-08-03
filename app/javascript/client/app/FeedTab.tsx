import React, {useCallback} from 'react'
import { StoryKind } from '@detox/api'
import { useRoute } from '@react-navigation/core'
import { useNavigate } from '@detox/shared'
import Tab from '@detox/styleguide/Header/Tab'
import { useScrollToTop } from '@react-navigation/native'

export interface IFeedTabProps {
  kind: StoryKind
  focusedIcon: string
  unfocusedIcon: string
}

export default function FeedTab({ kind, ...props } : IFeedTabProps) {
  const { params } = useRoute() as any
  const navigation = useNavigate()
  const selectedKind = params?.kind || StoryKind.All

  const navigateToKind = useCallback(() => {
    if (selectedKind === kind) {
      // TODO: Scroll to top!
    } else {
      navigation.setParams({ kind })
    }
  }, [navigation, kind, selectedKind])

  return <Tab onPress={navigateToKind} focused={selectedKind === kind} {...props} />
}