import axios from "axios";
import { createDriver } from "redux-saga-requests-axios";
import {
	createRequestInstance,
	watchRequests,
	sendRequest
} from "redux-saga-requests";
import { call } from "redux-saga/effects";

import { saveTokens, loadTokens, removeTokens } from "../utils";
import { SIGN_IN, SIGN_UP, SIGN_OUT } from "./auth/auth-actions";

function* onErrorSaga(error, action) {
	if (error.response.status === 401) {
		try {
			const { refreshToken } = loadTokens();
			const response = yield call(
				axios.post,
				"http://localhost:8000/api/auth/refresh",
				{ refreshToken }
			);

			saveTokens(response.data.accessToken);
			return yield call(sendRequest, action, { silent: true });
		} catch (e) {
			removeTokens();
			yield call({ type: SIGN_OUT });
		}
	}
	return { error };
}

// eslint-disable-next-line
function* onSuccessSaga(response, action) {
	if (action.type === SIGN_IN || action.type === SIGN_UP) {
		saveTokens(response.data.accessToken, response.data.refreshToken);
	}
	return response;
}

function* rootSaga() {
	yield createRequestInstance({
		driver: createDriver(axios),
		onError: onErrorSaga,
		onSuccess: onSuccessSaga
	});
	yield watchRequests();
}

export default rootSaga;
