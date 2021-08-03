import Fuse from 'fuse.js'
import { observable, action, flow, computed } from 'mobx'
import discoveryChannelMutation, { DiscoverPayload, DiscoveredChannel } from '@detox/api/mutations/discoverChannel'
import subscribeMutation, { SubscribeResult } from '@detox/api/mutations/subscribe'
import { NonPersistableStore } from '../core/SubStore'
import { Channel } from '../models/Channel'

const THROTTLE_SEARCH_TIMEOUT = 1000

export type TSearchField = 'focused' | 'unfocused' 

export default class DiscoveryChannelStore extends NonPersistableStore {
  private triggerQueryTimer : any
  @observable
  public discoveredChannels : DiscoveredChannel[] = []
  /**
   * This is url for which we want to check if there is any channel
   */
  @observable
  public query : string = ''

  @observable
  public fieldStatus : TSearchField = 'unfocused'

  @computed
  private get fuzzySearch() {
    return new Fuse(this.channels, {
      keys: ['name'],
      isCaseSensitive: false,
      minMatchCharLength: 5
    });
  }

  @computed
  public get filteredChannels() : Channel[] {
    if (this.query.length > 0) {
      return this.fuzzySearch.search(this.query).map((result) => result.item)
    } else {
      return this.channels
    }
  }

  @computed
  public get channels() {
    return this.root.channels.all
  }

  @computed
  public get isSearching() {
    return this.fieldStatus === 'focused' || this.query.length > 0
  }

  @action.bound
  public focus() {
    this.fieldStatus = 'focused'
  }

  @action.bound
  public blur() {
    this.fieldStatus = 'unfocused'
  }

  /**
   * Update query value and trigger search on the server
   * @param newQuery
   */
  @action.bound
  public setQuery(newQuery : string) {
    this.query = newQuery
    this.discoveredChannels = []

    clearTimeout(this.triggerQueryTimer)

    if (this.query.length > 0) {
      this.state = 'Loading'
      this.triggerQueryTimer = setTimeout(this.search, THROTTLE_SEARCH_TIMEOUT)
    } else {
      this.search()
    }
  }

  public refresh = flow(function * (this : DiscoveryChannelStore) {
    this.state = "Loading"
    yield this.root.channels.refresh()
    this.state = "Ready"
  }.bind(this))

  /**
   * Subscribe to new channel. If subscribed with success function returns channelId, otherwise you will get false
   */
  public subscribe = flow(function * (this : DiscoveryChannelStore, channel : DiscoveredChannel) {
    if (!(yield this.ui.confirm.show('screens.home.discovery_channel.confirm'))) {
      return false
    }

    const { source, kind } = channel
    const { errors, channelId } : SubscribeResult = yield subscribeMutation(this.api, { source, kind })

    if (errors?.length > 0) {
      this.ui.notifications.showErrors(errors)
      return false
    } else {
      yield this.root.channels.refresh()
      return channelId
    }
  }.bind(this))

  private search = flow(function * (this : DiscoveryChannelStore) {
    clearTimeout(this.triggerQueryTimer)

    if (this.query.length === 0 || this.filteredChannels.length > 0) {
      this.state = 'Ready'
      return
    }

    const {
      channels,
      errors
    } : DiscoverPayload = yield discoveryChannelMutation(this.api, this.query)

    if (errors?.length > 0) {
      this.ui.notifications.showErrors(errors)
    } else {
      this.discoveredChannels = channels
    }

    this.state = 'Ready'
  }.bind(this))

  @computed
  public get nothingFound() {
    return !this.isLoading && this.discoveredChannels.length === 0 && this.query.length > 0
  }

  @action.bound
  public clear(): void {
    this.query = ''
    this.discoveredChannels = []
    clearTimeout(this.triggerQueryTimer)
  }
}