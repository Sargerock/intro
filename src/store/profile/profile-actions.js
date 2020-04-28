import {createRequestAction} from "../../utils";

export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const changePassword = (data) =>
	createRequestAction(CHANGE_PASSWORD, "put", "/users", data, {
		asPromise: true,
	});

export const FETCH_PROFILE = "FETCH_PROFILE";
export const fetchProfile = () =>
	createRequestAction(FETCH_PROFILE, "get", `/auth/user`, null);

export const FETCH_SELECTED_PROFILE = "FETCH_SELECTED_PROFILE";
export const fetchSelectedProfile = (userName) =>
	createRequestAction(FETCH_SELECTED_PROFILE, "get", `/users/${userName}`, null);

export const CHANGE_AVATAR = "CHANGE_AVATAR";
export const changeAvatar = (data) =>
	createRequestAction(CHANGE_AVATAR, "put", `/users/upload/avatar`, data, {asPromise: true});
