import { flow, observable } from "mobx"
import { downloadStoryMutation, DownloadStoryPayload } from "@detox/api/mutations/downloadStory"
import { FeedAttachmentWithPoster } from "./FeedAttachmentWithPoster"
import { getApi } from "../../repositories/ApiRepository"

export class FeedArticle extends FeedAttachmentWithPoster {
  @observable
  public commentsUrl: string
  @observable
  public body : string

  /**
   * Download article body
   */
  public download = flow(function * (this : FeedArticle) {
    const {
      errors,
      story
    } : DownloadStoryPayload = yield downloadStoryMutation(getApi(this), { id: this.story.id })

    if (errors.length > 0) {
      return false
    } else {
      this.story.put(story)

      return true
    }   
  }.bind(this))
}