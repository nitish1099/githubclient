import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from '../config';

// Create the apollo client
const Client = new ApolloClient({
  uri: config.BASE_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: 'Bearer 5086540aed4900d2a466e403e87c7282e5a9a747',
  }
});

export { Client };