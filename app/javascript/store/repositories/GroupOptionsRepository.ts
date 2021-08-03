
import GroupOption from '../models/GroupOption'
import { Repository } from '../core/Repository'

export default class GroupOptionsRepository extends Repository<GroupOption> {
  constructor(parent) {
    super(parent, (parent, id) => new GroupOption(parent, id))
  }

  public static getRepoName() {
    return 'GroupOptionsRepository'
  }
}