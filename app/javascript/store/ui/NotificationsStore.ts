import { action, observable } from 'mobx'
import { NonPersistableStore } from '../core/SubStore'

export type TAction = {
  /**
   * I18n key to translation
   */
  name: string
}

const NOTIFICATION_TIMEOUT = 10 * 1000

export interface INotification {
  message: string
  retryAction?()
  action?: TAction
}

/**
 * Manage displaying errors in snackbar
 */
export default class NotificationsStore extends NonPersistableStore {
  @observable
  public current : INotification
  private timeoutHandler : any

  @action
  public show = (notification : INotification) => {
    console.log('Show notification', notification)
    this.current = notification
    clearTimeout(this.timeoutHandler)
    this.timeoutHandler = setTimeout(this.hide, NOTIFICATION_TIMEOUT)
  }

  @action
  public showSuccess(i18nKey : string) {
    this.show({
      message: this.i18n.t(i18nKey)
    })
  }

  @action
  public showErrorKey(i18nKey : string, retryAction?) {
    this.show({
      message: this.i18n.t(i18nKey),
      retryAction
    })
  }

  @action
  public showError(error : Error, retryAction?) {
    console.error(error)
    this.show({
      message: error.toString(),
      retryAction
    })
  }

  @action
  public showErrors(errors : string[], retryAction?) {
    this.show({
      message: errors.join(', '),
      retryAction
    })
  }

  @action
  public hide = () => {
    this.current = null
  }

  @action
  public async clear() {
    this.current = null
  }
}