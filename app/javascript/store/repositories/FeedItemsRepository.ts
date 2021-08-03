import dayjs from '@detox/shared/dayjs'
import { observable, action, flow, computed } from 'mobx'
import { getUnreadStories, UnreadStories } from '@detox/api/queries/getUnreadStories'
import { getUpdatedStories } from '@detox/api/queries/getUpdatedStories'
import { getApi } from './ApiRepository'
import FeedItem from '../models/FeedItem'
import { Repository } from '../core/Repository'
import GroupsRepository from './GroupsRepository'

export default class FeedItemsRepository extends Repository<FeedItem> {
  @observable
  public unreadCount : number = 0
  
  constructor(parent) {
    super(parent, (parent, id) => new FeedItem(parent, id))
  }

  public static getRepoName() {
    return 'FeedItemsRepository'
  }

  @computed
  private get latestStoryUpdateAt() {
    const sorted = this.all.map(({ updatedAt }) => updatedAt).sort((a, b) => b.diff(a) )
    return sorted[0]
  }

  @action.bound
  public setUnreadStories({ total, groups } : UnreadStories) {
    this.unreadCount = total
    this.getRepository<GroupsRepository>(GroupsRepository).createAll(groups)
  }

  public refreshUnreadCount = flow(function * (this : FeedItemsRepository) {
    this.setUnreadStories(yield getUnreadStories(getApi(this)))
  }.bind(this))

  public pullUpdates = flow(function * (this : FeedItemsRepository) {
    if (!this.latestStoryUpdateAt) {
      return
    }

    const stories = yield getUpdatedStories(getApi(this), this.latestStoryUpdateAt)
    this.createAll(stories)
  }.bind(this))

  /**
   * Find or load story from server
   */
  public find = flow(function * (this : FeedItemsRepository, storyId : string) {
    let story = this.get(storyId)
    if (story) {
      return story
    } else {
      story = this.create({ id: storyId }) 
      yield story.reload()
    }
    
    return story
  }.bind(this))

  @action.bound
  public incUnreadCount() {
    this.unreadCount += 1
  }

  @action.bound
  public incUnreadBy(count : number) {
    this.unreadCount += count
  }

  @action.bound
  public decUnreadCount() {
    this.unreadCount -= 1;

    if (this.unreadCount < 0) {
      this.unreadCount = 0;
    }
  }
}