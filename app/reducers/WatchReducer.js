import { WATCH_REPO } from '../actions/types';

const INITIAL_STATE = {
	userWatchedRepos: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case WATCH_REPO: {
			const isUserRecordPresent = state.userWatchedRepos.find(repo => repo.userID === action.payload.userID);
			const organization = action.payload.organizations || null;
			const user = action.payload.users || null;
			if (isUserRecordPresent) {
				const isOrganizationPresent = isUserRecordPresent.organizations && Object.keys(isUserRecordPresent.organizations).find(org => org === organization);
				const isRepoUserPresent = isUserRecordPresent.users && Object.keys(isUserRecordPresent.users).find(org => org === user);
				return {
					...state,
					userWatchedRepos: state.userWatchedRepos.map(repo => {
						if(repo.userID === action.payload.userID) {
							return Object.assign({}, repo, {
								list: {
									repositories: { ...repo.list.repositories, ...action.payload.repositories },
									organizations: organization && !isOrganizationPresent ? { ...repo.list.organizations, ...organization } : repo.list.organizations, 
									users: user && !isRepoUserPresent ? { ...repo.list.users, ...user } : repo.list.users,
								} 
							})
						} 
						return repo;
					})
				}
			}
			return {
				userWatchedRepos: [ ...state.userWatchedRepos, {
					userID: action.payload.userID,
					list: {
						repositories: action.payload.repositories,
						organizations: organization, 
						users: user 
					}
				}]
			}
		}
		default:
			return state;
	}
};
