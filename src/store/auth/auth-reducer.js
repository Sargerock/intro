import {
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	CHECK_TOKEN,
	RESET_ERRORS, SET_ALERT_ERROR,
} from "./auth-actions";
import {success, error} from "redux-saga-requests";

const initialState = {
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
			return {
				...state,
				validationErrors: null,
				isLoading: true
			};
		case success(SIGN_IN):
		case success(SIGN_UP):
			return {
				...state,
				isAuthorized: true,
				isLoading: false,
			};
		case error(SIGN_IN):
		case error(SIGN_UP):
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
