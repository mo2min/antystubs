import React from "react";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./App";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`);
      console.error(locations);
    });

  if (networkError) console.log(`[Network ERORR]: ${networkError}`);
});

const httpLink = createHttpLink({
  // Graphcms.com Momen's Facebook Login OR
  // uri: "http://localhost:4000/"
  // uri: "http://localhost:1337/graphql"
  uri: "https://graphql.fauna.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer fnADgd8KwmACC1ynjgxPDjFn_B4Fcse27yGKGUU6`,
    },
  };
});

const neo4jLink = createHttpLink({
  uri: "http://localhost:4100/graphql",
});

const linkSplitter = ApolloLink.split(
  (operation) => operation.getContext().clientName === "neo4j",
  neo4jLink,
  httpLink
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, linkSplitter]),
  cache: new InMemoryCache(),
});

function customeClientQuery(query: any, variables: any): Promise<any> {
  return new Promise<number>((resolve, reject) => {
    client
      .query({
        query: query,
        variables: variables,
      })
      .then((data) => resolve(data.data))
      .catch((error) => reject(error));
  });
}

const callClient = async (query: any, variables: any) => {
  return await customeClientQuery(query, variables);
};

const MyApolloProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export { callClient, MyApolloProvider };
