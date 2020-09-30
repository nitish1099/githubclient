import { combineReducers } from 'redux';
import { LOGOUT_USER } from '../actions/types';
import AuthReducer from './AuthReducer';
import RepoReducer from './RepoReducer';
import WatchReducer from './WatchReducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	repo: RepoReducer,
	watch: WatchReducer
});


export default rootReducer;
