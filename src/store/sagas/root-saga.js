import axios from "axios";
import { createDriver } from "redux-saga-requests-axios";
import { createRequestInstance, watchRequests } from "redux-saga-requests";

import onErrorSaga from "./on-error-saga";
import onSuccessSaga from "./on-success-saga";

function* rootSaga() {
	yield createRequestInstance({
		driver: createDriver(axios),
		onError: onErrorSaga,
		onSuccess: onSuccessSaga
	});
	yield watchRequests();
}

export default rootSaga;
