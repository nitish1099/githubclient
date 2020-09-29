import { Alert } from 'react-native';
import { 
	LOGIN_FORM_UPDATE,
	REGISTER_FORM_UPDATE,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS
} from './types';

export const loginFormUpdate = (value, type) => {
	return {
		type: LOGIN_FORM_UPDATE,
		payload: { value, type }
	}
}

export const registerFormUpdate = (value, type) => {
	return {
		type: REGISTER_FORM_UPDATE,
		payload: { value, type }
	}
}

export const login = (username, password, users) => {
	// find user with username and password in registered users
	const user  = users.find(user => user.username === username && user.password === password);
	if (user) {
		return {
			type: LOGIN_USER_SUCCESS,
			payload: { user }
		}
	} else {
		Alert.alert('Oops!', 'No such user found, please retry');
		return {
			type: LOGIN_USER_FAIL
		}
	}
}

export const register = (username, password, users) => {
	// check if user exists with the same username
	const user  = users.find(user => user.username === username);
	if (user) {
		Alert.alert('Oops!', 'User with username already exists');
		return {
			type: REGISTER_USER_FAIL
		}
		
	} else {
		return {
			type: REGISTER_USER_SUCCESS,
			payload: { user: { ...user, id: users.length } }
		}
	}
}