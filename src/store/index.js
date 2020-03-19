import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import postsReducer from "./posts/posts-reducer";

axios.defaults.baseURL = "http://localhost:8000/";

const store = createStore(postsReducer, applyMiddleware(thunk));

export default store;
