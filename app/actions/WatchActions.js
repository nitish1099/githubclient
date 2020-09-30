import { WATCH_REPO } from "./types"

export const watchRepo = (repositories, organizations, users, userID) => {
	return {
		type: WATCH_REPO,
		payload: { repositories, organizations, users, userID }
	}
}