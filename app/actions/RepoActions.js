import { Alert } from 'react-native';
import { GraphQLNormalizr } from 'graphql-normalizr';
import {
    SEARCH_REPO_START,
	SEARCH_REPO_SUCCESS,
	SEARCH_REPO_FAIL,
	GET_REPO_DETAILS_START,
	GET_REPO_DETAILS_SUCCESS, 
	GET_REPO_DETAILS_FAIL,
	ISSUE_FORM_UPDATE, 
	CREATE_ISSUE_START, 
	CREATE_ISSUE_SUCCESS,
	CREATE_ISSUE_FAIL
} from './types';
import { Client } from '../graphql';
import repoQuery from '../graphql/queries/repoSearchQuery.gql';
import repoDetailQuery from '../graphql/queries/repoDetailQuery.gql';
import createIssueMutation from '../graphql/mutations/createIssueMutation.gql';

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
        const result = normalize(response);
        dispatch({
            type: SEARCH_REPO_SUCCESS,
            payload: { result }
        });
    })
    .catch(error => {
		dispatch({
			type: SEARCH_REPO_FAIL
		});
        Alert.alert('Something went wrong!');
    });
};

export const getRepoDetails = (repoId) => async dispatch => {
	console.log(repoId);
	dispatch({
		type: GET_REPO_DETAILS_START
	})
	Client.query({
		query: repoDetailQuery,
		variables: { id: repoId }
    })
    .then(response => {
        const result = normalize(response);
        dispatch({
            type: GET_REPO_DETAILS_SUCCESS,
            payload: { result, repoId }
        });
    })
    .catch(error => {
		dispatch({
			type: GET_REPO_DETAILS_FAIL
		});
        Alert.alert('Something went wrong!');
    });
}

export const issueFormUpdate = (value, type) => {
	return {
		type: ISSUE_FORM_UPDATE,
		payload: { value, type }
	}
}

export const createIssue = (repositoryId, title, body, navigation) => async dispatch => {
	dispatch({
		type: CREATE_ISSUE_START
	})
	Client.mutate({
		mutation: createIssueMutation,
		variables: { repositoryId, title, body }
    })
    .then(response => {
        const result = normalize(response);
        dispatch({
            type: CREATE_ISSUE_SUCCESS,
            payload: { result, repoId: repositoryId }
		});
		navigation.goBack();
    })
    .catch(error => {
        dispatch({
			type: CREATE_ISSUE_FAIL
		});
        Alert.alert('Something went wrong!');
    });
}
