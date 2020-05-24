import React from "react";
import { ApolloClient, HttpLink, ApolloLink, split } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-boost";

import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import App from "./App";

// Web Socket
const GRAPHQL_ENDPOINT = "ws://localhost:4000/graphql";
const subLink = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});
const wsLink = new WebSocketLink(subLink);

const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  operation.setContext((context) => ({
    headers: {
      ...context.headers,
      authorization: token ? token : "",
    },
  }));
  return forward(operation);
});
const httpAuthLink = authLink.concat(httpLink);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpAuthLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Provider = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Provider;
