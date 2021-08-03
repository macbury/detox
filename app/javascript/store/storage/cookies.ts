import Cookies, { CookieSetOptions } from 'universal-cookie'
import BaseStorage from './base'

const COOKIE_OPTIONS = {
  path: '/'
}

/**
 * This storage persists data as cookies
 */
export class CookiesStorage extends BaseStorage {
  private data : { [key : string]: any }
  private cookiesManager: Cookies

  constructor() {
    super()
    this.data = {}
    this.cookiesManager = new Cookies()
  }

  public static async fetchHydration(data?: string | object) {
    const cookies = new Cookies(data)
    return cookies.getAll()
  }

  public async clear() {
    Object.keys(this.data).forEach((cookieName) => {
      this.data[cookieName] = null
    })
    await this.persist()
  }

  public async changeInstanceUrl(url : string) {
    
  }

  private async persist() {
    const keys = Object.keys(this.data)
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      
      const value = this.data[key]

      if (value) {
        this.cookiesManager.set(key, JSON.stringify(value), COOKIE_OPTIONS)
      } else {
        this.cookiesManager.remove(key, COOKIE_OPTIONS)
      }
    }
  }

  public set(key: string, value: any) {
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