import { action, observable, flow } from 'mobx'
import { NonPersistableStore } from '../core/SubStore'

type TCallback = (value : string) => void
export type TOption = { key: string, value: string }
export type TOptions = Array<TOption>

type TSelectOptions = {
  titleKey : string
  value: any
  options: TOptions
}

export default class SelectDialogStore extends NonPersistableStore {
  private callback : TCallback
  @observable
  public visible : boolean = false
  @observable
  public titleKey : string = '...'
  @observable
  public value : any
  @observable
  public options : TOptions = []

  @action.bound
  public setValue(val : any) {
    this.value = val
  }

  @action.bound
  public ok(option : TOption) {
    this.callback(option.value)
    this.clear()
  }

  @action.bound
  public show({ titleKey, value, options } : TSelectOptions) : Promise<any> {
    this.clear()
    this.titleKey = titleKey
    this.value = value
    this.options = options
    this.visible = true

    return new Promise<any>((resolve) => {
      this.callback = resolve
    })
  }

  @action.bound
  public dismiss() {
    this.callback(null)
    this.clear()
  }

  @action.bound
  public async clear() {
    this.visible = false
    this.titleKey = '...'
    this.options = []
    this.value = null
  }
}