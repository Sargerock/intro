import {
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	CHECK_TOKEN,
	SET_ALERT_ERROR,
} from "./auth-actions";

import {success, error} from "redux-saga-requests";

const initialState = {
	isAuthorized: false,
	isLoading: true,
	isInitialized: false,
	error: "",
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
		case SIGN_UP:
			return {
				...state,
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
		case SET_ALERT_ERROR:
			return {
				...state,
				error: action.payload.error
			}
		default:
			return state;
	}
};
