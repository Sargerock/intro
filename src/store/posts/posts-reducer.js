import {success, error} from "redux-saga-requests";
import {
	FETCH_POSTS,
	CREATE_POST,
	DELETE_POST,
	EDIT_POST,
} from "./posts-actions";

const initialState = {
	posts: [],
	cursor: 0,
	hasMore: true,
	postsPerFetch: 5,
	isLoading: false,
};

export const createPostsReducer = (namespace = "") => (state = initialState, action) => {
	if (action.meta?.namespaces && !action.meta?.namespaces.includes(namespace)) {
		return state;
	}

	switch (action.type) {
		case FETCH_POSTS:
			if (action.meta.isInitial) {
				return {
					...state,
					posts: [],
					cursor: 0
				}
			}
			return state;

		case CREATE_POST:
		case EDIT_POST:
			return {
				...state,
				isLoading: true
			};
		case success(FETCH_POSTS):
			const cursor = state.cursor + action.payload.data.posts.length;

			return {
				...state,
				posts: [...state.posts, ...action.payload.data.posts],
				cursor,
				hasMore: cursor < action.payload.data.totalCount,
			};
		case success(CREATE_POST):
			return {
				...state,
				posts: [action.payload.data, ...state.posts],
				cursor: state.cursor + 1,
				isLoading: false
			};
		case success(DELETE_POST):
			const filteredPosts = state.posts.filter((post) => post.id !== action.meta.id);
			return {
				...state,
				posts: filteredPosts,
				cursor: filteredPosts.length,
			};
		case success(EDIT_POST):
			return {
				...state,
				posts: state.posts.map((post) =>
					post.id === action.payload.data.id
						? {...post, text: action.payload.data.text}
						: post
				),
				isLoading: false
			};
		case error(FETCH_POSTS):
			return {
				...state,
				hasMore: false,
			};
		case error(CREATE_POST):
		case error(EDIT_POST):
			return {
				...state,
				isLoading: false,
			};
		default:
			return state;
	}
}
