import OS from '@detox/shared/os'
import AsyncStorage from '@react-native-community/async-storage'
import bind from 'bind-decorator'
import BaseStorage from './base'

export const KEY_NAMESPACE = '@detox'

/**
 * This storage persists data on the hard drive, used by web and android app
 */
export class DiskStorage extends BaseStorage {
  private data : { [key : string]: any }
  private syncHandler : any

  constructor() {
    super()
    this.data = {}
  }

  public async clear() {
    this.data = {}
    await AsyncStorage.clear()
  }

  public async load() {
    this.hydrate(await DiskStorage.fetchHydration())
  }

  public static async fetchHydration() {
    const data = {}
    const keys = await AsyncStorage.getAllKeys()
    
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      
      try {
        data[key] = JSON.parse(await AsyncStorage.getItem(key))
      } catch (e) {
        console.error(`Could not load key: ${key}`)
      }
    }

    return data
  }

  @bind
  private async persist() {
    const keys = Object.keys(this.data)
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]

      try {
        await AsyncStorage.setItem(key, JSON.stringify(this.data[key]))
      } catch (e) {
        console.error(`Could not save key: ${key}`, e)
      }
    }

    this.syncHandler = null
  }

  public set(key: string, value: any) {
    this.data[key] = value
    this.requestSync()
  }

  public get(key: string, defaultValue: any) {
    return this.data[key] || defaultValue
  }

  public toBundle() {
    return this.data
  }

  private requestSync() {
    if (this.syncHandler) {
      clearTimeout(this.syncHandler)
      this.syncHandler = null
    }

    if (OS === "server") {
      this.persist()
    } else {
      this.syncHandler = setTimeout(this.persist, 1000)
    }
  }
}