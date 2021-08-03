import { observable } from "mobx"
import { NativeMedia } from "../NativeMedia"

export class MediaVideo extends NativeMedia {
  @observable
  public width : number
  @observable
  public height : number
}