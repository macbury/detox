import { observable, flow, computed } from 'mobx'
import discoverChannelMutation, { DiscoverPayload } from '@detox/api/mutations/discoverChannel'
import subscribeMutation, { SubscribeResult } from '@detox/api/mutations/subscribe'
import { NonPersistableStore } from '../core/SubStore'
import parseOpml, { TFeeds, TFeed } from '../helpers/parseOpml/index'

export default class ImportOpmlStore extends NonPersistableStore {
  @observable
  public items : TFeeds = []
  @observable
  public total : number = 0
  @observable
  public current : TFeed

  public clear(): void {
    this.items = []
  }

  @computed
  public get left() {
    return this.total - this.items.length
  }

  public import = flow(function * (this : ImportOpmlStore, opmlContent : string) {
    this.ui.showProgressDialog()
    this.clear()
    this.state = 'Loading'

    this.items = yield parseOpml(opmlContent)
    this.total = this.items.length

    while(this.items.length > 0) {
      this.current = this.items.shift()

      const { channels, errors: discoveryErrors } : DiscoverPayload = yield discoverChannelMutation(this.api, this.current.feedUrl)

      if (discoveryErrors?.length > 0) {
        yield this.ui.notifications.showErrors(discoveryErrors)
      } else {
        const channel = channels[0]

        if (channel) {
          const {
            kind,
            source
          } = channel

          const { errors: subscribeErrors } : SubscribeResult = yield subscribeMutation(this.api, {
            source,
            kind
          })

          if (subscribeErrors?.length > 0) {
            yield this.ui.notifications.showErrors(subscribeErrors)
          }
        }
      }
    }

    yield this.root.channels.refresh()
    this.current = null
    this.state = 'Ready'
    this.ui.hideProgressDialog()
  }.bind(this))
}