import AsyncStorage from '@react-native-community/async-storage'
import { flow, action } from 'mobx'
import { ApolloClient } from 'apollo-client'
import createClient from '@detox/api'
import BaseStorage from './storage/base'
import SessionStore from './SessionStore'
import SettingsStore from './SettingsStore'
import ChannelsStore from './ChannelsStore'
import Screens from './screens'
import UI from './ui'
import { BaseStore } from './core/SubStore'
import FeedItemsRepository from './repositories/FeedItemsRepository'
import ChannelsRepository from './repositories/ChannelsRepository'
import GroupsRepository from './repositories/GroupsRepository'
import ApiRepository from './repositories/ApiRepository'
import { AVManager } from './AV'

export default class RootStore extends BaseStore<any> {
  public readonly channels : ChannelsStore
  public readonly sessions : SessionStore
  public readonly settings : SettingsStore
  
  public readonly screens : Screens
  public readonly ui : UI
  public readonly storage : BaseStorage
  public readonly cookies : BaseStorage

  /**
   * Graphql client for accessing backend api
   */
  public readonly api : ApolloClient<any>

  constructor(storage : BaseStorage, cookies : BaseStorage) {
    super(null)
    this.root = this
    this.cookies = cookies
    this.storage = storage
    this.sessions = new SessionStore(this)
    this.api = createClient(this.sessions)
    this.ui = new UI(this)

    this.screens = new Screens(this)
    this.settings = new SettingsStore(this)
    this.channels = new ChannelsStore(this)

    this.registerRepository(new AVManager(this))
    this.registerRepository(new ApiRepository(this, this.api))
    this.registerRepository(new ChannelsRepository(this))
    this.registerRepository(new FeedItemsRepository(this))
    this.registerRepository(new GroupsRepository(this))
  }

  @action.bound
  public restore() {
    this.settings.restore()
    this.channels.restore()
    this.screens.stories.viewArticle.restore()
    this.screens.admin.settings.restore()
    this.screens.groups.restore()
  }

  @action.bound
  public hydrate(data) {
    this.storage.hydrate(data)
    this.restore()
  }

  /**
   * Load all cached data in all stores. This is first method run after app is boot.
   * If it returns true then splash screen is hidden
   * */
  @action.bound
  public setup() {
    this.sessions.setup()
    this.restore()
    this.state = 'Ready'
    return this.sessions.isLoggedIn
  }

  /**
   * After execution of this method, splash screen is always hidden. This method is run before restore
   * function, and should refresh access token and then start refreshing all data in background
   */
  public refresh = flow(function * (this : RootStore) {
    if (this.sessions.isLoggedIn) {
      yield Promise.all([
        this.settings.refresh(),
        this.channels.refresh(),
        this.screens.groups.refresh(),
        this.screens.stories.unreadFeed.refresh()
      ])
    }
  }.bind(this))

  /**
   * Cleanup all stores and their data
   */
  public clear = flow(function * (this : RootStore) {
    console.log('Clear all')
    this.sessions.clear()
    this.screens.clear()
    this.settings.clear()

    this.storage.clear()
    this.cookies.clear()

    yield AsyncStorage.clear()
  }.bind(this))

  public get cacheKey(): string {
    return ''
  }
  
  protected toBundle() {
    return {}
  }

  protected loadBundle(data: any): void {
    
  }
}
