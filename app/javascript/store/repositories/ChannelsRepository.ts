import { Repository } from '../core/Repository'
import { Channel } from '../models/Channel'

export default class ChannelsRepository extends Repository<Channel> {
  constructor(parent) {
    super(parent, (parent, id) => new Channel(parent, id))
  }

  public static getRepoName() {
    return 'ChannelsRepository'
  }
}