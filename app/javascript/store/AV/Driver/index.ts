 
import { NativeModules, NativeEventEmitter } from 'react-native'
import { Media } from '../Media'
import { Driver } from './base'

export type TMediaChangeEvent = {
  id: string
  isPlaying: boolean
  isLoading: boolean
  position: number
  duration: number
  updatedAt: number
  error: string
}

type TOnMediaChange = (event : TMediaChangeEvent) => void
type TOnMediaDispose = (id : string) => void

export interface NativeDriver extends Driver {
  load(id: string, uri : String) : Promise<void>
  isLoaded(id : string) : Promise<boolean>
  unload(id : string) : Promise<void>
  play(id: string) : Promise<boolean>
  pause(id : string) : Promise<boolean>
  setPosition(id : string, position : number) : Promise<boolean>
  playFromPosition(id : string, position : number) : Promise<boolean>
  onMediaChange(callback : TOnMediaChange)
  onMediaDispose(callback : TOnMediaDispose)
}

const AVDriverModule = NativeModules.AVDriverModule as NativeDriver

export default {
  ...AVDriverModule,

  setCurrentMedia(media : Media) : Promise<void> {
    return AVDriverModule.setCurrentMedia(media.toJS() as any)
  },

  onMediaChange(callback : TOnMediaChange) {
    const eventEmitter = new NativeEventEmitter(NativeModules.AVDriverModule)
    return eventEmitter.addListener("media:updateStatus", callback)
  },

  onMediaDispose(callback : TOnMediaDispose) {
    const eventEmitter = new NativeEventEmitter(NativeModules.AVDriverModule)
    return eventEmitter.addListener("media:dispose", callback)
  }
} as NativeDriver