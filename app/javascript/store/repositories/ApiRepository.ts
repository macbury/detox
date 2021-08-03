import { ApolloClient } from 'apollo-client'
import { Repository } from '../core/Repository'
import { Node } from '../core/SubStore'

/**
 * Just simple wrapper that allows easy access to api
 */
export default class ApiRepository extends Repository<any> {
  public client: ApolloClient<any>

  constructor(parent, client : ApolloClient<any>) {
    super(parent, (_parent, _id) => {
      throw new Error("This is not a store")
    })
    this.client = client
  }

  public static getRepoName() {
    return 'ApiRepository'
  }
}

export function getApi(repo : Node) {
  return repo.getRepository<ApiRepository>(ApiRepository).client
}