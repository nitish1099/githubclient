import {
} from '../actions/types';

const INITIAL_STATE = {
    token: null,
    isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
