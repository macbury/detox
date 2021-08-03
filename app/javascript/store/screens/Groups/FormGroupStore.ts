import Fuse from 'fuse.js'
import { action, computed, observable, flow } from "mobx";
import createGroupMutation, { CreateGroupPayload, CreateGroupInput } from '@detox/api/mutations/createGroup'
import updateGroupMutation, { UpdateGroupPayload } from '@detox/api/mutations/updateGroup'
import { NonPersistableStore } from "../../core/SubStore";
import { Group } from '../../models/Group';
import GroupOption from '../../models/GroupOption';
import GroupOptionsRepository from '../../repositories/GroupOptionsRepository';
import GroupsRepository from '../../repositories/GroupsRepository';

export default class FormGroupStore extends NonPersistableStore {
  @observable
  private groupId : string = ''
  @observable
  public query : string = ''
  @observable
  public name : string
  @observable
  public icon : string
  @observable
  public options : GroupOption[] = []
  private optionsRepo : GroupOptionsRepository
  
  public init() {
    this.optionsRepo = this.registerRepository(new GroupOptionsRepository(this))
  }

  @action.bound
  private prepareOptions() {
    this.options = this.optionsRepo.createAll(this.root.channels.all)
    this.options.forEach((option) => option.selected = false)
  }

  public load = flow(function * (this : FormGroupStore, groupId: string) {
    this.initNewForm()
    this.state = 'Loading'
    console.log('Load group with id', groupId)

    const model : Group = yield this.getRepository<GroupsRepository>(GroupsRepository).fetch(groupId)
    
    this.name = model.name
    this.icon = model.icon
    this.groupId = model.id
    
    this.optionsRepo.createAll(model.channels).forEach((option) => option.selected = true)

    this.state = 'Ready'

    return model
  }.bind(this))

  public create = flow(function * (this : FormGroupStore) {
    this.state = 'Saving'

    const {
      errors,
      group
    } : CreateGroupPayload = yield createGroupMutation(this.api, this.input)

    const success = !!group

    if (success) {
      this.root.screens.groups.push(group)
      yield this.ui.notifications.showSuccess('screens.home.new_group.notifications.success.saved')
    } else {
      yield this.ui.notifications.showErrors(errors)
    }

    this.state = 'Ready'

    return success
  }.bind(this))

  public update = flow(function * (this : FormGroupStore) {
    this.state = 'Saving'

    const {
      errors,
      group
    } : UpdateGroupPayload = yield updateGroupMutation(this.api, {
      id: this.groupId,
      ...this.input
    })

    const success = !!group

    if (success) {
      const model = this.getRepository<GroupsRepository>(GroupsRepository).create(group)
      yield this.screens.groups.show.refreshGroup(model)
      yield this.ui.notifications.showSuccess('screens.home.edit_group.notifications.success.saved')
    } else {
      yield this.ui.notifications.showErrors(errors)
    }

    this.state = 'Ready'

    return success
  }.bind(this))

  @action.bound
  public initNewForm() {
    this.groupId = null
    this.query = ''
    this.icon = ''
    this.name = ''
    this.prepareOptions()
  }

  @computed
  private get input() : CreateGroupInput {
    return {
      name: this.name,
      icon: this.icon,
      channelIds: this.selectedChannels.map(({ id }) => id)
    }
  }

  @computed
  private get selectedChannels() {
    return this.options.filter(({ selected }) => (selected))
  }

  @computed
  public get selectedCount() {
    return this.selectedChannels.length
  }

  @computed
  private get fuzzySearch() {
    return new Fuse(this.options, {
      keys: ['name']
    });
  }

  @computed
  public get filteredOptions() : GroupOption[] {
    return this.query.length > 0 ? this.fuzzySearch.search(this.query).map(result => result.item) : this.options
  }

  @action.bound
  public setQuery(newQuery : string) {
    this.query = newQuery
  }

  @action.bound
  public setName(name : string) {
    this.name = name
  }

  @action.bound
  public setIcon(icon : string) {
    this.icon = icon
  }

  @action.bound
  public clear(): void {
    this.groupId = null
    this.query = ''
    this.options = []
    this.icon = ''
    this.name = ''
    super.clear()
  }
}