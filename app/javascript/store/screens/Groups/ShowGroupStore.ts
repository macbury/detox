import { action, flow, observable, reaction } from "mobx";
import { NonPersistableStore } from "../../core/SubStore";
import FeedStore, { TFeedStoreOptions } from "../Stories/FeedStore";
import { Group } from "../../models/Group";
import { StoryKind, Order } from "@detox/api";

export default class ShowGroupStore extends NonPersistableStore {
  @observable
  public isFocused : boolean
  @observable
  public groupId : string
  @observable
  public group : Group
  public readonly feed : FeedStore

  constructor(parent) {
    super(parent)
    this.feed = new FeedStore(this)

    reaction(() => this.groupId, async () => {
      console.log('Refresh group id')
      await this.refresh()
    })
  }

  @action.bound
  public setFocused(f : boolean) {
    this.isFocused = f
  }

  public refresh() {
    return this.runOnce(this.fetchGroupAndFeed())
  }

  protected fetchGroupAndFeed = flow(function * (this : ShowGroupStore) {
    this.state = 'Loading'
    this.group = null
    this.group = yield this.screens.groups.find(this.groupId)
    this.feed.setOptions({
      kind: StoryKind.All,
      order: Order.UnreadFirst,
      groupId: this.groupId
    })
    this.state = 'Ready'
  }.bind(this))

  public refreshGroup = flow(function * (this : ShowGroupStore, model: Group) {
    if (model.id === this.groupId) {
      console.log('Refreshing current group')
      yield this.feed.refresh()
    }
  }.bind(this))

  @action.bound
  public setGroupId(groupId : string) {
    this.groupId = groupId
  }

  @action.bound
  public clear() {
    this.feed.clear()
    this.group = null
    this.groupId = null
  }
} 