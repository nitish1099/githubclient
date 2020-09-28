import { Alert } from 'react-native';
import { GraphQLNormalizr } from 'graphql-normalizr';
import {
    SEARCH_REPO_START,
    SEARCH_REPO_SUCCESS
} from './types';
import { Client } from '../graphql';
import repoQuery from '../graphql/queries/repoQuery.gql';


export const searchRepos = (text) => async dispatch => {
    dispatch({
        type: SEARCH_REPO_START,
    });
    console.log(repoQuery);
    Client.query({
        query: repoQuery,
        variables: { query: text }
    })
    .then(response => {
        const { normalize } = new GraphQLNormalizr();
        const result = normalize(response);
        dispatch({
            type: SEARCH_REPO_SUCCESS,
            payload: { result }
        });
    })
    .catch(error => {
        console.log(error);
        Alert.alert('Something went wrong!');
    });
};
