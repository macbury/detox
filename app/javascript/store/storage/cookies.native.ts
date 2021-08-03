import CookieManager from "@react-native-community/cookies"
import url from 'url'
import BaseStorage from './base'

/**
 * This storage persists data as cookies
 */
export class CookiesStorage extends BaseStorage {
  private data : { [key : string]: any }
  private instanceUrl: string

  constructor() {
    super()
    this.data = {}
    this.instanceUrl = 'about:blank'
  }

  public async clear() {
    this.data = {}
    await CookieManager.clearAll()
  }

  public get domain() {
    return url.parse(this.instanceUrl).hostname
  }

  public static async fetchHydration(instanceUrl : string) {
    const cookies : any = await CookieManager.get(instanceUrl)
    const data = {}

    Object.values(cookies).forEach(({ value, name }) => {
      try {
        const parsedValue = JSON.parse(value)
        data[name] = parsedValue
      } catch (e) {
        data[name] = value
        //console.log(`Cannot load ${name}`, e)
      }
    });
    console.log(`Fetch hydration for: ${instanceUrl}`, data)

    return data
  }

  public async changeInstanceUrl(url : string) {
    if (url) {
      this.instanceUrl = url
      const data = await CookiesStorage.fetchHydration(this.instanceUrl)
      console.log(`Hydrate for ${url} with`, data)
      this.hydrate(data)
    }
  }

  private async persist() {
    try {
      await CookieManager.clearAll()

      const keys = Object.keys(this.data)
      //console.log(`Persist cookies for ${this.domain}`, keys)
    
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        
        const value = this.data[key]
        //console.log(`save value: ${key} for instance: ${this.instanceUrl} domain: ${this.domain}`, value)

        await CookieManager.set(this.instanceUrl, {
          value: JSON.stringify(value),
          domain: this.domain,
          name: key,
          path: '/'
        })
      }

      await CookieManager.flush()
    } catch (e) {
      console.error('Could not persist native cookies', e)
    }
  }

  public set(key: string, value: any) {
    //console.log(`Set: ${key}`, value)
    this.data[key] = value
    this.persist()
  }

  public get(key: string, defaultValue: any) {
    return this.data[key] || defaultValue
  }

  public toBundle() {
    return this.data
  }
}