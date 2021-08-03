import { computed, observable, reaction, toJS } from 'mobx'
import { Model } from '../core/Model'
import { Poster } from '../models/Poster'
import { getPlayer } from '.'
import bind from 'bind-decorator'

export abstract class Media extends Model {
  /**
   * Title shown in notification
   */
  @observable
  public title: string
  /**
   * Artist shown in notification
   */
  @observable
  public channel: string
  /**
   * Url to poster shown in notification
   */
  @observable
  public poster: Poster
  /**
   * Url to playable resource
   */
  @observable
  public uri: string
  /**
   * Duration in seconds
   */
  @observable
  public duration: number
  /**
   * Position in seconds
   */
  @observable
  public position: number = 0
  @observable
  public isLoaded : boolean
  @observable
  public isPlaying : boolean
  @observable
  public isBuffering : boolean
  @observable
  public volume: number = 0
  /**
   * Url used by native app to open screen from notification
   */
  @observable
  public intentUrl: String

  @computed
  public get durationMillis() {
    return this.duration * 1000
  }

  @computed
  public get positionMillis() {
    return this.position * 1000
  }

  /**
   * Load media asset into memory
   */
  abstract load() : Promise<any>
  /**
   * Clears asset from memory
   */
  abstract unload() : Promise<any>
  /**
   * Starts playback if media is loaded
   */
  abstract play() : Promise<any>
  /**
   * Pause current playback
   */
  abstract pause() : Promise<any>
  /**
  * Start playback from position
  */
  abstract playFromPositionAsync(positionMillis : number) : Promise<any>
  /**
  * Set playback from position
  */
  abstract setPositionAsync(positionMillis : number) : Promise<any>
  /**
  * Set media volume
  */
  abstract setVolume(volume : number) : Promise<any>
  /**
   * Sync state with backend, if windows closes all app state is disposed from memory, but media still exists in foreground
   */
  abstract sync() : Promise<any>;

  /**
  * Toggle fullscreen mode
  */
  abstract toggleFullscreen() : Promise<any>

  public initialize() {
    super.initialize()

    reaction(() => this.isPlaying, async (isPlaying) => {
      if (isPlaying) {
        await getPlayer(this).setCurrentMedia(this)
      }
    })
  }

  /**
   * This method should be returning handler used by native and webview to render video or audio
   */
  public abstract getHandler() : any

  public toJS() {
    const {
      id,
      uri,
      title,
      channel,
      duration,
      position,
      volume,
      intentUrl,
    } = toJS(this)

    return {
      id, intentUrl, uri, title, channel, duration, position, volume, poster: this.poster?.toJS()
    }
  }
}