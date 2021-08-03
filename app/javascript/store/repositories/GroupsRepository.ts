import { flow } from 'mobx'
import { Group } from '../models/Group'
import { Repository } from '../core/Repository'
import { getApi } from './ApiRepository'
import getGroupQuery from '@detox/api/queries/getGroup'

export default class GroupsRepository extends Repository<Group> {
  constructor(parent) {
    super(parent, (parent, id) => new Group(parent, id))
  }

  /**
   * Fetch fresh group from the server
   */
  public fetch = flow(function * (this : GroupsRepository, groupId: string) {
    const group = yield getGroupQuery(getApi(this), groupId)
    return this.create(group)
  }.bind(this))

  public findByChannel(channelId: string) : Group[] {
    return this.all.filter((group) => {
      return group.channelIds?.includes(channelId)
    })
  }

  public static getRepoName() {
    return 'GroupsRepository'
  }
}