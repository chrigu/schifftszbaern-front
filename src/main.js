// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import VueApollo from 'vue-apollo'
import { GRAPHCOOL_ENDPOINT, GRAPHCOOL_SUBSCRIPTION_ENDPOINT } from './const'

Vue.config.productionTip = false

// Create the network interface
const networkInterface = createNetworkInterface({
  uri: GRAPHCOOL_ENDPOINT,
  transportBatching: true
})

// Create the subscription websocket client
const wsClient = new SubscriptionClient(GRAPHCOOL_SUBSCRIPTION_ENDPOINT, {
  reconnect: true
})

// Extend the network interface with the subscription client
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

// Create the apollo client with the new network interface
const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  connectToDevTools: true
})

Vue.use(VueApollo, { apolloClient })

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// const apolloProvider = new VueApollo({
//   clients: {
//     a: apolloClient
//   },
//   defaultClient: apolloClient
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
