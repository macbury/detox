import { StoryAttachment } from "@detox/api";
import { Model } from "../../core/Model";

import { FeedArticle } from './FeedArticle'
import { FeedVideo } from './FeedVideo'
import { FeedAudio } from './FeedAudio'

export { FeedArticle } from './FeedArticle'
export { FeedVideo } from './FeedVideo'
export { FeedAudio } from './FeedAudio'
export { FeedAttachmentWithPoster } from './FeedAttachmentWithPoster'
export { FeedMedia } from './FeedMedia'

export function buildAttachment(parent: Model, attachment : StoryAttachment) {
  switch (attachment?.__typename) {
    case 'Audio':
      return new FeedAudio(parent, attachment.id)
    case 'Video':
      return new FeedVideo(parent, attachment.id)
    case 'Article':
      return new FeedArticle(parent, attachment.id)

    default:
      console.log('Not supported typename for', attachment)
    break;
  }
}