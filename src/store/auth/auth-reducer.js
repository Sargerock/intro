import {
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	FETCH_USER,
	GET_TOKENS
} from "./auth-actions";
import { success, error } from "redux-saga-requests";

const initialState = {
	profile: {},
	isAuthorized: false,
	isLoading: false,
	error: ""
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
		case SIGN_UP:
		case FETCH_USER:
			return {
				...state,
				isLoading: true,
				error: ""
			};
		case success(SIGN_IN):
		case success(SIGN_UP):
			return {
				...state,
				isAuthorized: true,
				isLoading: false
			};
		case success(FETCH_USER): {
			return {
				...state,
				profile: {
					userId: action.payload.data.id,
					userName: action.payload.data.userName
				}
			};
		}
		case error(SIGN_IN):
		case error(SIGN_UP):
			return {
				...state,
				isLoading: false,
				error: action.payload.message
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
				isAuthorized: !!action.payload.accessToken
			};

		default:
			return state;
	}
};
