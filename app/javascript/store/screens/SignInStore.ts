import { Platform } from 'react-native'
import bind from 'bind-decorator'
import { observable, flow, action } from 'mobx'
import signInMutation, { SignInResult } from '@detox/api/mutations/signIn'
import { NonPersistableStore } from '../core/SubStore'
import getDeviceName from '../helpers/deviceInfo'
import generateKey from '../helpers/crypto/generateKey'
import { AuthMode } from '../SessionStore'


/**
 * Used by sign in screen form
 */
export default class SignInStore extends NonPersistableStore {
  @observable
  public instanceUrl : string = ''
  @observable
  public username : string = ''
  @observable
  public password : string = ''

  public clear(): void {
    this.instanceUrl = this.username = this.password = ''
  }

  public get requireInstanceUrl() {
    return Platform.OS !== "web"
  }

  public authorize = flow(function * (this : SignInStore) {
    this.state = 'Loading'
    this.root.sessions.instanceUrl = this.instanceUrl
    const name = yield getDeviceName()

    const {
      privateKey,
      publicKey
    } = yield generateKey()

    try {
      const { errors, sessionId } : SignInResult = yield signInMutation(this.api, {
        username: this.username,
        password: this.password,
        name,
        publicKey
      })

      if (errors?.length > 0) {
        this.state = 'Ready'
        this.ui.notifications.showErrors(errors)
        return true
      }
      
      this.root.sessions.authKey = privateKey
      this.root.sessions.authMode = AuthMode.PrivateKey
      this.root.sessions.sessionId = sessionId
      this.root.sessions.persist()
      yield this.root.refresh()
      this.state = 'Ready'
      this.clear()
      this.ui.notifications.showSuccess('devise.sessions.signed_in')
      return true
    } catch (e) {
      this.state = 'Ready'
      this.ui.notifications.showError(e)
      return false
    }
  }.bind(this))

  @bind
  @action
  public setInstanceUrl(newInstanceUrl : string) {
    this.instanceUrl = newInstanceUrl
  }

  @bind
  @action
  public setPassword(newPassword : string) {
    this.password = newPassword
  }

  @bind
  @action
  public setUsername(newUsername : string) {
    this.username = newUsername
  }
}