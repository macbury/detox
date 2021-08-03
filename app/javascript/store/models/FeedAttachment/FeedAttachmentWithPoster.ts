import { observable } from "mobx"
import { StoryAttachment } from "@detox/api"
import { Model } from "../../core/Model"
import FeedItem from "../FeedItem"
import { Poster } from "../Poster"

export abstract class FeedAttachmentWithPoster extends Model {
  @observable
  public poster : Poster

  public get story() {
    return this.parent as FeedItem
  }

  public put({ poster, ...attributes } : Partial<StoryAttachment>) {
    super.put(attributes)

    if (poster) {
      this.poster = new Poster(this, poster.url)
      this.poster.put(poster)
    }
  }

  protected ignoreFieldsSerialization() {
    return [
      ...super.ignoreFieldsSerialization(),
      'poster',
      'media'
    ]
  }

  public toJS() {
    return {
      ...super.toJS(),
      poster: this.poster?.toJS() || null
    }
  }
}