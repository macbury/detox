import { action, flow } from "mobx"
import { updatePlaybackMutation } from "@detox/api/mutations/updatePlayback"
import { Media } from "./Media"
import Driver from './Driver/index'
import { getApi } from "../repositories/ApiRepository"

export class NativeMedia extends Media {
  private mediaEventListener : any
  private mediaDisposeListener : any

  public sync = flow(function * (this : NativeMedia) {
    if (this.isLoaded) {
      return
    }

    if (yield Driver.isLoaded(this.id)) {
      console.log('Already media is loaded', this.id)
      yield this.load()
    }
  }.bind(this))

  public load = flow(function * (this : NativeMedia) {
    if (this.isLoaded) {
      return false
    }

    this.isLoaded = true
    this.mediaEventListener = Driver.onMediaChange((event) => {
      if (event.id === this.id) {
        //console.log('Received', event)
        this.isBuffering = event.isLoading
        this.isPlaying = event.isPlaying
        
        if (event.position) {
          this.position = event.position
        }

        if (!this.duration) {
          this.duration = event.duration
        }
      }
    })
    this.mediaDisposeListener = Driver.onMediaDispose((id) => {
      if (id === this.id) {
        console.log('Media disposed by user/system')
        this.cleanup()
      }
    })
    // get metadata after loading?
    yield Driver.load(this.id, this.uri)
  }.bind(this))
  
  @action.bound
  private cleanup() {
    this.isPlaying = false
    this.isBuffering = false
    this.isLoaded = false
    if (this.mediaEventListener) {
      this.mediaEventListener.remove()
      this.mediaEventListener = null
    }
    
    if (this.mediaDisposeListener) {
      this.mediaDisposeListener.remove()
      this.mediaDisposeListener = null
    }
  }

  public unload = flow(function * (this : NativeMedia) {
    console.log('Native unload', this.id)
    this.cleanup()
    yield Driver.unload(this.id)
    this.isLoaded = false
  }.bind(this))

  public play = flow(function * (this : NativeMedia) {
    this.isBuffering = true
    if (!this.isLoaded) {
      yield this.load()
    }
    this.isBuffering = false
    this.isPlaying = true

    if (this.position > 0) {
      yield Driver.playFromPosition(this.id, this.position)
    } else {
      yield Driver.play(this.id)
    }
    
  }.bind(this))

  public pause = flow(function * (this : NativeMedia) {
    if (this.isLoaded) {
      yield Driver.pause(this.id)
    }
    this.isPlaying = false
  }.bind(this))
  
  public playFromPositionAsync = flow(function * (this : NativeMedia, positionMillis : number) {
    this.position = positionMillis / 1000
    if (!this.isLoaded) {
      yield this.load()
    }
    yield Driver.playFromPosition(this.id, this.position)
    this.isPlaying = true
  }.bind(this))

  public setPositionAsync = flow(function * (this : NativeMedia, positionMillis : number) {
    this.position = positionMillis / 1000
    if (this.isLoaded) {
      yield Driver.setPosition(this.id, this.position)
    } else {
      yield updatePlaybackMutation(getApi(this), {
        id: this.id,
        position: this.position,
        isPlaying: this.isPlaying,
        duration: this.duration
      })
    }
  }.bind(this))

  public async setVolume(volume: number) {
    console.log('Native is not supporting setting volume')
  }

  public async toggleFullscreen(): Promise<any> {
    throw new Error("Method not implemented.")
  }

  public getHandler() {
    return this.id
  }
}