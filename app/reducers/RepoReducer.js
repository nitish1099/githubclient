import {
	SEARCH_REPO_START,
	SEARCH_REPO_SUCCESS,
	GET_REPO_DETAILS_START,
	GET_REPO_DETAILS_SUCCESS, 
	GET_REPO_DETAILS_FAIL,
	ISSUE_FORM_UPDATE, 
	CREATE_ISSUE_START, 
	CREATE_ISSUE_SUCCESS, 
	CREATE_ISSUE_FAIL, 
	SEARCH_REPO_FAIL,
	LOGOUT_USER
	
} from '../actions/types';

const INITIAL_STATE = {
	searchResult: [],
	searchLoading: false,
	infoLoading: false,
	selected: null,
	issue: {
		title: null,
		description: null
	},
	createIssueLoading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SEARCH_REPO_START:
			return {
				...state,
				searchLoading: true
			}
        case SEARCH_REPO_SUCCESS:
            return {
				...state,
				searchResult: action.payload.result,
				searchLoading: false
			}
		case SEARCH_REPO_FAIL:
			return {
				...state,
				searchLoading: false
			}
		case GET_REPO_DETAILS_START:
			return {
				...state,
				infoLoading: true
			}
		case GET_REPO_DETAILS_SUCCESS:
			return {
				...state,
				selected: {
					id: action.payload.repoId, 
					...action.payload.result 
				},
				infoLoading: false
			}
		case GET_REPO_DETAILS_FAIL:
			return {
				...state,
				infoLoading: false
			}
		case ISSUE_FORM_UPDATE:
			return {
				...state,
				issue: {
					...state.issue,
					[action.payload.type]: action.payload.value
				}
			}
		case CREATE_ISSUE_START:
			return {
				...state,
				createIssueLoading: true
			}
		case CREATE_ISSUE_SUCCESS:
			return {
				...state,
				createIssueLoading: false,
				issue: INITIAL_STATE.issue,
				selected: {
					...state.selected,
					repositories: {
						...state.selected.repositories,
						[action.payload.repoId]: {
							...state.selected.repositories[action.payload.repoId],
							issues: {
								...state.selected.repositories[action.payload.repoId].issues,
								totalCount: state.selected.repositories[action.payload.repoId].issues.totalCount + 1
							}
						}
					},
					issues: { ...action.payload.result.issues, ...state.selected.issues }
				}
			}
		case CREATE_ISSUE_FAIL:
			return {
				...state,
				createIssueLoading: false,
				issue: INITIAL_STATE.issue
			}
		case LOGOUT_USER:
			return {
				...INITIAL_STATE
			}
		default:
			return state;
	}
};
