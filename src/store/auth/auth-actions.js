import { createRequestAction, loadTokens, removeTokens } from "../../utils";

export const SIGN_IN = "SIGN_IN";
export const signIn = data => dispatch =>
	dispatch(createRequestAction(SIGN_IN, "post", "/auth/sign-in", data));

export const SIGN_UP = "SIGN_UP";
export const signUp = data => dispatch =>
	dispatch(createRequestAction(SIGN_UP, "post", "/auth/sign-up", data));

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => dispatch => {
	dispatch(createRequestAction(SIGN_OUT, "post", "/auth/sign-out"));
	removeTokens();
};

export const GET_USER = "GET_USER";
export const getUser = () => (dispatch, getState) => {
	if (getState().auth.accessToken) {
		dispatch(createRequestAction(GET_USER, "get", `/auth/user`));
	}
};

export const GET_TOKENS = "GET_TOKENS";
export const getTokens = () => {
	const tokens = loadTokens();
	return { type: GET_TOKENS, payload: tokens };
};
