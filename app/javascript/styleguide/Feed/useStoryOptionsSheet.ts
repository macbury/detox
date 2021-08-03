import { useCallback } from 'react'
import FeedItem from '@detox/store/models/FeedItem'
import { useTranslation } from 'react-i18next'
import useActionSheet from '../hooks/useActionSheet'

export interface IStoryOptionsSheet {
  onShowChannel(channelId: string)
}

export default function useStoryOptionsSheet(opts : IStoryOptionsSheet) {
  const showActionSheetWithOptions = useActionSheet()
  const { t } = useTranslation()

  return useCallback((story : FeedItem) => {
    const {
      onShowChannel
    } = opts
    showActionSheetWithOptions({
      title: story.channel.name,
      options: [
        t('screens.home.feed.actions.show_channel'),
        t('screens.home.feed.actions.cancel')
      ]
    }, (option) => {
      switch (option) {
        case 0:
          onShowChannel(story.channel.id)
        break;

        default:
          return
      }
    })
  }, [showActionSheetWithOptions, t, , opts])
}