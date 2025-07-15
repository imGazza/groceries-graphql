import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_SERVER_URL = 'https://localhost:7298/graphql/';

const apolloClient = new ApolloClient({
  uri: GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
});
export default apolloClient;