import { observable, flow, action, toJS } from 'mobx'
import { TChannelListResult, getChannels } from '@detox/api/queries/getChannels'
import { SubStore } from './core/SubStore'
import ChannelsRepository from './repositories/ChannelsRepository'
import { Channel } from './models/Channel'

interface IChannelsStoreBundle {
  channels : Channel[]
}

export default class ChannelsStore extends SubStore<IChannelsStoreBundle> {
  @observable
  public all : Channel[] = []

  public find(channelId : string) {
    return this.all.find(({ id }) => channelId === id)
  }

  public refresh = flow(function * (this : ChannelsStore) {
    if (this.isLoading) {
      return
    }
    this.state = this.all.length > 0 ? 'Refreshing' : 'Loading'

    const {
      errors,
      channels
    } : TChannelListResult = yield getChannels(this.api)

    if (errors.length > 0) {
      this.ui.notifications.showErrors(errors)
    } else {
      this.all = this.getRepository<ChannelsRepository>(ChannelsRepository).createAll(channels)
    }
    
    yield this.persist()
    this.state = 'Ready'
  }.bind(this))

  public get cacheKey(): string {
    return 'Channels'
  }

  public toBundle() {
    const {
      all
    } = this

    return {
      channels: all.map((i) => i.toJS())
    }
  }

  @action.bound
  public loadBundle({ channels }: IChannelsStoreBundle): void {
    this.all = this.getRepository<ChannelsRepository>(ChannelsRepository).createAll(channels || [])
  }

  @action.bound
  public clear(): void {
    super.clear()
    this.all = []
  }
}