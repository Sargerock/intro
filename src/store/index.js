import axios from "axios";
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import {requestsMiddleware, rootSaga} from "./sagas";

import posts from "./posts/posts-reducer";
import auth from "./auth/auth-reducer";
import {createProfileReducer} from "./profile/profile-reducer";
import {authInterceptor} from "./middleware";


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL + "api";

const reducers = combineReducers({
	posts,
	auth,
	profile: createProfileReducer(),
	selectedProfile: createProfileReducer("selected")
});

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(thunk, logger, authInterceptor, ...requestsMiddleware, sagaMiddleware);

const store = createStore(
	reducers,
	middleware
);

sagaMiddleware.run(rootSaga);

export default store;
