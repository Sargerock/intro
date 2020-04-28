import {
	FETCH_PROFILE,
	CHANGE_PASSWORD,
	CHANGE_AVATAR,
	FETCH_SELECTED_PROFILE,
} from "./profile-actions";

import {success, error} from "redux-saga-requests";

const initialState = {
	userId: 0,
	userName: "",
	avatarUrl: "",
	isLoading: true,
	byUsername: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SELECTED_PROFILE:
		case FETCH_PROFILE:
		case CHANGE_PASSWORD:
		case CHANGE_AVATAR:
			return {
				...state,
				isLoading: true
			};
		case success(FETCH_SELECTED_PROFILE):
			return {
				...state,
				isLoading: false,
				byUsername: {
					...state.byUsername,
					[action.payload.data.userName]: {...action.payload.data, userId: action.payload.data.id}
				}
			};
		case success(FETCH_PROFILE):
			return {
				...state,
				...action.payload.data,
				userId: action.payload.data.id,
				isLoading: false,
				byUsername: {
					...state.byUsername,
					[action.payload.data.userName]: {...action.payload.data, userId: action.payload.data.id}
				}
			};
		case success(CHANGE_PASSWORD):
			return {
				...state,
				isLoading: false
			}
		case success(CHANGE_AVATAR): {
			return {
				...state,
				avatarUrl: action.payload.data.avatarUrl,
				isLoading: false
			}
		}
		case error(FETCH_SELECTED_PROFILE):
		case error(FETCH_PROFILE):
		case error(CHANGE_PASSWORD):
		case error(CHANGE_AVATAR):
			return {
				...state,
				isLoading: false,
			};
		default:
			return state;
	}
};
