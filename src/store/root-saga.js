import axios from "axios";
import { createDriver } from "redux-saga-requests-axios";
import { createRequestInstance, watchRequests } from "redux-saga-requests";

import { GET_POSTS } from "./posts/posts-actions";
import { authHelper } from "../utils";

// eslint-disable-next-line
function* onErrorSaga(response, action) {
	switch (action.type) {
		case GET_POSTS:
			if (response.status === 401) {
				authHelper.saveToken("");
			}
			return response;
		default:
			return response;
	}
}

function* rootSaga() {
	yield createRequestInstance({
		driver: createDriver(axios),
		onError: onErrorSaga
	});
	yield watchRequests();
}

export default rootSaga;
