import { flow, action } from 'mobx'
import * as UpdateAPK from 'rn-update-apk'
import bind from 'bind-decorator'
import AbstractSoftwareUpdateStore from './base'

/**
 * Check if there is a new version of the application, and download it in the background
 */
export default class SoftwareUpdateStore extends AbstractSoftwareUpdateStore {
  private updater : UpdateAPK.UpdateAPK

  public check = flow(function * (this : SoftwareUpdateStore) {
    if (this.updater != null) {
      return
    }

    // console.log('Hitting for update information: ', this.apkVersionUrl)
    // this.updater = new UpdateAPK.UpdateAPK({
    //   apkVersionUrl: this.apkVersionUrl,
    //   fileProviderAuthority: 'com.detox',
    //   needUpdateApp: this.prepareToDownload,
    //   downloadApkProgress: this.updateDownloadProgress,
    //   downloadApkEnd: this.startUpdateProcess,
    //   onError: this.onUpdateError
    // })

    // this.updater.checkUpdate()
  }.bind(this))

  @bind
  @action
  private onUpdateError(error) {
    this.ui.notifications.showError(error)
  }

  @bind
  @action
  private prepareToDownload(needUpdate) {
    console.log('needUpdate', needUpdate)
    if (needUpdate) {
      needUpdate(true)
      this.refreshState = 'UpToDate'
    } else {
      this.refreshState = 'Downloading'
    }
  }

  @bind
  @action
  private updateDownloadProgress(progress : number) {
    this.progress = progress
    this.refreshState = 'Downloading'
  }

  @bind
  @action
  private startUpdateProcess() {
    console.log('Apk downloaded!')
    this.refreshState = 'ReadyToInstall'
  }
}