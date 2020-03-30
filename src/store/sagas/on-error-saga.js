import axios from "axios";
import { call, put } from "redux-saga/effects";
import { sendRequest } from "redux-saga-requests";

import { loadTokens, removeTokens, refreshTokens } from "../../utils";
import { SIGN_OUT } from "../auth/auth-actions";

export default function* onErrorSaga(error, action) {
	if (!error.response) return { error };
	if (error.response.status === 401) {
		try {
			const { refreshToken } = loadTokens();

			const response = yield call(
				axios.post,
				"http://localhost:8000/api/auth/refresh",
				{ refreshToken }
			);
			refreshTokens(response.data.accessToken);
			return yield call(sendRequest, action, { silent: true });
		} catch (e) {
			removeTokens();
			yield put({ type: SIGN_OUT });
		}
	}
	return error.response.data?.message
		? { error: error.response.data }
		: { error };
}
