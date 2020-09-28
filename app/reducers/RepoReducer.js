import {
	SEARCH_REPO_SUCCESS,
	GET_REPO_DETAILS_START,
	GET_REPO_DETAILS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	searchResult: [1, 2, 3],
	infoLoading: false,
	selected: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case SEARCH_REPO_SUCCESS:
            return {
                searchResult: action.payload.result
			}
		case GET_REPO_DETAILS_START:
			return {
				infoLoading: true
			}
		case GET_REPO_DETAILS_SUCCESS:
			return {
				selected: { id: "MDEwOlJlcG9zaXRvcnkxNzIzNzQ=", ...action.payload.result },
				infoLoading: false
			}
		default:
			return state;
	}
};
