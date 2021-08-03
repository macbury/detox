import { computed, observable, action, flow, reaction } from 'mobx'
import bind from 'bind-decorator'
import { Appearance, ColorSchemeName, Platform } from 'react-native'
import { light, dark, Theme } from '@detox/styleguide/theme'
import getCurrentUserQuery, { CurrentUser, TCurrentUserResult, UserStatus } from '@detox/api/queries/getCurrentUser'
import { CookiesStore } from './core/SubStore'

const DEFAULT_THEME = 'light'
export type ThemeName = 'light' | 'dark' | 'automatic'

export interface ISettingsStoreBundle {
  themeName: string
  collapsed: boolean
  user: CurrentUser
}

export default class SettingsStore extends CookiesStore<ISettingsStoreBundle> {
  @observable
  public collapsed : boolean = false
  @observable
  private targetTheme : string = 'light'
  @observable
  private systemTheme : string
  @observable
  public user : CurrentUser = null

  constructor(root) {
    super(root)
    Appearance.addChangeListener(this.onSystemColorChange)
  }

  protected init() {
    reaction(() => this.targetTheme, this.persist)
    reaction(() => this.systemTheme, this.persist)
    reaction(() => this.collapsed, this.persist)
  }

  @computed
  public get themeName() {
    return this.targetTheme || DEFAULT_THEME
  }

  @action.bound
  private onSystemColorChange({ colorScheme } : { colorScheme : ColorSchemeName }) {
    this.systemTheme = colorScheme
  }

  public refresh = flow(function * (this : SettingsStore) {
    this.systemTheme = Appearance.getColorScheme()

    const {
      currentUser,
      errors
    } : TCurrentUserResult = yield getCurrentUserQuery(this.api)

    if (errors.length > 0) {
      yield this.ui.notifications.showErrors(errors)
      return
    }

    this.user = currentUser

    yield this.persist()
  }.bind(this))

  @action.bound
  public toggleSidebar() {
    this.collapsed = !this.collapsed
  }

  @computed
  public get isAdmin() {
    return this.user?.status === UserStatus.Admin
  }

  public changeTheme = flow(function * (this : SettingsStore) {
    const newTheme = yield this.ui.select.show({
      titleKey: 'screens.admin.settings.dialogs.change_theme.title',
      value: this.targetTheme,
      options: [
        { value: 'automatic', key: 'screens.admin.settings.dialogs.change_theme.keys.automatic' },
        { value: 'dark', key: 'screens.admin.settings.dialogs.change_theme.keys.dark' },
        { value: 'light', key: 'screens.admin.settings.dialogs.change_theme.keys.light' }
      ]
    })

    if (newTheme) {
      this.targetTheme = newTheme
    }
  }.bind(this))

  @computed
  private get selectedTheme() {
    if (this.targetTheme === 'automatic') {
      return this.systemTheme
    } else {
      return this.targetTheme
    }
  }

  @computed
  public get theme() : Theme {
    if (this.selectedTheme === 'dark') {
      return dark
    } else {
      return light
    }
  }

  public get cacheKey(): string {
    return 'Settings'
  }

  public toBundle(): ISettingsStoreBundle {
    const { user, targetTheme, collapsed } = this

    return {
      themeName: targetTheme || null,
      collapsed: collapsed || false,
      user: user || null
    }
  }

  public loadBundle({ themeName, user, collapsed } : ISettingsStoreBundle): void {
    //console.log('Loaded theme', themeName)
    this.targetTheme = themeName
    this.collapsed = collapsed
    this.user = user
  }

  public clear(): void {
    this.targetTheme = 'light'
    this.user = null
    this.persist()
  }
}