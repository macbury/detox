import BaseStorage from './base'

/**
 * This storage is not persisted in any way, Mainly used for ssr rendering
 */
export class MemoryStorage extends BaseStorage {
  private data : { [key : string]: any }

  constructor() {
    super()
    this.data = {}
  }

  public async clear() {
    this.data = {}
  }

  public set(key: string, value: any) {
    this.data[key] = value
  }

  public get(key: string, defaultValue: any) {
    return this.data[key] || defaultValue
  }

  public toBundle() {
    return this.data
  }
}