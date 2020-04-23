import {
	FETCH_USER,
	CHANGE_PASSWORD,
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

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER:
			return {
				...state,
				validationErrors: null,
				isLoading: true
			};
		case CHANGE_PASSWORD:
			return {
				...state,
				validationErrors: null
			}
		case success(FETCH_USER): {
			return {
				...state,
				...action.payload.data,
				isLoading: false,
			};
		}
		case error(FETCH_USER):
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
