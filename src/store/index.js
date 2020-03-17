import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import postsReducer from "./posts/posts-reducer";

export default createStore(postsReducer, applyMiddleware(ReduxThunk));
