import axios from "axios";

export const createRequestAction = (type, method, url, data, meta) => ({
	type,
	payload: {
		request: {
			url,
			method,
			data,
		},
	},
	meta,
});

export const saveToken = (accessToken, options) => {
	if (!accessToken) {
		return;
	}
	const remember = options && options.remember;
	if (remember) {
		localStorage.setItem("accessToken", accessToken);
	}
};
export const loadToken = () => {
	const accessToken = localStorage.getItem("accessToken");
	return accessToken;
};
export const removeToken = () => {
	localStorage.removeItem("accessToken");
};

export const setAuthorizationHeader = (accessToken) => {
	axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
export const removeAuthorizationHeader = () => {
	delete axios.defaults.headers.common.Authorization;
};
