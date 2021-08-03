import { observable, reaction } from "mobx"
import { Media } from "../../AV"
import { Playback } from "../Playback"
import { FeedAttachmentWithPoster } from "./FeedAttachmentWithPoster"

export class FeedMedia<TMedia extends Media> extends FeedAttachmentWithPoster {
  @observable
  public duration: number
  @observable
  public playback : Playback
  @observable
  public media : TMedia

  // public initialize() {
  //   super.initialize()
  // }
}