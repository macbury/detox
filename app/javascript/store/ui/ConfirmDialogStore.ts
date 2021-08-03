import bind from 'bind-decorator'
import { action, observable } from 'mobx'
import { NonPersistableStore } from '../core/SubStore'

export default class ConfirmDialogStore extends NonPersistableStore {
  private callback : (result : boolean) => void
  @observable
  public visible : boolean = false
  @observable
  public message : string

  @bind
  @action
  public show(messageKey : string) {
    this.message = this.i18n.t(messageKey)
    this.visible = true

    return new Promise<boolean>((resolve) => {
      this.callback = resolve
    })
  }

  @bind
  @action
  public respondWith(result : boolean) {
    this.visible = false
    this.callback(result)
    this.callback = null
  }

  @bind
  @action
  public async clear() {
    this.callback = null
    this.visible = false
    this.message = ''
  }
}