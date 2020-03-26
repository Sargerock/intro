import axios from "axios";
import { createDriver } from "redux-saga-requests-axios";
import { createRequestInstance, watchRequests } from "redux-saga-requests";

import { FETCH_POSTS } from "./posts/posts-actions";
import { saveTokens, removeTokens } from "../utils";
import { SIGN_IN, SIGN_UP } from "./auth/auth-actions";

// eslint-disable-next-line
function* onErrorSaga(error, action) {
	switch (action.type) {
		case FETCH_POSTS:
			if (error.response.status === 401) {
				removeTokens();
			}
			break;
		case SIGN_IN:
			if (error.response.status === 400)
				return { error: new Error("Wrong email or password.") };
			break;
		default:
			return { error };
	}
	return { error };
}

// eslint-disable-next-line
function* onSuccessSaga(response, action) {
	if (action.type === SIGN_IN || action.type === SIGN_UP) {
		saveTokens(response.data.accessToken);
	}
	return response;
}

function* rootSaga() {
	yield createRequestInstance({
		driver: createDriver(axios),
		//onError: onErrorSaga,
		onSuccess: onSuccessSaga
	});
	yield watchRequests();
}

export default rootSaga;
