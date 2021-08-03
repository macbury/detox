import React, { useCallback } from 'react'
import { RightActionButton } from '@detox/styleguide/Header/ActionButton'
import OS from '@detox/shared/os'
import { Story } from '@detox/api'
import shareUrl from '../../../app/modules/share'

export interface IShareActionProps {
  permalink: string
}

export default function ShareAction({ permalink } : IShareActionProps) {
  const showShareStory = useCallback(() => {
    shareUrl(permalink)
  }, [permalink])

  if (OS !== "android" || !permalink) {
    return null
  }

  return (
    <RightActionButton
      icon="share-variant"
      onPress={showShareStory} />
  )  
}