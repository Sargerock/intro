import axios from "axios";
import { call } from "redux-saga/effects";
import { sendRequest } from "redux-saga-requests";

import { saveTokens, loadTokens, removeTokens } from "../../utils";
import { SIGN_OUT } from "../auth/auth-actions";

export default function* onErrorSaga(error, action) {
	if (error.response?.status === 401) {
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
