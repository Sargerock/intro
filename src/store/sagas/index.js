import axios from "axios";
import { createDriver } from "redux-saga-requests-axios";
import { handleRequests } from "redux-saga-requests";
import { all } from "redux-saga/effects";

import onErrorSaga from "./on-error-saga";
import onSuccessSaga from "./on-success-saga";

export const { requestsSagas, requestsMiddleware } = handleRequests({
	driver: createDriver(axios),
	onError: onErrorSaga,
	onSuccess: onSuccessSaga,
});

export function* rootSaga() {
	yield all(requestsSagas);
}
