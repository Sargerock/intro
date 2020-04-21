import axios from "axios";
import {createDriver} from "redux-saga-requests-axios";
import {handleRequests} from "redux-saga-requests";
import {all} from "redux-saga/effects";

import onSuccessSaga from "./on-success-saga";

export const {requestsSagas, requestsMiddleware} = handleRequests({
	driver: createDriver(axios),
	onSuccess: onSuccessSaga,
	promisify: true
});

console.log(requestsMiddleware);

export function* rootSaga() {
	yield all(requestsSagas);
}
