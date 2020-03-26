import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { requestsPromiseMiddleware } from "redux-saga-requests";

import posts from "./posts/posts-reducer";
import auth from "./auth/auth-reducer";
import rootSaga from "./root-saga";

axios.defaults.baseURL = "http://localhost:8000/api";

const reducers = combineReducers({
	posts,
	auth
});

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
