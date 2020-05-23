import React from "react";
import { ApolloClient, HttpLink, split, ApolloLink } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";

import App from "./App";
import { getMainDefinition } from "apollo-utilities";

import { SubscriptionClient } from "subscriptions-transport-ws";

const GRAPHQL_ENDPOINT = "ws://localhost:4000/graphql";

const sub = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});

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
const wsLink = new WebSocketLink(sub);

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
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? token : "",
      },
    });
  },
});

const Provider = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Provider;
