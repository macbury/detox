import { computed, observable, toJS } from "mobx"
import { Model } from "../core/Model"

export interface PosterColors {
  foreground: string
  background: string
  accent: string
}

export class Poster extends Model {
  @observable
  public blurhash : string
  @observable
  public width : number
  @observable
  public height : number
  @observable
  public url : string
  @observable
  public colors : PosterColors

  @computed
  public get source() {
    return {
      uri: this.url
    }
  }

  public toJS() {
    const {
      id,
      blurhash,
      width,
      height,
      url,
      colors
    } = toJS(this)

    return {
      id, blurhash, width, height, url, colors: colors
    }
  }
}
