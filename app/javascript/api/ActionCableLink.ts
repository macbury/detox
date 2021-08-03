import { ApolloLink, Observable, FetchResult, Operation, NextLink } from "@apollo/client/core"
import { Consumer } from "@rails/actioncable"
import { print } from "graphql"
import { EventRegister } from "react-native-event-listeners";

global.addEventListener = EventRegister.addEventListener;
global.removeEventListener = EventRegister.removeEventListener;


type RequestResult = FetchResult<{ [key: string]: any; }, Record<string, any>, Record<string, any>>
type ConnectionParams = object | ((operation: Operation) => object)
export type ApiRealTimeEndpoint = () => Promise<string>

export class ActionCableLink extends ApolloLink {
  channelName: string
  actionName: string
  currentConsumer: Consumer
  connectionParams: ConnectionParams
  apiRealTimeEndpoint: ApiRealTimeEndpoint

  constructor(options: { channelName?: string, actionName?: string, connectionParams?: ConnectionParams, apiRealTimeEndpoint?: ApiRealTimeEndpoint }) {
    super()
    this.channelName = options.channelName || "GraphqlChannel"
    this.actionName = options.actionName || "execute"
    this.connectionParams = options.connectionParams || {}
    this.apiRealTimeEndpoint = options.apiRealTimeEndpoint
    this.currentConsumer = null
  }

  /**
   * check if url did change, it true then initialize new connection
   * @returns 
   */
  private async createCableConnection() {
    const endpoint = await this.apiRealTimeEndpoint()
    
    // This hack allows running actioncable in react native
    // https://github.com/rails/rails/pull/36652#issuecomment-656151080
    // it is important to pass endpoint as url, otherwise it will cause error with missing 
    // document(action cable wants to be smart and uses document to create a element to format actioncable endpoint url)
    this.currentConsumer = new Consumer(() => endpoint)
    //connection.close()
    return this.currentConsumer
  }

  // Interestingly, this link does _not_ call through to `next` because
  // instead, it sends the request to ActionCable.
  request(operation: Operation, next: NextLink): Observable<RequestResult> {
    return new Observable((observer) => {
      let channel = null
      let connection = null
      this.createCableConnection().then((cable) => {
        var channelId = Math.round(Date.now() + Math.random() * 100000).toString(16)
        var actionName = this.actionName
        var connectionParams = (typeof this.connectionParams === "function") ?
          this.connectionParams(operation) : this.connectionParams
        channel = cable.subscriptions.create(Object.assign({},{
          channel: this.channelName,
          channelId: channelId
        }, connectionParams), {
          connected: function() {
            connection = cable
            channel.perform(
              actionName,
              {
                query: operation.query ? print(operation.query) : null,
                variables: operation.variables,
                // This is added for persisted operation support:
                operationId: (operation as {operationId?: string}).operationId,
                operationName: operation.operationName
              }
            )
          },
          received: function(payload) {
            if (payload.result.data || payload.result.errors) {
              observer.next(payload.result)
            }
  
            if (!payload.more) {
              observer.complete()
            }
          }
        })       
      })

      // Make the ActionCable subscription behave like an Apollo subscription
      return () => {
        console.log('Disconnecting from channel')
        connection?.disconnect()

        return Object.assign(channel, {closed: false})
      }
    })
  }
}