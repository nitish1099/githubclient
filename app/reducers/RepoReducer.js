import {
    SEARCH_REPO_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    searchResult: [1, 2, 3]
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case SEARCH_REPO_SUCCESS:
            return {
                searchResult: action.payload.result
            }
		default:
			return state;
	}
};
