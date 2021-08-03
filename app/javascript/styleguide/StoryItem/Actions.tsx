import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/native'
import Action from './Action'
import { IStoryActionCallbacks } from './types'
import FeedItem from '@detox/store/models/FeedItem'

const CardActions = styled.View`
  flex-direction: row;
`

export interface IActionProps extends IStoryActionCallbacks {
  story: FeedItem
}

const Actions = observer((props : IActionProps) => {
  const {
    story,
    onFavoriteTouched,
    onMarkAsReadTouched,
    onOpenOriginalTouched,
    onSnoozeTouched,
    onShowCommentsTouched
  } = props

  const isRead = story?.isRead

  return (
    <CardActions>
      <Action
        textKey={isRead ? "story.actions.unread" : "story.actions.read"}
        iconName={isRead ? 'cancel' : 'done'}
        onPress={() => onMarkAsReadTouched(story)} />

      <Action
        textKey="story.actions.snooze"
        iconName="snooze"
        onPress={() => onSnoozeTouched(story)} />

      <Action
        textKey="story.actions.original"
        iconName="open-in-new"
        onPress={() => onOpenOriginalTouched(story)} />

      <Action
        textKey="story.actions.favorite"
        iconName={story.isFavorite ? "favorite" : 'favorite-outline'}
        onPress={() => onFavoriteTouched(story)} />

      {
        story.article?.commentsUrl && <Action
        textKey="story.actions.comments"
        iconName="comment"
        onPress={() => onShowCommentsTouched(story.article?.commentsUrl)} />
      }
    </CardActions>
  )
})

export default Actions