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

export const saveTokens = (accessToken, refreshToken) => {
	if (!accessToken) return;
	axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	localStorage.setItem("accessToken", accessToken);
	if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
};
export const loadTokens = () => {
	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");
	if (accessToken)
		axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	return { accessToken, refreshToken };
};
export const removeTokens = () => {
	delete axios.defaults.headers.common.Authorization;
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
};
