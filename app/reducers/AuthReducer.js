import { 
	LOGIN_FORM_UPDATE, 
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL, 
	REGISTER_FORM_UPDATE,
	REGISTER_USER_SUCCESS, 
	REGISTER_USER_FAIL, 
	LOGOUT_USER

} from '../actions/types';

const INITIAL_STATE = {
	isLoggedIn: false,
	registeredUsers: [{
		id: 1,
		username: '12345',
		password: 'qwerty'
	}],
	user: null,
	login: {
		username: null,
		password: null
	},
	register: {
		username: null,
		password: null
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN_FORM_UPDATE:
			return {
				...state,
				login: {
					...state.login,
					[action.payload.type]: action.payload.value
				}
			}
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				login: INITIAL_STATE.login,
				isLoggedIn: true
			}
		case LOGIN_USER_FAIL:
			return {
				...state,
				login: { ...INITIAL_STATE.login }
			}
		case REGISTER_FORM_UPDATE:
			return {
				...state,
				register: {
					...state.register,
					[action.payload.type]: action.payload.value
				}
			}
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				isLoggedIn: true,
				register: INITIAL_STATE.register,
				registeredUsers: [...state.registeredUsers, action.payload.user]
			}
		case REGISTER_USER_FAIL:
			return {
				...state,
				register: { ...INITIAL_STATE.register }
			}
		case LOGOUT_USER:
			return {
				...state,
				user: null,
				isLoggedIn: false
			}
		default:
			return state;
	}
};
