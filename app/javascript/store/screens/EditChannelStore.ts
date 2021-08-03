import { observable, action, flow, computed } from 'mobx'
import { getChannel, Channel, TChannelResult } from '@detox/api/queries/getChannel'
import updateChannelMutation, { TUpdateResult, UpdateChannelInput, ChannelStatus } from '@detox/api/mutations/updateChannel'
import reimportStoriesMutation from '@detox/api/mutations/reimportStories'
import { NonPersistableStore } from '../core/SubStore'
import { RewriteRuleEnum } from '@detox/api'

export default class EditChannelStore extends NonPersistableStore {
  @observable
  public channel : Channel

  /**
   * This is input sent to server on update
   */
  @computed
  private get updateInput() : UpdateChannelInput {
    const {
      id,
      name,
      siteUrl,
      source,
      userAgent,
      downloadPage,
      extractionRules,
      rejectRules,
      rewriteRules,
      blockRules
    } = this.channel

    return {
      id,
      name,
      siteUrl,
      source,
      userAgent,
      downloadPage,
      extractionRules,
      rejectRules,
      rewriteRules,
      blockRules
    }
  }

  /**
   * Load channel from server
   */
  public load = flow(function * (this : EditChannelStore, channelId: string) {
    if (this.channel?.id === channelId) {
      return
    }

    this.state = 'Loading'

    this.clear()

    const { channel } : TChannelResult = yield getChannel(this.api, channelId)
    this.channel = channel
    this.state = 'Ready'
  }.bind(this))

  /**
   * Save changes on the server
   */
  public save = flow(function * (this : EditChannelStore) {
    this.state = 'Saving'

    const { success, errors } : TUpdateResult = yield updateChannelMutation(this.api, this.updateInput)

    if (success) {
      yield this.ui.notifications.showSuccess('screens.home.edit_channel.notifications.success.saved')
    } else {
      yield this.ui.notifications.showErrors(errors)
    }

    this.state = 'Ready'
    return success
  }.bind(this))

  /**
   * Unsubscribe from edited channel
   */
  public unsubscribe = flow(function * (this : EditChannelStore) {
    if (!(yield this.ui.confirm.show('screens.home.edit_channel.message.unsubscribe'))) {
      return false
    }

    this.state = 'Loading'

    const { success, errors } : TUpdateResult = yield updateChannelMutation(this.api, {
      id: this.channel.id,
      status: ChannelStatus.Archived
    })

    if (success) {
      yield this.root.channels.refresh()

      yield this.ui.notifications.showSuccess('screens.home.edit_channel.notifications.success.unsubscribe')
    } else {
      yield this.ui.notifications.showErrors(errors)
      this.state = 'Ready'
    }

    return success
  }.bind(this))

  public reimport = flow(function * (this : EditChannelStore) {
    if (!(yield this.ui.confirm.show('screens.home.edit_channel.message.reimport'))) {
      return false
    }

    this.ui.showProgressDialog()
    yield reimportStoriesMutation(this.api, this.channel.id)
    yield this.screens.showChannel.clear()
    yield this.screens.showChannel.load(this.channel.id)
    this.ui.hideProgressDialog()

    return true
  }.bind(this))

  @action.bound
  public setName(name: string) {
    this.channel.name = name
  }

  @action.bound
  public toggleRewriteRule(rule: RewriteRuleEnum) {
    const ruleIndex = this.channel.rewriteRules.indexOf(rule)

    if (ruleIndex === -1) {
      this.channel.rewriteRules = [rule, ...this.channel.rewriteRules]
    } else {
      this.channel.rewriteRules = this.channel.rewriteRules.filter((existRule) => existRule !== rule)
    }
  }

  @action.bound
  public setSiteUrl(siteUrl: string) {
    this.channel.siteUrl = siteUrl
  }

  @action.bound
  public setChannelUrl(source: string) {
    this.channel.source = source
  }

  @action.bound
  public setUserAgent(userAgent: string) {
    this.channel.userAgent = userAgent
  }

  @action.bound
  public setDownloadPage(downloadPage: boolean) {
    this.channel.downloadPage = downloadPage
  }

  @action.bound
  public setExtractionRules(extractionRules: string) {
    this.channel.extractionRules = extractionRules
  }

  @action.bound
  public setRejectRules(rejectRules: string) {
    this.channel.rejectRules = rejectRules
  }

  @action.bound
  public setBlockRules(blockRules: string) {
    this.channel.blockRules = blockRules
  }

  @action.bound
  public clear(): void {
    this.channel = null
  }
}