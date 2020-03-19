import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {
	createRequestInstance,
	requestsPromiseMiddleware,
	watchRequests
} from "redux-saga-requests";
import { createDriver } from "redux-saga-requests-axios";

import postsReducer from "./posts/posts-reducer";

axios.defaults.baseURL = "http://localhost:8000/";

const reducers = combineReducers({
	posts: postsReducer
});

function* rootSaga() {
	yield createRequestInstance({ driver: createDriver(axios) });
	yield watchRequests();
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	reducers,
	applyMiddleware(
		thunk,
		requestsPromiseMiddleware({ auto: true }),
		sagaMiddleware
	)
);

sagaMiddleware.run(rootSaga);

export default store;
