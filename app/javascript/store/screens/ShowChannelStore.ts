import { observable, action, flow, reaction, toJS } from 'mobx'
import { Order, StoryKind } from '@detox/api'
import { getChannel } from '@detox/api/queries/getChannel'

import FeedStore, { TFeedStoreOptions } from './Stories/FeedStore'
import { NonPersistableStore } from '../core/SubStore'
import { Channel } from '../models/Channel'
import ChannelsRepository from '../repositories/ChannelsRepository'

export interface IShowChannelStoreBundle {
  channel: Channel
}

export default class ShowChannelStore extends NonPersistableStore {
  private waitForStoriesHandle : any
  @observable
  public channel : Channel
  public readonly feed : FeedStore

  constructor(rootStore) {
    super(rootStore)

    this.feed = new FeedStore(this)
  }

  /**
   * Load channel from server
   */
  public load = flow(function * (this : ShowChannelStore, channelId: string) {
    const options : TFeedStoreOptions = {
      kind: StoryKind.All,
      order: Order.Newest,
      channelId
    }

    if (this.channel?.id === channelId && channelId) {
      this.state = 'Ready'
      console.log('Already loaded channel', channelId)
      this.feed.setOptions(options)
      //this.feed.refresh()
      return
    }

    const channelsRepo = this.getRepository<ChannelsRepository>(ChannelsRepository)
    this.clear()

    this.channel = channelsRepo.get(channelId)
    this.state = this.channel ? 'Refreshing' : 'Loading'
    this.feed.setOptions(options)
  
    const { channel } = yield getChannel(this.api, channelId)
    this.channel = channelsRepo.create(channel)
    //this.waitForFeedStories()

    this.state = 'Ready'
  }.bind(this))

  @action.bound
  public stopWaitForStories() {
    if (this.waitForStoriesHandle) {
      clearTimeout(this.waitForStoriesHandle)
    }
  }

  @action.bound
  private waitForFeedStories() {
    this.stopWaitForStories()
    if (!this.feed.isEmpty) {
      return
    }

    this.waitForStoriesHandle = setTimeout(async () => {
      await this.feed.refresh(true)
      this.waitForFeedStories()
    }, 1000)
  }

  public get cacheKey(): string {
    return 'ShowChannel'
  }

  @action.bound
  public clear(): void {
    this.state = 'Loading'
    this.channel = null
    this.feed.clear()
  }
}