import bind from 'bind-decorator'
import { observable, action, ObservableMap, reaction, runInAction } from 'mobx'
import { Node } from '../core/SubStore'
import { Media } from './Media'
import { MediaAudio } from './MediaAudio/index'
import Driver from './Driver'
import { MediaVideo } from './MediaVideo'

type MediaAsset = Media | MediaAudio

/**
 * Just simple wrapper that allows easy access to player
 */
export class AVManager extends Node {
  protected readonly items : ObservableMap<string, MediaAsset>
  /**
   * Currently playing, paused media
   */
  @observable
  public currentMedia : Media

  constructor(parent: Node) {
    super(parent)
    this.items = observable.map({})

    reaction(() => this.currentMedia, this.onCurrentMediaChange)
  }

  @bind
  private async onCurrentMediaChange(newMedia : Media) {
    if (newMedia) {
      await Driver.setCurrentMedia(newMedia)
    } else {
      await Driver.clearCurrentMedia()
    }
  }

  public async setCurrentMedia(nextMedia: Media) {
    if (nextMedia === null || this.currentMedia?.id !== nextMedia.id) {
      const oldMedia = this.currentMedia
      runInAction(() => this.currentMedia = nextMedia)
      if (oldMedia) {
        await oldMedia.unload()
      }
    }
  }

  @action.bound
  public createAudio(id : string, attributes : Partial<MediaAsset> | Partial<any> = {}) {
    let item = this.items.get(id) as MediaAudio
    if (!item) {
      item = new MediaAudio(this, id)
      this.items.set(item.id, item)
      item.sync()
    }
    item.put(attributes as any)
    return item
  }

  @action.bound
  public createVideo(id : string, attributes : Partial<MediaAsset> | Partial<any> = {}) {
    let item = this.items.get(id) as MediaVideo
    if (!item) {
      item = new MediaVideo(this, id)
      this.items.set(item.id, item)
      item.sync()
    }
    item.put(attributes as any)
    return item
  }

  public static getRepoName() {
    return 'AV'
  }
}

export function getPlayer(repo : Node) {
  return repo.getRepository<any>(AVManager) as AVManager
}