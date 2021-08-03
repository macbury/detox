import bind from 'bind-decorator';
import { computed, observable, action, flow } from 'mobx'
import { ApiRealTimeEndpoint, IApiConfigurationProvider } from '@detox/api'
import OS from '@detox/shared/os'
import { SubStore } from './core/SubStore'
import generateAccessToken from './helpers/crypto/generateAccessToken'

export type TAuthKey = JsonWebKey | string

interface ISessionStoreBundle {
  authKey: TAuthKey
  instanceUrl: string
  sessionId: string
  authMode: AuthMode
}

export enum AuthMode {
  /**
   * Use private key to generate access tokens
   */
  PrivateKey = "PrivateKey",
  /**
   * Use provided access token
   */
  AccessToken = "AccessToken"
}

export const ACCESS_TOKEN_KEY_NAME = 'access-token'

export default class SessionStore extends SubStore<ISessionStoreBundle> implements IApiConfigurationProvider {
  @observable
  public authMode : AuthMode
  @observable
  public authKey : TAuthKey
  @observable
  public sessionId : string
  @observable
  public instanceUrl : string

  public init() {
    this.state = "Loading"

    if (OS !== 'server') {
      setInterval(this.saveSharedAccessToken, 30 * 1000);
    }
  }

  @action.bound
  public setup() {
    this.state = "Loading"
    this.restore()
    this.state = "Ready"
  }

  @computed
  private get endpointUrl() {
    const slash = this.instanceUrl?.endsWith('/') ? '' : '/'
    return [this.instanceUrl, 'data'].join(slash)
  }

  @computed
  public get currentInstanceUrl() {
    if (OS === 'web') {
      return `${document.location.protocol}//${document.location.host}`
    } else {
      return this.instanceUrl
    }
  }

  @computed
  public get isSignedIn() : boolean {
    return !!(this.currentInstanceUrl && this.authKey)
  }

  public get isLoggedIn() {
    return this.isSignedIn
  }

  public get cacheKey(): string {
    return 'Sessions'
  }

  public toBundle() {
    const {
      authKey,
      sessionId,
      instanceUrl,
      authMode
    } = this

    return {
      authMode,
      authKey,
      sessionId,
      instanceUrl
    }
  }

  @action
  public loadBundle(data: ISessionStoreBundle): void {
    const {
      authKey,
      authMode,
      sessionId,
      instanceUrl
    } = data
    
    this.authMode = authMode
    this.sessionId = sessionId
    this.authKey = authKey
    this.instanceUrl = instanceUrl
  }

  @bind
  public async saveSharedAccessToken() {
    if (this.isLoggedIn && this.authMode === AuthMode.PrivateKey) {
      const accessToken = await this.getAccessToken()
      this.cookies.set(ACCESS_TOKEN_KEY_NAME, accessToken)
    }
  }

  @computed
  public get apiExplorerPath() {
    const slash = this.instanceUrl?.endsWith('/') ? '' : '/'
    return [this.instanceUrl, 'explorer'].join(slash) 
  }

  @bind
  public async getAccessToken() : Promise<TAuthKey> {
    if (this.authMode === AuthMode.PrivateKey) {
      return await generateAccessToken(this.authKey, this.sessionId)
    } else {
      return this.authKey
    }
  }

  /**
   * Fetch method used by apollo client
   * @param _uri
   * @param options
   */
  @bind
  public async apiFetch(_uri, options : RequestInit) : Promise<Response> {
    if (this.isSignedIn) {
      const accessToken = await this.getAccessToken()
      // @ts-ignore
      options.headers.Authorization = `Token token=${accessToken}`
    }

    options.headers['via-client'] = OS
    return await fetch(this.endpointUrl, options)
  }

  @bind
  public async apiRealTimeEndpoint() {
    const token = await this.getAccessToken()
    if (OS === 'web') {
      return `wss://${document.location.host}/data/subscription?token=${token}`
    } else {
      const wsEndpoint = this.instanceUrl.replace(/^http/i, 'ws')
      return `${wsEndpoint}/data/subscription?token=${token}`
    }
  }

  @action.bound
  public logout() {
    this.clear()
    this.root.clear()
  }

  public signOut = flow(function * (this : SessionStore) {
    if (!(yield this.ui.confirm.show('dialogs.sessions.sign_out.title'))) {
      return false
    }
    this.logout()
  }.bind(this))

  @action.bound
  public clear(): void {
    this.authKey = null
    this.authMode = AuthMode.PrivateKey
    this.instanceUrl = null
    this.sessionId = null
  }
}