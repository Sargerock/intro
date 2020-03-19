import {
	GET_POSTS_SUCCESS,
	CREATE_POST_SUCCESS,
	GET_POSTS_FAILED,
	CREATE_POST_FAILED
} from "./posts-actions";

const initialState = {
	posts: [],
	totalPostsCount: 0,
	cursor: 0,
	isFirstFetch: true,
	postsPerFetch: 5,
	error: ""
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS_SUCCESS:
			const { payload } = action;
			return {
				...state,
				posts: [...state.posts, ...payload.data],
				totalPostsCount: payload.response.headers["x-total-count"],
				cursor: state.cursor + payload.data.length,
				isFirstFetch: false,
				error: ""
			};
		case CREATE_POST_SUCCESS:
			return {
				...state,
				posts: [action.payload.post, ...state.posts],
				totalPostsCount: state.totalPostsCount + 1,
				cursor: state.cursor + 1,
				error: ""
			};
		case GET_POSTS_FAILED:
		case CREATE_POST_FAILED:
			return {
				...state,
				error: action.payload.message
			};
		default:
			return state;
	}
};
