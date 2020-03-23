import axios from "axios";
import { createDriver } from "redux-saga-requests-axios";
import { createRequestInstance, watchRequests } from "redux-saga-requests";

import { GET_POSTS } from "./posts/posts-actions";
import { authHelper } from "../utils";
import { SIGN_IN } from "./auth/auth-actions";

// eslint-disable-next-line
function* onErrorSaga(error, action) {
	switch (action.type) {
		case GET_POSTS:
			if (error.response.status === 401) {
				authHelper.saveToken("");
			}
			break;
		case SIGN_IN:
			debugger;
			if (error.response.status === 400)
				return { error: new Error("Wrong email or password.") };
			break;
		default:
			return { error };
	}
	return { error };
}

function* rootSaga() {
	yield createRequestInstance({
		driver: createDriver(axios),
		onError: onErrorSaga
	});
	yield watchRequests();
}

export default rootSaga;
