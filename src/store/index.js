import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import posts from "./posts/posts-reducer";
import auth from "./auth/auth-reducer";
import { requestsMiddleware, rootSaga } from "./sagas/root-saga";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const reducers = combineReducers({
	posts,
	auth,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	reducers,
	applyMiddleware(thunk, logger, ...requestsMiddleware, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
