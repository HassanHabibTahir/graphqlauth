import React from "react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  useQuery,
  gql,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "apollo-utilities";
const client = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4000/subscriptions",
    })
  );
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export default client;
