import { Alert } from 'react-native';
import { GraphQLNormalizr } from 'graphql-normalizr';
import {
    SEARCH_REPO_START,
	SEARCH_REPO_SUCCESS,
	GET_REPO_DETAILS_START,
	GET_REPO_DETAILS_SUCCESS
} from './types';
import { Client } from '../graphql';
import repoQuery from '../graphql/queries/repoQuery.gql';
import repoDetailQuery from '../graphql/queries/repoDetailQuery.gql';

const { normalize } = new GraphQLNormalizr();

export const searchRepos = (text) => async dispatch => {
    dispatch({
        type: SEARCH_REPO_START,
    });
    Client.query({
        query: repoQuery,
        variables: { query: text }
    })
    .then(response => {
		console.log(response);
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

export const getRepoDetails = () => async dispatch => {
	dispatch({
		type: GET_REPO_DETAILS_START
	})
	Client.query({
        query: repoDetailQuery
    })
    .then(response => {
		console.log(response);
        const result = normalize(response);
        dispatch({
            type: GET_REPO_DETAILS_SUCCESS,
            payload: { result }
        });
    })
    .catch(error => {
        console.log(error);
        Alert.alert('Something went wrong!');
    });
}
