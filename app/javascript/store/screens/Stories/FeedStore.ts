import { flow, observable, computed, action, reaction, ObservableMap } from 'mobx'
import datejs, { Dayjs } from 'dayjs'
import { Order } from '@detox/api/graphql'
import OS from '@detox/shared/os'
import { getStoriesQuery, getStoriesIdsQuery, TStoryIds, StoryConnection, Story, PageInfo, TStoriesFilters, StoryKind, Variant } from '@detox/api/queries/getStories'
import markStoriesMutation from '@detox/api/mutations/markStories'
import snoozeMutation, { SnoozeResult } from '@detox/api/mutations/snooze'
import { NonPersistableStore } from '../../core/SubStore'
import FeedItemsRepository from '../../repositories/FeedItemsRepository'
import FeedItem from '../../models/FeedItem'
import GroupsRepository from '../../repositories/GroupsRepository'

export interface IFeedBundle {
  stories : Story[]
}

export type TFeedStoreOptions = {
  kind? : StoryKind
  order?: Order
  unread?: boolean
  favorite?: boolean
  channelId?: string
  groupId?: string
  cacheKey?: string
}

/**
 * Manage pagination for one type of feed. Each Tab & page in ui contains copy of this store
 */
export default class FeedStore extends NonPersistableStore {
  /**
   * List of items that should be shown after scrolling to top
   */
  @observable
  private newItems : FeedItem[]
  @observable
  private items : ObservableMap<string, FeedItem>
  @observable
  public page : PageInfo
  @observable
  private date : Dayjs
  @observable
  public totalStoriesCount : number = 0
  @observable
  public options : TFeedStoreOptions
  private currentQueryPromise: Promise<StoryConnection>

  constructor(parent, options? : TFeedStoreOptions) {
    super(parent)
    this.options = options
    this.newItems = []
    this.items = observable.map({})

    reaction(() => (this.options ? Object.values(this.options) : []).join('-'), (currentOptions, oldOptions) => {
      this.refresh(true)
    })
  }

  @computed
  public get newStoriesCount() {
    return this.newItems.length
  }

  @action.bound
  public showNewItems() {
    const hashWithNewItems = observable.map({})
    this.newItems.forEach((item) => hashWithNewItems.set(item.id, item))

    this.items = hashWithNewItems.merge(this.items)
    this.newItems = []
  }

  /**
   * Insert new items at beginning of feed
   * @param newItems 
   */
  @action.bound
  public insertItems(newItems : Story[]) {
    const repo = this.getRepository<FeedItemsRepository>(FeedItemsRepository)

    const newFeedItems = repo.createAll(newItems).filter((item) => item.isKind(this.options.kind))
    this.newItems = [...newFeedItems, ...this.newItems]
  }

  @action.bound
  public setOptions(options : TFeedStoreOptions) {
    this.options = {
      ...this.options,
      ...options
    }
  }

  @computed
  public get all() {
    return [...this.items.values()] // abra kadabra from iterator to array you are
  }

  @computed
  private get storiesId() {
    return this.all.map(({ id }) => id)
  }

  @computed
  public get isEmpty() {
    return this.all.length === 0
  }

  /**
   * Mark next 1000 stories as read in this feed
   */
  public markAllAsRead = flow(function * (this : FeedStore) {
    this.state = 'Loading'
    this.page = null
    this.items.clear()
    const ids : TStoryIds = yield getStoriesIdsQuery(this.api, this.filters)

    if (ids.length > 0) {
      yield markStoriesMutation(this.api, { isRead: true, ids })
      const repo = this.getRepository<FeedItemsRepository>(FeedItemsRepository)
      ids.forEach((storyId) => repo.getOrInitialize(storyId).isRead = true)
      yield this.refresh(true)
    }

    this.state = 'Ready'
  }.bind(this))

  /**
   * Snooze story, to be shown in future
   * @param storyId - id of the story
   */
  public snooze = flow(function * (this: FeedStore, storyId : string) {
    const {
      errors,
      success
    } : SnoozeResult = yield snoozeMutation(this.api, { id: storyId })

    if (success) {
      yield this.ui.notifications.showSuccess('screens.home.feed.success.snooze')
      yield this.remove(storyId)
      return true
    } else {
      yield this.ui.notifications.showErrors(errors)
      return false
    }
  }.bind(this))

  /**
   * Mark multiple stories as read
   */
  public markReadTo = flow(function * (this : FeedStore, toIndex: number) {
    const readStories = this.all.filter((story, index) => {
      return !story.isRead && (index < toIndex)
    })
    const ids = readStories.map(({ id }) => id)

    const repo = this.getRepository<FeedItemsRepository>(FeedItemsRepository)
    ids.forEach((storyId) => repo.get(storyId).isRead = true)

    if (ids.length > 0) {
      yield markStoriesMutation(this.api, { isRead: true, ids })
    }
  }.bind(this))

  /**
   * Reset pagination and fetch newest stories
   */
  public refresh = flow(function * (this : FeedStore, force = false) {
    const feeds = this.getRepository<FeedItemsRepository>(FeedItemsRepository)
    this.page = null
    this.items.clear()
    this.newItems = []
    this.date = datejs()
    
    yield Promise.all([
      feeds.refreshUnreadCount(),
      this.nextPage(force)
    ])
  }.bind(this))

  public nextPage = flow(function * (this : FeedStore, force = false) {
    if (!this.hasNextPage) {
      console.log('Hit end of page')
      return
    }

    if (this.currentQueryPromise) {
      return
    }

    if (this.isLoading && !force) {
      return
    }

    console.log('Loading next page...', this.hasNextPage)
    this.state = 'Loading'
    try {
      this.currentQueryPromise = getStoriesQuery(this.api, this.filters)
      const result : StoryConnection = yield this.currentQueryPromise

      if (result) {
        const {
          nodes,
          pageInfo,
          totalCount
        } = result

        if (!this.page) {
          this.totalStoriesCount = totalCount
        }

        this.page = pageInfo
        const items = this.getRepository<FeedItemsRepository>(FeedItemsRepository).createAll(nodes)
        
        items.forEach((item) => {
          this.items.set(item.id, item)
        })
      }
    } catch (error) {
      console.error(error)
      this.ui.notifications.showError(error)
    }

    this.currentQueryPromise = null
    this.state = 'Ready'
  }.bind(this))

  /**
   * Remove story from local list
   * @param storyId
   */
  @action.bound
  public remove(storyId : string) {
    this.items.delete(storyId)
  }

  @computed
  public get hasNextPage() {
    return this.page ? this.page.hasNextPage : true
  }

  @computed
  private get filters() : TStoriesFilters {
    const base = {
      ...this.options,
      first: 20,
      variant: OS === "web" ? Variant.Desktop : Variant.Mobile,
      startTime: this.date.toISOString()
    }

    if (this.page) {
      return {
        ...base,
        after: this.page.endCursor,
        exceptIds: this.storiesId
      }
    } else {
      return base
    }
  }

  @action.bound
  public clear(): void {
    super.clear()
    this.date = null
    this.page = null
    this.items.clear()
  }
}