import { action, computed, observable } from "mobx";
import { Model } from "../core/Model";
import ChannelsRepository from "../repositories/ChannelsRepository";

export default class GroupOption extends Model {
  @observable
  public selected : boolean

  @computed
  public get channel() {
    return this.getRepository<ChannelsRepository>(ChannelsRepository).get(this.id)
  }

  @action.bound
  public toggle() {
    this.selected = !this.selected
  }
}