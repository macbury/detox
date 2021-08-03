export default abstract class BaseStorage {
  abstract set(key : string, value : any)
  abstract get(key : string, defaultValue? : any)
  abstract toBundle() : any

  abstract clear() : Promise<void>

  /**
   * Load bundle into store
   * @param bundle 
   */
  public hydrate(bundle : any) {
    const data = bundle || {}
    const keys = Object.keys(data)
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      this.set(key, data[key])
    }
  }
}