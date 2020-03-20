export const createRequestAction = (type, method, url) => data => {
	return dispatch => {
		dispatch({
			type,
			payload: {
				request: {
					url,
					method,
					data
				}
			}
		});
	};
};

export const authHelper = {
	saveToken: token => {
		localStorage.setItem("accessToken", token);
	},
	loadToken: () => {
		return localStorage.getItem("accessToken");
	}
};
