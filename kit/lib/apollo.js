// ----------------------
// IMPORTS
const SUBSCRIPTIONPORT = 5000;
// React propTypes
import PropTypes from 'prop-types';

// Apollo client library
import { createNetworkInterface, ApolloClient } from 'react-apollo';

//Apollo Socket
import {
    SubscriptionClient,
    addGraphQLSubscriptions
} from "subscriptions-transport-ws";

// Custom configuration/settings
import { APOLLO, IP_ENV } from 'config/project';

// ----------------------

// Helper function to create a new Apollo client, by merging in
// passed options alongside the defaults
function createClient(opt = {}, networkInterface) {
  return new ApolloClient(Object.assign({
    reduxRootSelector: state => state.apollo,
    networkInterface: networkInterface,
  }, opt));
}

// Helper function that will merge a passed object with the expected
// React propTypes 'shape', for use with the `react-apollo` `graphql` HOC
export function mergeData(toMerge) {
  return PropTypes.shape(Object.assign({
    loading: PropTypes.bool.isRequired,
  }, toMerge));
}

// Creates a new browser client
export function browserClient() {
  // Create a new Apollo network interface, to point to our API server.
  // Note:  By default in this kit, we'll connect to a sample endpoint that
  // repsonds with simple messages.  Update [root]/config.js as needed.
  const networkInterface = createNetworkInterface({
    uri: APOLLO.uri,
  });

  //Make subsciption server && Change
  const subscriptionURL = `ws://${IP_ENV}:${SUBSCRIPTIONPORT}`;
  const wsClient = new SubscriptionClient(subscriptionURL, {
      reconnect: process.env.NODE_ENV === 'production' // 프로덕션이 아니면 일단 꺼놓기
  });
  // Extend the network interface with the WebSocket
  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
      networkInterface,
      wsClient
  );
  return createClient({connectToDevTools: true}, networkInterface);
}

// Creates a new server-side client
export function serverClient() {
  // Create a new Apollo network interface, to point to our API server.
  // Note:  By default in this kit, we'll connect to a sample endpoint that
  // repsonds with simple messages.  Update [root]/config.js as needed.
  const networkInterface = createNetworkInterface({
    uri: APOLLO.uri,
  });

  return createClient({
    ssrMode: true,
  }, networkInterface);
}
