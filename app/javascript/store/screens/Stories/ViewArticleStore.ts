import { flow, observable, computed, action, toJS } from 'mobx'
import {RewriteRuleEnum } from '@detox/api'
import getArticleQuery, { Story } from '@detox/api/queries/getArticle'

import { SubStore } from '../../core/SubStore'
import FeedItemsRepository from '../../repositories/FeedItemsRepository'
import FeedItem from '../../models/FeedItem'

export interface IViewArticleStoreBundle {
  story?: FeedItem
}

export default class ViewArticleStore extends SubStore<IViewArticleStoreBundle> {
  @observable
  public story : FeedItem
  @observable
  private storyId : string
  @observable
  private fullBody : boolean

  /**
   * Load only new story(different storyId)
   */
  public fetch = flow(function * (this : ViewArticleStore, storyId : string, fullBody? : boolean) {
    yield this.root.sessions.saveSharedAccessToken()

    if (this.storyId === storyId && storyId) {
      return
    }

    this.storyId = storyId
    this.fullBody = fullBody

    yield this.reload()
  }.bind(this))

  /**
   * Reload newest version of current story from server
   */
  public reload = flow(function * (this : ViewArticleStore) {
    this.story = null
    this.state = 'Loading'
    
    const repo = this.getRepository<FeedItemsRepository>(FeedItemsRepository)
    
    console.log('Reload...')
    try {
      const data = yield getArticleQuery(this.api, this.storyId, this.fullBody)
      
      if (data) {
        this.story = yield repo.create(data)
        yield this.story.markAsRead()
      }
    } catch (e) {
      this.ui.notifications.showError(e, () => fetch(this.storyId))
    }
    
    this.state = 'Ready'
    yield this.persist()
  }.bind(this))

  public download = flow(function * (this : ViewArticleStore) {
    this.state = 'Loading'
    yield this.story.article.download()
    this.state = 'Ready'
  }.bind(this))

  @computed
  public get article() {
    return this.story?.article
  }

  @computed
  public get poster() {
    if (this.channel?.supportRewriteRule(RewriteRuleEnum.InsertPoster)) {
      return this.article?.poster
    } else {
      return null
    }
  }

  @computed
  public get channel() {
    return this.story?.channel
  }

  public get cacheKey(): string {
    return 'ViewArticle'
  }

  @computed
  public get articleUrl() {
    return [
      this.root.sessions.instanceUrl,
      'article',
      this.storyId,
      'read'
    ].join('/') + '?t=' + this.story?.updatedAt
  }

  @action.bound
  public toBundle(): IViewArticleStoreBundle {
    return {
      story: this.story?.toJS()
    }
  }

  @action.bound
  public loadBundle({ story }: IViewArticleStoreBundle): void {
    if (story) {
      this.story = this.getRepository<FeedItemsRepository>(FeedItemsRepository).create(story)
      this.storyId = story?.id
    }
  }

  @action.bound
  public clear(): void {
    super.clear()
    this.storyId = null
    this.story = null
    this.fullBody = false
  }
}
