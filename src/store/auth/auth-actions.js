import { createRequestAction } from "../../utils";

export const SIGN_IN = "SIGN_IN";
export const signIn = createRequestAction(SIGN_IN, "post", "/signin");

export const SIGN_UP = "SIGN_UP";
export const signUp = createRequestAction(SIGN_UP, "post", "/signup");

export const SIGN_OUT = "SIGN_OUT";
export const signOut = () => ({ type: SIGN_OUT });
