import FeedItem from "@detox/store/models/FeedItem";

export interface IStoryActionCallbacks {
  onMarkAsReadTouched(story : FeedItem) : Promise<any>
  onSnoozeTouched(story : FeedItem) : Promise<boolean>
  onFavoriteTouched(story : FeedItem)
  onOpenOriginalTouched(story : FeedItem)
  onShowCommentsTouched(commentsUrl : string)
}