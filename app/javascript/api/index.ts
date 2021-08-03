import OS from '@detox/shared/os'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

export * from './graphql'

/**
 * Get fetch function with url pointing to graphql endpoint and authorization header
 */
export type ApiFetchProvider = (_uri, options : RequestInit) => Promise<Response>
/**
 * Run refreshing of current access token
 */
export type ApiRefreshAccessToken = () => Promise<any>
export type ApiRealTimeEndpoint = () => Promise<string>

export interface IApiConfigurationProvider {
  apiFetch : ApiFetchProvider
  apiRealTimeEndpoint: ApiRealTimeEndpoint
}

export default function createApiClient({ apiFetch, apiRealTimeEndpoint } : IApiConfigurationProvider) {
  const cache = new InMemoryCache()

  const httpLink = createHttpLink({
    credentials: 'include',
    fetch: apiFetch,
    fetchOptions: {
      method: 'POST',
      mode: 'cors'
    }
  })

  const hasSubscriptionOperation = ({ query: { definitions } }) => {
    return definitions.some(
      ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
    )
  }  

  const onErrorLink = onError(({ graphQLErrors, networkError, forward, operation } : any) => {
    if (graphQLErrors) {
      const unauthorized = graphQLErrors.find((error) => (error?.extensions?.code === "unauthorized"))
      
      if (unauthorized) {
        if (unauthorized.extensions.signedIn) {
          console.log('Unauthorized access to resource but still logged in',)
        } else {
          console.log('Refresh token expired', unauthorized)
          //TODO: Logout user here!
        }
      } else {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
    }
  })

  let link = null

  if (OS === 'server') {
    link = ApolloLink.from([
      onErrorLink,
      httpLink
    ])
  } else {
    const { ActionCableLink } = require('./ActionCableLink')

    const actionCableLink = new ActionCableLink({
      apiRealTimeEndpoint
    })

    const subscriptionLink = ApolloLink.split(
      hasSubscriptionOperation,
      actionCableLink as any,
      httpLink
    )
  
    link = ApolloLink.from([
      onErrorLink,
      subscriptionLink
    ])
  }

  return new ApolloClient({
    link,
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      }
    }
  })
}