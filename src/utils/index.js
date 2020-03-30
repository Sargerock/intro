import axios from "axios";

export const createRequestAction = (type, method, url, data, meta) => ({
	type,
	payload: {
		request: {
			url,
			method,
			data
		}
	},
	meta
});

export const createDispatchRequestAction = (
	type,
	method,
	url,
	data,
	meta
) => dispatch =>
	dispatch({
		type,
		payload: {
			request: {
				url,
				method,
				data
			}
		},
		meta
	});

export const saveTokens = (accessToken, refreshToken, options) => {
	if (!accessToken) return;
	const remember = options && options.remember;
	axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	const storage = remember ? localStorage : sessionStorage;
	storage.setItem("accessToken", accessToken);
	if (refreshToken) storage.setItem("refreshToken", refreshToken);
};

export const refreshTokens = accessToken => {
	if (!accessToken) return;
	const storage = localStorage.getItem("accessToken")
		? localStorage
		: sessionStorage;
	axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	storage.setItem("accessToken", accessToken);
};

export const loadTokens = () => {
	const accessToken =
		localStorage.getItem("accessToken") ||
		sessionStorage.getItem("accessToken");
	const refreshToken =
		localStorage.getItem("refreshToken") ||
		sessionStorage.getItem("refreshToken");
	if (accessToken)
		axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	return { accessToken, refreshToken };
};
export const removeTokens = () => {
	delete axios.defaults.headers.common.Authorization;
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
	sessionStorage.removeItem("accessToken");
	sessionStorage.removeItem("refreshToken");
};
