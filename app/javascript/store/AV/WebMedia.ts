import bind from "bind-decorator"
import { action, flow } from "mobx"
import { Media } from "./Media"
import { updatePlaybackMutation } from "@detox/api/mutations/updatePlayback";
import { getApi } from "../repositories/ApiRepository";
import FeedItemsRepository from "../repositories/FeedItemsRepository";

export type ElementType = HTMLAudioElement | HTMLVideoElement

export abstract class WebMedia<Element extends ElementType> extends Media {
  protected htmlEl : Element

  abstract createElement() : Element;

  /**
   * Send state to backend for current playback
   */
  @bind
  public async uploadState() {
    const {
      story
    } = await updatePlaybackMutation(getApi(this), {
      id: this.id,
      position: this.position,
      isPlaying: this.isPlaying,
      duration: this.duration
    })

    if (story) {
      this.getRepository<FeedItemsRepository>(FeedItemsRepository).create(story)
    }
  }

  public sync = flow(function * (this : WebMedia<Element>) {
    if (this.htmlEl) {
      return
    }

    // TODO: maybe we could find element by its id?
  }.bind(this))

  public setVolume = flow(function * (this : WebMedia<Element>, volume : number) {
    this.volume = volume
    if (this.htmlEl) {
      this.htmlEl.volume = volume
    }
  }.bind(this))

  public playFromPositionAsync = flow(function * (this : WebMedia<Element>, positionMillis : number) {
    this.position = positionMillis / 1000
    if (this.htmlEl) {
      this.htmlEl.currentTime = this.position
      this.htmlEl.play()
    }
  }.bind(this))

  public setPositionAsync = flow(function * (this : WebMedia<Element>, positionMillis : number) {
    this.position = positionMillis / 1000
    
    if (this.htmlEl) {
      this.htmlEl.currentTime = this.position
    } else {
      this.uploadState()
    }
  }.bind(this))

  @action.bound
  private updateStatus() {
    if (!this.htmlEl) {
      this.isPlaying = false
      this.isBuffering = false
      return
    }

    this.isBuffering = false
    this.isPlaying = !!(this.htmlEl.currentTime > 0 &&
      !this.htmlEl.paused &&
      !this.htmlEl.ended &&
      this.htmlEl.readyState > 2);

    if (!isNaN(this.htmlEl.duration)) {
      this.duration = this.htmlEl.duration
    }

    this.position = this.htmlEl.currentTime
    this.volume = this.htmlEl.volume
  }

  public play = flow(function * (this : WebMedia<Element>) {
    this.isBuffering = true
    if (!this.htmlEl) {
      yield this.load()
    }
    this.isBuffering = false
    this.isPlaying = true

    this.htmlEl.play()
  }.bind(this))

  public pause = flow(function * (this : WebMedia<Element>) {
    this.htmlEl?.pause()
    this.isPlaying = false
  }.bind(this))

  public load = flow(function * (this : WebMedia<Element>) {
    if (this.htmlEl) {
      console.warn('Already loaded', this.uri)
      return
    }

    this.htmlEl = this.createElement()
    this.htmlEl.src = this.uri
    this.htmlEl.ontimeupdate = this.updateStatus
    this.htmlEl.currentTime = this.position
    // TODO: position
    this.htmlEl.addEventListener('play', this.uploadState)
    this.htmlEl.addEventListener('pause', this.uploadState)
    this.htmlEl.addEventListener('seeked', this.uploadState)

    this.htmlEl.onerror = () => {
      console.error(this.htmlEl.error)
    }
    this.isLoaded = true
    this.updateStatus()
  }.bind(this))

  public unload = flow(function * (this : WebMedia<Element>) {
    this.htmlEl.removeEventListener('play', this.uploadState)
    this.htmlEl.removeEventListener('pause', this.uploadState)
    this.htmlEl.removeEventListener('seeked', this.uploadState)

    this.htmlEl.pause()
    this.htmlEl.removeAttribute('src')
    this.htmlEl.load()
    this.htmlEl.remove()
    this.htmlEl = null
    this.isPlaying = false
    this.isBuffering = false
    this.isLoaded = false
    this.updateStatus()
  }.bind(this))

  public getHandler() {
    return this.htmlEl;
  }
}