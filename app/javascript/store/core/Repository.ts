import bind from 'bind-decorator'
import { action, computed, observable, ObservableMap } from 'mobx'
import { Model } from './Model'
import { Node } from './SubStore'

export abstract class Repository<Kind extends Model> extends Node {
  @observable
  public readonly kind : Kind
  @observable
  protected readonly items : ObservableMap<string, Kind>
  private build : (parent: Node, id : string) => Kind

  constructor(parent: Node, build: (parent: Node, id : string) => Kind) {
    super(parent)
    this.build = build
    this.items = observable.map({})
  }

  @computed
  protected get all() : Kind[] {
    return [...this.items.values()]
  } 

  @action.bound
  public remove(id : string) {
    return this.items.delete(id)
  }

  @bind
  public get(id : string) : Kind {
    return this.items.get(id)
  }

  @action.bound
  public getOrInitialize(id : string) : Kind {
    return this.get(id) || this.create({ id })
  }

  @bind
  public getAll(ids : string[]) {
    return ids?.map(this.get) || []
  }

  @action.bound
  public create(attributes : Partial<Kind> | Partial<any>) : Kind {
    const id = attributes.id
    let item = this.items.get(id)
    if (!item) {
      item = this.build(this.parent, id)
      this.items.set(item.id, item)
    }
    item.put(attributes)
    return item
  }

  @action.bound
  public createAll(attrs : Partial<Kind>[] | Partial<any>[]) : Array<Kind> {
    return (attrs as any).map(this.create)
  }

  @action.bound
  public clear() {
    this.items.clear()
  }

  public static getRepoName() {
    throw new Error("Not implemented")
  }
}
