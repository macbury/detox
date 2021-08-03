import bind from "bind-decorator"
import { observable } from "mobx"
import { WebMedia } from "../WebMedia"

export class MediaVideo extends WebMedia<HTMLVideoElement> {
  @observable
  public width : number
  @observable
  public height : number

  createElement(): HTMLVideoElement {
    const element = document.createElement('video')
    element.className = "detox-media-video"
    document.body.append(element)
    return element
  }

  @bind
  public async toggleFullscreen(): Promise<any> {
    this.htmlEl.requestFullscreen()
  }
}