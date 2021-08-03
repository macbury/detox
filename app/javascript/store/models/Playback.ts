import { computed, observable, toJS } from "mobx"
import { PlaybackStatus, Playback as GraphqlPlayback } from "../../api"
import dayjs from "../../shared/dayjs"
import { Model } from "../core/Model"

export class Playback extends Model {
  @observable
  public position : number
  @observable
  public duration : number
  @observable
  public resumedAt: dayjs.Dayjs
  @observable
  public status : PlaybackStatus

  public put({ resumedAt, ...attributes } : Partial<GraphqlPlayback>) {
    super.put(attributes)

    this.resumedAt = resumedAt ? dayjs(resumedAt) : null
  }

  public toJS() {
    const {
      id,
      position,
      duration,
      resumedAt,
      status,
    } = toJS(this)

    return {
      id, resumedAt: resumedAt?.toISOString() || null, position, duration, status
    }
  }
}
