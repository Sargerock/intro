import {
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	FETCH_USER,
	CHECK_TOKEN,
	RESET_ERRORS, SET_ALERT_ERROR, CHANGE_PASSWORD,
} from "./auth-actions";
import {success, error} from "redux-saga-requests";

const initialState = {
	profile: null,
	isAuthorized: false,
	isLoading: true,
	isInitialized: false,
	error: "",
	validationErrors: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
		case SIGN_UP:
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
		case success(SIGN_IN):
		case success(SIGN_UP):
			return {
				...state,
				isAuthorized: true,
				isLoading: false,
			};
		case success(FETCH_USER): {
			return {
				...state,
				profile: {
					userId: action.payload.data.id,
					userName: action.payload.data.userName,
				},
				isLoading: false,
			};
		}
		case error(SIGN_IN):
		case error(SIGN_UP):
		case error(FETCH_USER):
		case error(CHANGE_PASSWORD):
			return {
				...state,
				isLoading: false,
				validationErrors: action.payload.response.data.errors,
			};

		case SIGN_OUT:
			return initialState;
		case CHECK_TOKEN:
			return {
				...state,
				isAuthorized: action.payload.isAuthorized,
				isLoading: false,
				isInitialized: true
			};
		case RESET_ERRORS:
			return {
				...state,
				validationErrors: null,
			};
		case SET_ALERT_ERROR:
			return {
				...state,
				error: action.payload.error
			}
		default:
			return state;
	}
};
