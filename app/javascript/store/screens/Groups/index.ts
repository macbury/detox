import { action, flow, observable } from 'mobx'
import getGroups from '@detox/api/queries/getGroups'

import { SubStore } from '../../core/SubStore'
import { Group } from '../../models/Group'
import GroupsRepository from '../../repositories/GroupsRepository'
import FormGroupStore from './FormGroupStore'
import ShowGroupStore from './ShowGroupStore'

export interface IGroupsBundle {
  items: Group[]
}

export default class Groups extends SubStore<IGroupsBundle> {
  @observable
  public items : Group[] = []
  public readonly new : FormGroupStore
  public readonly edit : FormGroupStore
  public readonly show : ShowGroupStore

  constructor(parent) {
    super(parent)
    this.new = new FormGroupStore(this)
    this.edit = new FormGroupStore(this)
    this.show = new ShowGroupStore(this)
    this.items = []
  }

  public refresh = flow(function * (this : Groups) {
    this.state = this.items.length > 0 ? 'Refreshing' : 'Loading'
    const groups = yield getGroups(this.api)
    this.items = this.getRepository<GroupsRepository>(GroupsRepository).createAll(groups)

    yield this.persist()
    this.state = 'Ready'
  }.bind(this))

  public find = flow(function * (this : Groups, groupId: string) {
    if (this.items.length === 0) {
      yield this.refresh()
    }

    return this.items.find(({ id }) => groupId === id)
  }.bind(this))

  public get cacheKey(): string {
    return 'Groups'
  }

  protected toBundle(): IGroupsBundle {
    return {
      items: this.items.map((i) => i.toJS())
    }
  }

  protected loadBundle({ items } : IGroupsBundle): void {
    this.items = this.getRepository<GroupsRepository>(GroupsRepository).createAll(items || [])
  }

  @action.bound
  public push(group) {
    const item = this.getRepository<GroupsRepository>(GroupsRepository).create(group)
    this.items.push(item)
    this.persist()
    return item
  }

  public clear() {
    super.clear()
    this.new.clear()
    this.show.clear()
    this.edit.clear()
  }
}