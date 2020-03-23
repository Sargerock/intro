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

export const authHelper = {
	saveToken: token => {
		axios.defaults.headers = { Authorization: `Bearer ${token}` };
		localStorage.setItem("accessToken", token);
	},
	loadToken: () => {
		const token = localStorage.getItem("accessToken");
		axios.defaults.headers = { Authorization: `Bearer ${token}` };
		return token;
	}
};
