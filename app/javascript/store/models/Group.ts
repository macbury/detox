import { computed, observable, flow, action } from "mobx"
import { Model } from "../core/Model"
import ChannelsRepository from "../repositories/ChannelsRepository"
import { Channel } from "./Channel"

export class Group extends Model {
  @observable
  public name : string
  @observable
  public icon : string
  @observable
  public channelIds : string[]
  @observable
  public unread : number

  @action.bound
  public incUnreadCount() {
    this.unread += 1
  }

  @action.bound
  public decUnreadCount() {
    this.unread -= 1;

    if (this.unread < 0) {
      this.unread = 0;
    }
  }

  @computed
  public get channels() : Array<Channel> {
    return this.getRepository<ChannelsRepository>(ChannelsRepository).getAll(this.channelIds)
  }

  @computed
  public get bubbleCount() {
    if (this.unread > 999) {
      return '+999'
    } else if (this.unread > 0) {
      return `${this.unread}`
    } else {
      return null
    }
  }

  protected ignoreFieldsSerialization() {
    return [
      ...super.ignoreFieldsSerialization(),
      'bubbleCount',
      'fetchUnreadCount',
      'channels'
    ]
  }

  public put({ bubbleCount, channels, ...attributes }: Partial<Group>) {
    super.put(attributes)
    if (channels) {
      this.channelIds = channels.map(({ id }) => id)
    }
  }
}