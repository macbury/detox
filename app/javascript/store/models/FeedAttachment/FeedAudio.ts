import { flow } from "mobx"
import { getAudioStreamQuery, Audio } from "@detox/api/queries/getAudio"
import { audioPath } from "@detox/shared/urls"
import { getPlayer, MediaAudio } from "../../AV"
import { FeedMedia } from "./FeedMedia"
import { getApi } from "../../repositories/ApiRepository"

export class FeedAudio extends FeedMedia<MediaAudio> {
  public put(attributes : Partial<Audio>) {
    super.put(attributes)

    this.media = getPlayer(this).createAudio(this.story.id, {
      duration: this.duration,
      title: this.story.title,
      channel: this.story?.channel?.name,
      position: this.playback?.position || 0,
      poster: this.poster,
      __typename: this.__typename,
      intentUrl: audioPath(this.story.id).web.path
    })
  }

  public loadStream = flow(function * (this : FeedAudio) {
    if (!this.media.uri) {
      yield this.story.reload()

      console.log('Loading audio stream for', this.getParentId())
      this.media.uri = yield getAudioStreamQuery(getApi(this), this.getParentId())
      yield this.media.load()
    }
  }.bind(this))
}