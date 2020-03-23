import { SIGN_IN, SIGN_UP, SIGN_OUT, GET_USER } from "./auth-actions";
import { success, error } from "redux-saga-requests";
import { authHelper } from "../../utils";

const initialState = {
	profile: {
		userId: undefined,
		userName: ""
	},
	token: authHelper.loadToken(),
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
			authHelper.saveToken(token);
			return {
				...state,
				token,
				profile: { ...state.profile, userId: action.payload.data.userId },
				isLoading: false
			};
		case success(GET_USER): {
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
			authHelper.saveToken("");
			return {
				...state,
				token: ""
			};

		default:
			return state;
	}
};
