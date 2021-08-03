import { ChannelKind, ChannelStatus, RewriteRuleEnum } from "@detox/api"
import { observable } from "mobx"
import { Model } from "../core/Model"

export class Channel extends Model {
  @observable
  public name : string
  @observable
  public domain : string
  @observable
  public iconUrl : string
  @observable
  public error : string
  @observable
  public kind : ChannelKind
  @observable
  public status : ChannelStatus
  @observable
  public source : string
  @observable
  public rewriteRules : RewriteRuleEnum[]

  public supportRewriteRule(rule : RewriteRuleEnum) {
    return this.rewriteRules?.includes(rule)
  }
}