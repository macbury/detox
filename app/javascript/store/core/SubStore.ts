import { observable, computed, action, isFlowCancellationError } from 'mobx'
import i18n from 'i18next'
import { StoreState } from './types'
import bind from 'bind-decorator'
import RootStore from '../RootStore'
import { Repository } from './Repository'
import OS from '@detox/shared/os'

export interface IRepositoryKlass {
  new() : Repository<any>
}

export abstract class Node {
  @observable
  protected readonly parent : Node

  protected repositories : {
    [key : string]: Repository<any>
  }

  constructor(parent : Node) {
    this.repositories = {}
    this.parent = parent
  }

  public getRepository<T extends Repository<any>>(Klass: any) : T {
    const repo = this.repositories[Klass.getRepoName()] as T
    if (repo) {
      return repo
    } else if (this.parent) {
      return this.parent.getRepository<T>(Klass)
    } else {
      return null
    }
  }
}

export abstract class BaseStore<BundleType> extends Node {
  @observable
  protected readonly i18n = i18n
  protected root : RootStore

  /**
   * Defines in what state is store:
   * - None: is empty and uninitialized
   * - Loading: don't have data and fetching new one from server(in this case show full screen loader)
   * - Refreshing: data is fetched but outdated(show only small notification about update)
   * - Ready: fetching is done, you can have data or some kind of errors
   */
  @observable
  public state : StoreState = "None"

  constructor(parent? : BaseStore<any>) {
    super(parent)
    this.root = parent?.root
    this.init()
  }

  // This is run after store is created
  protected init() {

  }

  protected registerRepository(repo : Repository<any> | any) {
    const name = (repo as any).constructor.getRepoName()
    if (this.repositories[name]) {
      throw new Error(`There is already registered a repository with name: ${name}`)
    }
    this.repositories[name] = repo
    return repo
  }

  @computed
  public get isLoading() {
    return this.state === "Loading"
  }

  @computed
  public get isRefreshing() {
    return this.state === "Refreshing"
  }

  @computed
  public get isSaving() {
    return this.state === "Saving"
  }

  @computed
  public get isNone() {
    return this.state === "None"
  }

  public clear() {
    Object.values(this.repositories).forEach((repo) => repo.clear());
  }

  /**
   * Cache key used for storing data in local storage
   */
  abstract get cacheKey() : string;

  protected abstract toBundle() : BundleType;
  protected abstract loadBundle(data : BundleType) : void;

  protected delay(miliseconds : number) : Promise<any> {
    return new Promise<any>((resolve) => setTimeout(resolve, miliseconds))
  }

  protected nextTick() : Promise<any> {
    return new Promise<any>((resolve) => setTimeout(resolve, 0))
  }
}

export abstract class SubStore<T> extends BaseStore<T> {
  private currentTask : any

  /**
   * Main interface to interact with our backend
   */
   protected get api() {
    return this.root.api
  }

  protected get cookies() {
    return this.root.cookies
  }

  protected get storage() {
    return this.root.storage
  }

  protected get screens() {
    return this.root.screens
  }

  protected get ui() {
    return this.root.ui
  }

  /**
  * Save serialized state of this store
  */
  @bind
  public persist() {
    const bundle = this.toBundle()
    this.storage.set(this.cacheKey, bundle)
  }

  /**
  * Load state from storage
  */
  @action.bound
  public restore() {
    const data = this.storage.get(this.cacheKey, null)
    if (data) {
      this.loadBundle(data)
    }
  }

  protected async runOnce(task : any) {
    if (this.currentTask) {
      this.currentTask.cancel()
    }
    this.currentTask = task
    try {
      const result = await task
      this.currentTask = null
      return result
    } catch (e) {
      if (isFlowCancellationError(e)) {
        return null
      } else {
        throw e
      }
    }
  }

}

export abstract class CookiesStore<T> extends SubStore<T> {
  protected get storage() {
    return this.root.cookies
  }
}

/**
 * This store persists state only on server side or if it runs on mobile
 */
export abstract class ServerSideStore<T> extends SubStore<T> {
  @bind
  public persist() {
    throw 'persist!'
    // if (OS === 'server') {
    //   super.persist()
    // }
  }
}

export abstract class NonPersistableStore extends SubStore<void> {
  get cacheKey(): string {
    throw new Error("Method not implemented.")
  }

  public toBundle() : any {
    throw new Error("Method not implemented.")
  }

  public loadBundle(data: any) : void {
    throw new Error("Method not implemented.")
  }
}