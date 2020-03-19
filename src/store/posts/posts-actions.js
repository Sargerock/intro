import axios from "axios";

export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILED = "GET_POSTS_FAILED";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILED = "CREATE_POST_FAILED";

export const getPostsSuccess = (posts, totalPostsCount) => ({
	type: GET_POSTS_SUCCESS,
	payload: {
		posts,
		totalPostsCount
	}
});

export const getPostsFailed = message => ({
	type: GET_POSTS_FAILED,
	payload: {
		message
	}
});

export const createPostSuccess = post => ({
	type: CREATE_POST_SUCCESS,
	payload: {
		post
	}
});

export const createPostFailed = message => ({
	type: GET_POSTS_FAILED,
	payload: {
		message
	}
});

export const getPosts = () => async (dispatch, getState) => {
	const { cursor, postsPerFetch } = getState();

	try {
		const result = await axios.get(
			`posts?_sort=timestamp&_order=desc&_start=${cursor}&_limit=${postsPerFetch}`
		);
		dispatch(getPostsSuccess(result.data, result.headers["x-total-count"]));
	} catch (error) {
		dispatch(getPostsFailed(error.message));
	}
};

export const createPost = data => async dispatch => {
	try {
		const response = await axios.post("posts", data);
		dispatch(createPostSuccess(response.data));
	} catch (error) {
		dispatch(createPostFailed(error.message));
	}
};
