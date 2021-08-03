import { action } from 'mobx'
import { NonPersistableStore } from '../../core/SubStore'
import BackgroundJobStore from './BackgroundJobsStore'
import SettingsStore from './SettingsStore'

export default class Admin extends NonPersistableStore {
  public readonly backgroundJob : BackgroundJobStore
  public readonly settings : SettingsStore

  constructor(parent) {
    super(parent)
    this.backgroundJob = new BackgroundJobStore(this)
    this.settings = new SettingsStore(this)
  }

  @action.bound
  public clear() {
    super.clear()
    this.settings.clear()
    this.backgroundJob.clear()
  }
}