import { ApolloClient, ApolloLink, from, fromPromise, HttpLink, InMemoryCache, type NextLink, type Operation } from "@apollo/client";
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN } from "./auth";
import { useNavigate } from "react-router";

//const navigate = useNavigate();

const httpLink = new HttpLink({ uri: 'https://localhost:7298/graphql/', credentials: 'include' });

const authLink = new ApolloLink((operation, forward) => {

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
  }));

  return forward(operation);
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  for (let error of graphQLErrors!) {
    if (error?.extensions?.code === 'AUTH_NOT_AUTHENTICATED') {
      return fromPromise(
        getAccessToken(operation)
      ).flatMap(() => forward(operation));
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authLink, httpLink])
});
export default apolloClient;


const getAccessToken = async (operation: Operation) => {
  try {
    const newToken = await refreshToken(apolloClient);

    operation.setContext({
      headers: {
        ...operation.getContext().headers,
        authorization: `Bearer ${newToken}`
      }
    });
  } catch (error) {
    // Handle refresh failure
    throw error;
  }
}

const refreshToken = async (client: ApolloClient<any>) => {
  try {

    const result = await client.mutate({
      mutation: REFRESH_TOKEN,
      errorPolicy: 'none'
    });

    if (!result.data) {
      throw new Error('Refresh token failed');
    }

    const newAccessToken = result.data.refreshToken.accessToken;
    localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    localStorage.clear();
    //navigate('/login');
    throw error;
  }
};