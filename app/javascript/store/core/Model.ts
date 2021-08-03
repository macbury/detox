import { observable, extendObservable, toJS } from 'mobx'
import { Node } from './SubStore'

interface IBaseModel {
  id: string
  __typename: string
}

export abstract class Model extends Node {
  @observable
  public readonly id: string
  @observable
  public __typename: string

  constructor(parent: Node, id : string) {
    super(parent)
    this.id = id
    extendObservable(this, {})
    this.initialize()
  }

  public initialize() {}

  public put(attributes: Partial<IBaseModel>) {
    Object.assign(this, attributes)
  }

  public getParentId() {
    return (this.parent as any)?.id
  }

  protected ignoreFieldsSerialization() {
    return [
      'repositories',
      'parent'
    ]
  }

  protected fieldsToSerialize() {
    const ignore = this.ignoreFieldsSerialization()
    return Object.getOwnPropertyNames(this).filter((name) => !ignore.includes(name))
  }

  public toJS() : any {
    const fields = {}
    this.fieldsToSerialize().forEach((name) => {
      if (typeof this[name] !== 'function') {
        fields[name] = this[name] || null
      }
    })
    return toJS(fields)
  }
}