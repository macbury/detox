import 'graphiql/graphiql.css'
import OS from '@detox/shared/os'
import React from 'react'
import GraphiQL from 'graphiql'
import { graphQLFetcher } from "graphiql-subscriptions-fetcher/dist/fetcher"


class ActionCableSubscriber {
  cable : any;
  registry : object;

  constructor() {
    const { createConsumer } = require("@rails/actioncable")

    this.cable = createConsumer(`wss://${window.location.host}/data/subscription`)
    this.registry = {}
  }

  unsubscribe(channelId) {
    if (this.registry[channelId] != null){
      this.registry[channelId].unsubscribe()
      this.registry[channelId] = null
    }
  }

  subscribe(graphQLParams, callback) {
    const channelId = this.getUuid()

    const channel = this.cable.subscriptions.create({
      channel: "GraphqlChannel",
      channelId
    }, {
      connected: () => {
        channel.perform('execute', graphQLParams)
      },

      rejected: () => {
        callback(new Error('Connection rejected from server'), null)
      },

      received: (payload) => {
        if (payload.result && payload.result.data) {
          callback(null, payload.result.data);
        }

        if (!payload.more) {
          this.unsubscribe(channelId)
        }
      }
    })
    this.registry[channelId] = channel
    return channelId
  }

  private getUuid() {
    return Math.round(Date.now() + Math.random() * 100000).toString(16)
  }
}

export default function ApiExplorerPage() {
  if (OS === 'server') {
    return null
  }
  
  const fetcher = graphQLFetcher((new ActionCableSubscriber() as any), function (graphQLParams) {
    return fetch(window.location.origin + '/data', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  })
  
  return <GraphiQL fetcher={fetcher} />
}
