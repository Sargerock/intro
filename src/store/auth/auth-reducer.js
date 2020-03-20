import { SIGN_IN, SIGN_UP, SIGN_OUT } from "./auth-actions";
import { success, error } from "redux-saga-requests";

import { authHelper } from "../../utils";

const initialState = {
	profile: null,
	token: authHelper.loadToken(),
	isLoading: false,
	error: ""
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
		case SIGN_UP:
			return {
				...state,
				isLoading: true,
				error: ""
			};
		case success(SIGN_IN):
		case success(SIGN_UP):
			const token = action.payload.data.accessToken;
			authHelper.saveToken(token);
			return {
				...state,
				token,
				isLoading: false
			};
		case error(SIGN_IN):
		case error(SIGN_UP):
			return {
				...state,
				isLoading: false,
				error: action.payload.data
			};
		case SIGN_OUT:
			authHelper.saveToken("");
			return {
				...state,
				token: ""
			};

		default:
			return state;
	}
};
