import {
	createRequestAction,
	loadToken, removeAuthorizationHeader,
	removeToken,
	setAuthorizationHeader,
} from "utils";

export const SIGN_IN = "SIGN_IN";
export const signIn = (data, meta) =>
	createRequestAction(SIGN_IN, "post", "/auth/sign-in", data, {...meta, asPromise: true});

export const SIGN_UP = "SIGN_UP";
export const signUp = (data, meta) =>
	createRequestAction(SIGN_UP, "post", "/auth/sign-up", data, {...meta, asPromise: true});

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => {
	removeToken();
	removeAuthorizationHeader();
	return {type: SIGN_OUT};
};

export const CHECK_TOKEN = "CHECK_TOKEN";
export const checkToken = () => {
	const accessToken = loadToken();
	if (accessToken) {
		setAuthorizationHeader(accessToken);
	}
	return {
		type: CHECK_TOKEN,
		payload: {isAuthorized: !!accessToken},
	};
};

export const SET_ALERT_ERROR = "SET_ALERT_ERROR";
export const setAlertMessage = (error) => ({
	type: SET_ALERT_ERROR,
	payload: {error}
})
