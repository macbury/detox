import { action, flow, observable } from 'mobx'
import getSettings, { Setting } from '@detox/api/queries/getSettings'
import { SettingEnum } from '@detox/api'
import { updateSettingMutation } from '@detox/api/mutations/updateSetting'
import { SubStore } from '../../core/SubStore'

export interface ISettingsStoreBundle {
  all: Setting[]
}

export default class SettingsStore extends SubStore<ISettingsStoreBundle> {
  @observable
  public all: Setting[] = []

  public refresh = flow(function * (this : SettingsStore) {
    yield this.restore()
    this.all = yield getSettings(this.api)
    yield this.persist()
  }.bind(this))

  public openSettingEditor = flow(function * (this : SettingsStore, setting: Setting) {
    switch (setting.valueType) {
      case SettingEnum.String:
        yield this.editTextSetting(setting)
      break;

      default:
        throw `Not supported setting type: ${setting.valueType}`
    }
  }.bind(this))

  private editTextSetting = flow(function * (this : SettingsStore, setting: Setting) {
    const value : string = yield this.ui.input.show({
      titleKey: `screens.admin.settings.dialogs.${setting.key}.title`,
      descriptionKey: `screens.admin.settings.dialogs.${setting.key}.description`,
      multiline: true,
      value: setting.secret ? '' : setting.value
    })

    if (value != null) {
      this.ui.showProgressDialog()
      const { success, error } = yield updateSettingMutation(this.api, {
        key: setting.key,
        value
      })
      yield this.refresh()
      this.ui.hideProgressDialog()
    }
  }.bind(this))

  @action.bound
  public clear(): void {
    super.clear()
    this.all = []
  }

  public get cacheKey() {
    return "Screen/Settings"
  }

  protected toBundle(): ISettingsStoreBundle {
    return {
      all: this.all
    }
  }

  protected loadBundle({ all } : ISettingsStoreBundle): void {
    this.all = all
  }
}