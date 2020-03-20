import axios from "axios";
import { createDriver } from "redux-saga-requests-axios";
import { createRequestInstance, watchRequests } from "redux-saga-requests";

function* rootSaga() {
	yield createRequestInstance({ driver: createDriver(axios) });
	yield watchRequests();
}

export default rootSaga;
