import {createRequestAction} from "../../utils";

export const FETCH_USER = "FETCH_USER";
export const fetchUser = () =>
	createRequestAction(FETCH_USER, "get", `/auth/user`);

export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const changePassword = (data) =>
	createRequestAction(CHANGE_PASSWORD, "put", "/users", data, {asPromise: true});
