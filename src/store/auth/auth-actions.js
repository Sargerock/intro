import {
	createRequestAction,
	loadToken,
	removeToken,
	setAuthorizationHeader,
} from "utils";

export const SIGN_IN = "SIGN_IN";
export const signIn = (data, meta) =>
	createRequestAction(SIGN_IN, "post", "/auth/sign-in", data, meta);

export const SIGN_UP = "SIGN_UP";
export const signUp = (data, meta) =>
	createRequestAction(SIGN_UP, "post", "/auth/sign-up", data, meta);

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => (dispatch) => {
	dispatch(createRequestAction(SIGN_OUT, "post", "/auth/sign-out"));
	removeToken();
};

export const FETCH_USER = "FETCH_USER";
export const fetchUser = () =>
	createRequestAction(FETCH_USER, "get", `/auth/user`);

export const CHECK_TOKEN = "CHECK_TOKEN";
export const checkToken = () => {
	const accessToken = loadToken();
	if (accessToken) {
		setAuthorizationHeader(accessToken);
	}
	return {
		type: CHECK_TOKEN,
		payload: { isAuthorized: !!accessToken },
	};
};

export const RESET_ERRORS = "RESET_ERRORS";
export const resetErrors = () => ({
	type: RESET_ERRORS,
});
