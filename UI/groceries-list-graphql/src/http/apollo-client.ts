import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({ uri: 'https://localhost:7298/graphql/', credentials: 'include' });

const authMiddleware = new ApolloLink((operation, forward) => {
  
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('accessToken') || null,
    }
  }));

  return forward(operation);
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
export default apolloClient;