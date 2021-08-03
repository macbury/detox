import { observable, flow, action, computed } from 'mobx'
import FeedItemsRepository from '@detox/store/repositories/FeedItemsRepository'
import { Stream } from '@detox/api/queries/getVideo'
import { NonPersistableStore } from '../../core/SubStore'
import FeedItem from '../../models/FeedItem'

export default class ViewAudioStore extends NonPersistableStore {
  @observable
  public story : FeedItem

  public fetch = flow(function * (this : ViewAudioStore, storyId : string) {
    this.state = 'Loading'
    this.story = null

    try {
      const items = this.getRepository<FeedItemsRepository>(FeedItemsRepository)
      const story : FeedItem = yield items.find(storyId)
      this.story = story

      this.state = 'Ready'
      yield this.story.reload()

      // TODO: mark as read after end?
      yield this.root.screens.stories.markAsRead(this.story.id)
      this.story.isRead = true
    } catch (e) {
      this.ui.notifications.showError(e, () => fetch(storyId))
    }

    this.state = 'Ready'
  }.bind(this))

  @computed
  public get media() {
    return this.audio?.media
  }

  @computed
  public get audio() {
    return this.story?.audio
  }

  @action.bound
  public clear(): void {
    super.clear()
    this.story = null
    this.state = 'Loading'
  }
}