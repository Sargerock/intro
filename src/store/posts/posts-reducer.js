import { success, error } from "redux-saga-requests";
import {
	FETCH_POSTS,
	CREATE_POST,
	DELETE_POST,
	EDIT_POST,
	RESET_POSTS,
	FETCH_PROFILE,
	FETCH_MENTION_DATA,
	SET_FETCHING_TAG,
} from "./posts-actions";

const initialState = {
	posts: [],
	cursor: 0,
	hasMore: false,
	postsPerFetch: 5,
	error: "",
	validationErrors: null,
	isLoading: false,
	profile: null,
	mentionData: [],
	tag: "",
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PROFILE:
			return {
				...initialState,
				isLoading: true,
			};
		case FETCH_POSTS:
			return {
				...state,
				error: "",
				hasMore: false,
			};
		case RESET_POSTS:
			return initialState;

		case CREATE_POST:
		case EDIT_POST:
			return {
				...state,
				error: "",
				validationErrors: null,
			};
		case SET_FETCHING_TAG:
			return {
				...initialState,
				hasMore: true,
				tag: action.payload.tag,
			};

		case success(FETCH_POSTS):
			const cursor = state.cursor + action.payload.data.posts.length;
			return {
				...state,
				posts: [...state.posts, ...action.payload.data.posts],
				cursor,
				hasMore: cursor < action.payload.data.totalCount,
				isLoading: false,
			};
		case success(CREATE_POST):
			return {
				...state,
				posts: [action.payload.data, ...state.posts],
				cursor: state.cursor + 1,
				isLoading: false,
			};
		case success(DELETE_POST):
			debugger;
			return {
				...state,
				posts: state.posts.filter((post) => post.id !== action.meta.id),
				cursor: state.cursor - 1,
			};
		case success(EDIT_POST):
			return {
				...state,
				posts: state.posts.map((post) =>
					post.id === action.payload.data.id
						? { ...post, text: action.payload.data.text }
						: post
				),
			};
		case success(FETCH_PROFILE):
			return {
				...state,
				profile: action.payload.data,
				isLoading: false,
				error: "",
			};
		case success(FETCH_MENTION_DATA):
			return {
				...state,
				mentionData: action.payload.data.map((data) => ({
					id: data.id,
					display: data.userName || data.tag,
				})),
			};
		case error(FETCH_POSTS):
			return {
				...state,
				error: action.payload.message,
				hasMore: false,
				isLoading: false,
			};
		case error(CREATE_POST):
		case error(EDIT_POST):
		case error(FETCH_PROFILE):
			return {
				...state,
				error: action.payload.message,
				validationErrors: action.payload.errors,
				isLoading: false,
			};
		default:
			return state;
	}
};
