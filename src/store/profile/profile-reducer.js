import {
	FETCH_PROFILE,
	CHANGE_PASSWORD, CHANGE_AVATAR, FETCH_SELECTED_PROFILE,
} from "./profile-actions";
import {success, error} from "redux-saga-requests";

const initialState = {
	userId: 0,
	userName: "",
	avatarUrl: "",
	isLoading: true,
	error: "",
	validationErrors: null,
};

export const createProfileReducer = (namespace = "") => (state = initialState, action) => {
	if (action.meta?.namespace && action.meta?.namespace !== namespace) {
		return state;
	}

	switch (action.type) {
		case FETCH_SELECTED_PROFILE:
		case FETCH_PROFILE:
			return {
				validationErrors: null,
				isLoading: true
			};
		case CHANGE_PASSWORD:
			return {
				...state,
				validationErrors: null
			}
		case success(FETCH_SELECTED_PROFILE):
		case success(FETCH_PROFILE): {
			return {
				...state,
				...action.payload.data,
				userId: action.payload.data.id,
				isLoading: false,
			};
		}
		case success(CHANGE_AVATAR): {
			return {
				...state,
				avatarUrl: action.payload.data.avatarUrl
			}
		}
		case error(CHANGE_AVATAR): {
			const errors = Object.entries(action.payload.response.data.errors)
				.reduce((acc, [key, value]) => {
					return {...acc, avatar: [...acc.avatar || [], ...value]}
				}, {})
			return {
				...state,
				validationErrors: errors,
			};
		}
		case error(FETCH_SELECTED_PROFILE):
		case error(FETCH_PROFILE):
		case error(CHANGE_PASSWORD):
			return {
				...state,
				isLoading: false,
				validationErrors: action.payload.response.data.errors,
			};
		default:
			return state;
	}
};
