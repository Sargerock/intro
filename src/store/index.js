import axios from "axios";
import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {requestsMiddleware, rootSaga} from "./sagas";

import {createPostsReducer} from "./posts/posts-reducer";
import auth from "./auth/auth-reducer";
import profile from "./profile/profile-reducer";
import {authInterceptor} from "./middleware";
import {postsNamespaces} from "./posts/posts-actions";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL + "api";

const reducers = combineReducers({
	posts: createPostsReducer(postsNamespaces.HOME),
	profilePosts: createPostsReducer(postsNamespaces.PROFILE),
	selectedProfilePosts: createPostsReducer(postsNamespaces.SELECTED_PROFILE),
	mentionPosts: createPostsReducer(postsNamespaces.MENTIONS),
	tagPosts: createPostsReducer(postsNamespaces.TAG),
	auth,
	profile
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [thunk, authInterceptor, ...requestsMiddleware, sagaMiddleware];

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(...middleware),
);

const store = createStore(
	reducers,
	enhancer
);

sagaMiddleware.run(rootSaga);

export default store;
