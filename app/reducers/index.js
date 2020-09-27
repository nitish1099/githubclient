import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RepoReducer from './RepoReducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	repo: RepoReducer
});

export default rootReducer;
