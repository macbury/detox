import { action, observable, isObservableObject, ObservableMap, computed } from 'mobx'

class Node<T> {
  @observable
  public readonly id: string

  constructor(id : string) {
    this.id = id
  }

  public set(attributes: Partial<T>) {
    Object.assign(this, attributes)
  }
}

class Channel extends Node<Channel> {
  @observable
  public title : string
}

class Item extends Node<Item> {
  @observable
  public isRead: boolean
  @observable
  private channelId : string

  @action.bound
  public set channel({ id }) {
    this.channelId = id
  }

  @computed
  public get channel() {
    return 
  }

  @action.bound
  public toggle() {
    this.isRead = !this.isRead
  }
}


class NodeList<Kind extends Node<Kind>> {
  @observable
  private readonly items : ObservableMap<string, Kind>
  private build : (id : string) => Kind

  constructor(build: (id : string) => Kind) {
    this.build = build
    this.items = observable.map({})
  }

  @action.bound
  public remove(id : string) {
    return this.items.delete(id)
  }

  public get(id : string) : Kind {
    return this.items.get(id)
  }

  @action.bound
  public create(attributes : Partial<Kind>) {
    let item = this.items.get(attributes.id)
    if (!item) {
      item = this.build(attributes.id)
      this.items.set(item.id, item)
    }
    item.set(attributes)
    return item
  }

  @action.bound
  public clear() {
    this.items.clear()
  }
}

class Stories {
  @observable
  public readonly items : NodeList<Item>
  @observable
  private readonly channels : ObservableMap<string, Channel>

  constructor() {
    this.items = new NodeList<Item>((id : string) => new Item(id))
  }
}

it('test', () => {
  const stories = new Stories()
  const item = stories.items.create({ id: 'abc', isRead: true })

  expect(isObservableObject(stories)).toBe(true)
  expect(isObservableObject(item)).toBe(true)

  const secondItem = stories.items.create({ id: 'abc', isRead: true })
  secondItem.toggle()
  expect(item.isRead).toBe(false)

  stories.items.create({ id: 'abc', isRead: true })
  expect(item.isRead).toBe(true)
})