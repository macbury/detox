import { flow, action, computed } from 'mobx'
import { Order, ObserveStoriesPayload } from '@detox/api'
import bind from 'bind-decorator'
import { watchUpdatedStories } from '@detox/api/subscriptions/storyWasUpdated'
import refreshFeedsMutation, { RefreshAllPayload } from '@detox/api/mutations/refreshFeeds'
import { updateStoryMutation, UpdateStoryResult, UpdateStoryInput } from '@detox/api/mutations/updateStory'
import { NonPersistableStore } from '../../core/SubStore'
import FeedStore from './FeedStore'
import ViewArticleStore from './ViewArticleStore'
import ViewVideoStore from './ViewVideoStore'
import ViewAudioStore from './ViewAudioStore'
import FeedItemsRepository from '../../repositories/FeedItemsRepository'

/**
 * This store streamlines all feed stores into one.
 * Main responsibilities:
 * - mark story as read in other stores
 */
export default class StoriesStore extends NonPersistableStore {
  public readonly viewVideo : ViewVideoStore
  public readonly viewAudio : ViewAudioStore
  public readonly viewArticle : ViewArticleStore

  public readonly archiveFeed : FeedStore
  public readonly unreadFeed : FeedStore
  public readonly favoriteFeed : FeedStore
  private watchStoriesObservable: ZenObservable.Subscription

  constructor(rootStore) {
    super(rootStore)

    this.unreadFeed = new FeedStore(this, {
      unread: true,
      order: Order.Newest
    })

    this.archiveFeed = new FeedStore(this, {
      unread: false,
      order: Order.RecentlyRead
    })

    this.favoriteFeed = new FeedStore(this, {
      order: Order.UnreadFirst,
      favorite: true
    })

    this.viewArticle = new ViewArticleStore(this)
    this.viewVideo = new ViewVideoStore(this)
    this.viewAudio = new ViewAudioStore(this)
  }

  @action.bound
  private onRemoteStoriesChanged(observeStories : ObserveStoriesPayload) {
    const itemsRepo = this.getRepository<FeedItemsRepository>(FeedItemsRepository)

    this.unreadFeed.insertItems(observeStories.new)
    itemsRepo.createAll(observeStories.updated)
    setImmediate(() => itemsRepo.setUnreadStories(observeStories.unreadStories)) //TODO: what would be less hackish way?
  }

  @bind
  public async watchForUpdates() {
    this.getRepository<FeedItemsRepository>(FeedItemsRepository).pullUpdates()

    this.stopWatchingForUpdates()
    this.watchStoriesObservable = (await watchUpdatedStories(this.api)).subscribe(({ data: { observeStories } }) => {
      this.onRemoteStoriesChanged(observeStories)
    })
  }

  @bind
  public stopWatchingForUpdates() {
    try {
      this.watchStoriesObservable?.unsubscribe()
    } catch (e) {
      console.warn("Could not unsubscribe", e)
    }
    this.watchStoriesObservable = null
  }

  @computed
  public get unreadCount() {
    const feed = this.getRepository<FeedItemsRepository>(FeedItemsRepository)
    return feed.unreadCount
  }

  @computed
  public get unreadStoryCountText() : string {
    if (!this.unreadCount || this.unreadCount <= 0) {
      return null
    }

    if (this.unreadCount > 999) {
      return '+999'
    }

    return `${this.unreadCount}`
  }

  public sync = flow(function * (this : StoriesStore) {
    const {
      errors
    } : RefreshAllPayload = yield refreshFeedsMutation(this.api)

    if (errors?.length > 0) {
      this.ui.notifications.showErrors(errors)
    } else {
      this.ui.notifications.showSuccess('screens.home.feed.success.sync')
    }
  }.bind(this))

  /**
   * Update story on the backend and update local machine
   * @param attributes - attributes to update
   * @param isRead - what state is this story
   */
  public updateStory = flow(function * (this: StoriesStore, attributes : UpdateStoryInput) {
    const { success, errors } : UpdateStoryResult = yield updateStoryMutation(this.api, attributes)

    if (success) {
      return true
    } else {
      this.ui.notifications.showErrors(errors)
      return false
    }
  }.bind(this))

  /**
   * Mark story as read
   * @param storyId - id of the story to be updated
   */
  public markAsRead = flow(function * (this: StoriesStore, storyId : string) {
    const feedItem = this.getRepository<FeedItemsRepository>(FeedItemsRepository).getOrInitialize(storyId)

    const attrs : UpdateStoryInput = {
      id: storyId,
      isRead: true
    }

    const oldIsRead = feedItem.isRead
    feedItem.isRead = true

    if (!(yield this.updateStory(attrs))) {
      feedItem.isRead = oldIsRead
      return false
    }

    return true
  }.bind(this))

  /**
   * Mark story as unread
   * @param storyId - id of the story to be updated
   */
  public markAsUnRead = flow(function * (this: StoriesStore, storyId : string) {
    const feedItem = this.getRepository<FeedItemsRepository>(FeedItemsRepository).getOrInitialize(storyId)

    const attrs : UpdateStoryInput = {
      id: storyId,
      isRead: false
    }

    const oldIsRead = feedItem.isRead
    feedItem.isRead = false
    if (!(yield this.updateStory(attrs))) {
      feedItem.isRead = oldIsRead
      return false
    }

    return true
  }.bind(this))

  @action.bound
  public clear(): void {
    super.clear()

    this.archiveFeed.clear()
    this.unreadFeed.clear()
    this.viewArticle.clear()
    this.viewVideo.clear()
  }
}