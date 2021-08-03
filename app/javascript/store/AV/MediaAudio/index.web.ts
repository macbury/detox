import { WebMedia } from "../WebMedia"

export class MediaAudio extends WebMedia<HTMLAudioElement> {
  createElement(): HTMLAudioElement {
    return document.createElement('audio')
  }
}