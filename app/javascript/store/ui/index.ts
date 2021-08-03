import { action, observable } from 'mobx'
import NotificationsStore from './NotificationsStore'
import ConfirmDialogStore from './ConfirmDialogStore'
import SoftwareUpdateStore from './SoftwareUpdate'
import InputDialogStore from './InputDialogStore'
import SelectDialogStore from './SelectDialogStore'

export default class UI {
  @observable
  public progressVisible : boolean = false

  public readonly notifications : NotificationsStore
  public readonly confirm : ConfirmDialogStore
  public readonly softwareUpdate : SoftwareUpdateStore
  public readonly input : InputDialogStore
  public readonly select : SelectDialogStore

  constructor(root) {
    this.notifications = new NotificationsStore(root)
    this.confirm = new ConfirmDialogStore(root)
    this.softwareUpdate = new SoftwareUpdateStore(root)
    this.input = new InputDialogStore(root)
    this.select = new SelectDialogStore(root)
  }

  @action.bound
  public showProgressDialog() {
    this.progressVisible = true
  }

  @action.bound
  public hideProgressDialog() {
    this.progressVisible = false
  }
}