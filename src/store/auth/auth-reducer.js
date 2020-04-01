import {
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	FETCH_USER,
	GET_TOKENS
} from "./auth-actions";
import { success, error } from "redux-saga-requests";

const initialState = {
	profile: null,
	isAuthorized: false,
	isLoading: false,
	error: "",
	validationErrors: null,
	refreshToken: ""
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
		case SIGN_UP:
		case FETCH_USER:
			return {
				...state,
				isLoading: true,
				error: "",
				validationErrors: null
			};
		case success(SIGN_IN):
		case success(SIGN_UP):
			return {
				...state,
				isAuthorized: true,
				refreshToken: action.payload.data.refreshToken,
				isLoading: false
			};
		case success(FETCH_USER): {
			return {
				...state,
				profile: {
					userId: action.payload.data.id,
					userName: action.payload.data.userName
				},
				isLoading: false
			};
		}
		case error(SIGN_IN):
		case error(SIGN_UP):
		case error(FETCH_USER):
			return {
				...state,
				isLoading: false,
				error: action.payload.message,
				validationErrors: action.payload.errors
			};

		case SIGN_OUT:
			return {
				...state,
				isAuthorized: false,
				profile: {}
			};
		case GET_TOKENS:
			return {
				...state,
				isAuthorized: action.payload.isAuthorized,
				refreshToken: action.payload.refreshToken
			};

		default:
			return state;
	}
};
