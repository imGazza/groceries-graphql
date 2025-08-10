import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, type Operation } from "@apollo/client";
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN } from "./auth";

const httpLink = new HttpLink({ uri: 'https://localhost:7298/graphql/', credentials: 'include' });

const refreshToken = async (operation: Operation, client: ApolloClient<any>) => {
  try {
    // Use Apollo Client to execute the refresh mutation
    const result = await client.mutate({
      mutation: REFRESH_TOKEN,
      errorPolicy: 'none' // Don't trigger error link for this mutation
    });
    
    if(!result.data){
      throw new Error('Refresh token failed');
    }

    const newAccessToken = result.data.refreshToken.accessToken;
    localStorage.setItem('accessToken', newAccessToken);
    
    operation.setContext({
      headers: {
        ...operation.getContext().headers,
        authorization: `Bearer ${newAccessToken}`
      }
    });
    
  } catch (error) {
    sessionStorage.clear();
    window.location.href = '/login';
    throw error;
  }
};

const authLink = new ApolloLink((operation, forward) => {
  
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('accessToken') || null,
    }
  }));

  return forward(operation);
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  for (let error of graphQLErrors!){
    if(error?.extensions?.code === 'UNAUTHENTICATED'){     
      refreshToken(operation, apolloClient);
      return forward(operation);
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authLink, httpLink]),

});
export default apolloClient;