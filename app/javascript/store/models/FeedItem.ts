import { computed, flow, observable, reaction, runInAction } from 'mobx'
import { Story, StoryKind } from '@detox/api'
import dayjs from '@detox/shared/dayjs'
import getStoryQuery from '@detox/api/queries/getStory'

import GroupsRepository from '../repositories/GroupsRepository'
import FeedItemsRepository from '../repositories/FeedItemsRepository'
import ChannelsRepository from '../repositories/ChannelsRepository'
import { Model } from '../core/Model'
import { buildAttachment, FeedArticle, FeedVideo, FeedAudio } from './FeedAttachment'
import { getApi } from '../repositories/ApiRepository'
import { updateStoryMutation, UpdateStoryResult, UpdateStoryInput } from '@detox/api/mutations/updateStory'

/**
 * Base story item in feed
 */
export default class FeedItem extends Model {
  @observable
  public title : string
  @observable
  public domain : string
  @observable
  public summary : string
  @observable
  public permalink : string
  @observable
  public isFavorite : boolean
  @observable
  public isRead : boolean
  @observable
  public publishedAt : dayjs.Dayjs
  @observable
  public updatedAt : dayjs.Dayjs
  @observable
  public channelId : string
  @observable
  public attachment : FeedArticle | FeedVideo | FeedAudio

  public initialize() {
    super.initialize()

    reaction(() => this.isRead, (isRead) => {
      const groups = this.getRepository<GroupsRepository>(GroupsRepository).findByChannel(this.channelId)
      const feed = this.getRepository<FeedItemsRepository>(FeedItemsRepository)

      if (isRead) {
        feed.decUnreadCount()
      } else {
        feed.incUnreadCount()
      }

      groups.forEach((group) => {
        if (isRead) {
          group.decUnreadCount()
        } else {
          group.incUnreadCount()
        }
      })
    })
  }

  public reload = flow(function * (this : FeedItem) {
    const data = yield getStoryQuery(getApi(this), this.id)
    this.put(data)
  }.bind(this))

  public isKind(kind : StoryKind) {
    switch(kind) {
      case StoryKind.All:
        return true
      case StoryKind.Playable:
        return !!this.video || !!this.audio
      case StoryKind.Readable:
        return !!this.article
      case StoryKind.Viewable:
        return false
      default:
        throw `Not supported kind: ${kind} for FeedItem`
    }
  }

  @computed
  public get video() {
    if (this.attachment?.__typename === 'Video') {
      return this.attachment as FeedVideo
    } else {
      return null
    }
  }

  @computed
  public get article() {
    if (this.attachment?.__typename === 'Article') {
      return this.attachment as FeedArticle
    } else {
      return null
    }
  }

  @computed
  public get audio() {
    if (this.attachment?.__typename === 'Audio') {
      return this.attachment as FeedAudio
    } else {
      return null
    }
  }

  @computed
  public get channel() {
    return this.getRepository<ChannelsRepository>(ChannelsRepository).get(this.channelId)
  }

  public toggleRead = flow(function * (this: FeedItem) {
    if (this.isRead) {
      return yield this.markAsUnread()
    } else {
      return yield this.markAsRead()
    }
  }.bind(this))

  public markAsUnread = flow(function * (this: FeedItem) {
    this.isRead = false

    const { success } : UpdateStoryResult = yield updateStoryMutation(getApi(this), {
      id: this.id,
      isRead: this.isRead
    })

    return success
  }.bind(this))


  public markAsRead = flow(function * (this: FeedItem) {
    this.isRead = true
    
    const { success } : UpdateStoryResult = yield updateStoryMutation(getApi(this), {
      id: this.id,
      isRead: this.isRead
    })

    return success
  }.bind(this))

  /**
   * Toggle story, favorite
   */
  public toggleFavorite = flow(function * (this: FeedItem) {
    this.isFavorite = !this.isFavorite

    const {
      story,
      success,
      errors
    } = yield updateStoryMutation(getApi(this), { id: this.id, isFavorite: this.isFavorite })

    if (success) {
      this.put(story)

      return true
    } else {
      return false
    }
  }.bind(this))

  public put({ channel, attachment, publishedAt, updatedAt, ...attributes }: Partial<Story>) {
    super.put(attributes)

    if (channel) {
      this.channelId = channel?.id
    }
    
    if (publishedAt) {
      this.publishedAt = dayjs(publishedAt)
    }

    if (updatedAt) {
      this.updatedAt = dayjs(updatedAt)
    }
    
    if (!this.attachment) {
      this.attachment = buildAttachment(this, attachment)
    }

    if (attachment) {
      this.attachment?.put(attachment as any)
    }
  }

  protected ignoreFieldsSerialization() {
    return [
      ...super.ignoreFieldsSerialization(),
      'channel',
      'attachment',
      'publishedAt',
      'updatedAt',
      'video',
      'audio',
      'article'
    ]
  }

  public toJS() {
    const bundle = {
      ...super.toJS(),
      attachment: this.attachment.toJS(),
      updatedAt: this.updatedAt?.toString() || null,
      publishedAt: this.publishedAt?.toString() || null
    }

    return bundle
  }
}