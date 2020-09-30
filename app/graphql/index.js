import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from '../config';

// Create the apollo client
const Client = new ApolloClient({
  uri: config.BASE_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${config.GIT_TOKEN}`,
  }
});

export { Client };