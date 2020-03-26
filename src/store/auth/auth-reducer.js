import {
	SIGN_IN,
	SIGN_UP,
	SIGN_OUT,
	GET_USER,
	GET_TOKENS
} from "./auth-actions";
import { success, error } from "redux-saga-requests";

const initialState = {
	profile: {},
	token: "",
	isLoading: false,
	error: ""
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
		case SIGN_UP:
		case GET_USER:
			return {
				...state,
				isLoading: true,
				error: ""
			};
		case success(SIGN_IN):
		case success(SIGN_UP):
			const token = action.payload.data.accessToken;
			return {
				...state,
				token,
				profile: { ...state.profile, userId: action.payload.data.userId },
				isLoading: false
			};
		case success(GET_USER): {
			debugger;
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
				token: "",
				profile: {}
			};
		case GET_TOKENS:
			return {
				...state,
				token: action.payload.accessToken
			};

		default:
			return state;
	}
};
