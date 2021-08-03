import { flow, observable } from "mobx"
import { videoPath } from "@detox/shared/urls"
import { getVideoStreamQuery, Stream, Video } from "@detox/api/queries/getVideo"
import { getPlayer, MediaVideo } from "../../AV"
import { FeedMedia } from "./FeedMedia"
import { getApi } from "../../repositories/ApiRepository"

export class FeedVideo extends FeedMedia<MediaVideo> {
  @observable
  public width: number
  @observable
  public height: number

  public put(attributes : Partial<Video>) {
    super.put(attributes)

    this.media = getPlayer(this).createVideo(this.story.id, {
      duration: this.duration,
      title: this.story.title,
      channel: this.story?.channel?.name,
      poster: this.poster,
      width: this.width,
      height: this.height,
      position: this.playback?.position || 0,
      __typename: this.__typename,
      intentUrl: videoPath(this.story.id).web.path
    })
  }

  public loadStream = flow(function * (this : FeedVideo) {
    if (!this.media.uri) {
      yield this.story.reload()

      console.log('Loading video stream for', this.getParentId())
      const streams : Stream[] = yield getVideoStreamQuery(getApi(this), this.getParentId())
      this.media.uri = streams[0].secureUrl
      yield this.media.load()
    }
  }.bind(this))
}