import {createRequestAction} from "../../utils";

export const profileNamespaces = {
	CURRENT: "CURRENT",
	SELECTED: "SELECTED"
}

export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const changePassword = (data) =>
	createRequestAction(CHANGE_PASSWORD, "put", "/users", data, {
		asPromise: true,
		namespace: profileNamespaces.CURRENT
	});

export const FETCH_PROFILE = "FETCH_PROFILE";
export const fetchProfile = (namespace = profileNamespaces.CURRENT) =>
	createRequestAction(FETCH_PROFILE, "get", `/auth/user`, null, {namespace});

export const FETCH_SELECTED_PROFILE = "FETCH_SELECTED_PROFILE";
export const fetchSelectedProfile = (userName, namespace) =>
	createRequestAction(FETCH_SELECTED_PROFILE, "get", `/users/${userName}`, null, {namespace});

export const CHANGE_AVATAR = "CHANGE_AVATAR";
export const changeAvatar = (data) =>
	createRequestAction(CHANGE_AVATAR, "put", `/users/upload/avatar`, data, {
		namespace: profileNamespaces.CURRENT
	});
