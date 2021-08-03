import { computed, observable, flow } from 'mobx'
import { NonPersistableStore } from '../../core/SubStore'

type SoftwareUpdateState = 'Downloading' | 'ReadyToInstall' | 'UpToDate'

export default class SoftwareUpdateStore extends NonPersistableStore {
  @observable
  public progress : number = 0
  @observable
  public refreshState : SoftwareUpdateState = 'UpToDate'

  @computed
  protected get apkVersionUrl() {
    if (this.root.sessions.instanceUrl) {
      return [this.root.sessions.instanceUrl, '/api/software_update'].join('/')
    } else {
      return null
    }
  }

  public check : any

  public clear(): void {

  }
}