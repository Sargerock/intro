import { createRequestAction } from "../../utils";

export const SIGN_IN = "SIGN_IN";
export const signIn = data => dispatch =>
	dispatch(createRequestAction(SIGN_IN, "post", "/signin", data));

export const SIGN_UP = "SIGN_UP";
export const signUp = data => dispatch =>
	dispatch(createRequestAction(SIGN_UP, "post", "/signup", data));

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => ({ type: SIGN_OUT });

export const GET_USER = "GET_USER";
export const getUser = () => (dispatch, getState) => {
	if (getState().auth.token)
		dispatch(createRequestAction(GET_USER, "get", `/user`));
};
