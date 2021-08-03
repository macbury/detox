import { Media } from '..';
import { Driver } from './base'

class WebDriver implements Driver {
  public async clearCurrentMedia() {
    navigator.mediaSession.metadata = null
  }

  public async setCurrentMedia(media: Media) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: media.title,
      artist: media.channel,
      artwork: media.poster ? [
        { src: media.poster.url }
      ] : []
    })
    navigator.mediaSession.setActionHandler('play', media.play)
    navigator.mediaSession.setActionHandler('pause', media.pause)
  }
}

export default new WebDriver()