import { FETCH_POSTS, CREATE_POST, DELETE_POST } from "./posts-actions";
import { success, error } from "redux-saga-requests";

const initialState = {
	posts: [],
	cursor: 0,
	hasMore: true,
	postsPerFetch: 3,
	error: "",
	isLoading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POSTS:
		case CREATE_POST:
			return {
				...state,
				isLoading: true,
				error: ""
			};

		case success(FETCH_POSTS):
			const cursor = state.cursor + action.payload.data.posts.length;
			return {
				...state,
				posts: [...state.posts, ...action.payload.data.posts],
				cursor,
				hasMore: cursor < action.payload.data.totalCount,
				isLoading: false
			};
		case success(CREATE_POST):
			return {
				...state,
				posts: [action.payload.data, ...state.posts],
				cursor: state.cursor + 1,
				isLoading: false
			};
		case success(DELETE_POST):
			return {
				...state,
				posts: state.posts.filter(post => post.id !== action.meta.id)
			};
		case error(FETCH_POSTS):
		case error(CREATE_POST):
			return {
				...state,
				error: action.payload.message
			};
		default:
			return state;
	}
};
