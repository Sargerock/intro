import { GET_POSTS, CREATE_POST, DELETE_POST } from "./posts-actions";
import { success, error } from "redux-saga-requests";

const initialState = {
	posts: [],
	cursor: 0,
	hasMore: true,
	postsPerFetch: 5,
	error: "",
	isLoading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
		case CREATE_POST:
			return {
				...state,
				isLoading: true,
				error: ""
			};

		case success(GET_POSTS):
			const { payload } = action;
			const cursor = state.cursor + payload.data.length;
			return {
				...state,
				posts: [...state.posts, ...payload.data],
				cursor,
				hasMore: cursor < payload.response.headers["x-total-count"],
				isLoading: false
			};
		case success(CREATE_POST):
			return {
				...state,
				posts: [action.payload.data, ...state.posts],
				totalPostsCount: state.totalPostsCount + 1,
				cursor: state.cursor + 1,
				isLoading: false
			};
		case success(DELETE_POST):
			return {
				...state,
				posts: state.posts.filter(post => post.id !== action.meta.id)
			};
		case error(GET_POSTS):
		case error(CREATE_POST):
			return {
				...state,
				error: action.payload.message
			};
		default:
			return state;
	}
};
