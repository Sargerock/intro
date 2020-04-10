import { createRequestAction, loadTokens, removeTokens } from "utils";

export const SIGN_IN = "SIGN_IN";
export const signIn = (data, meta) =>
	createRequestAction(SIGN_IN, "post", "/auth/sign-in", data, meta);

export const SIGN_UP = "SIGN_UP";
export const signUp = (data, meta) =>
	createRequestAction(SIGN_UP, "post", "/auth/sign-up", data, meta);

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => (dispatch) => {
	dispatch(createRequestAction(SIGN_OUT, "post", "/auth/sign-out"));
	removeTokens();
};

export const FETCH_USER = "FETCH_USER";
export const fetchUser = () =>
	createRequestAction(FETCH_USER, "get", `/auth/user`);

export const GET_TOKENS = "GET_TOKENS";
export const getTokens = () => {
	const { accessToken, refreshToken } = loadTokens();
	return {
		type: GET_TOKENS,
		payload: { isAuthorized: !!accessToken, refreshToken },
	};
};

export const RESET_ERRORS = "RESET_ERRORS";
export const resetErrors = () => ({
	type: RESET_ERRORS,
});
