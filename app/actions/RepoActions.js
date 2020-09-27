import { Alert } from 'react-native';
import {
    SEARCH_REPO_START,
} from './types';
import { Client } from '../graphql';
import repoQuery from '../graphql/queries/repoQuery.gql';


export const searchRepos = () => async dispatch => {
    dispatch({
        type: SEARCH_REPO_START,
    });
    Client.query({
        query: repoQuery
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
        Alert.alert('Something went wrong!');
    });
};
