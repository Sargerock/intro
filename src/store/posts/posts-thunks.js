import Axios from "axios";

import { getPostsSuccess, createPostSuccess } from "./posts-actions";

const postsUrl = "http://localhost:8000/posts";

export const getPosts = () => async (dispatch, getState) => {
	const { cursor, postsPerFetch } = getState();

	const result = await Axios.get(
		`${postsUrl}?_sort=timestamp&_order=desc&_start=${cursor}&_limit=${postsPerFetch}`
	);

	dispatch(getPostsSuccess(result.data, result.headers["x-total-count"]));
};

export const createPost = data => async dispatch => {
	const response = await Axios.post(postsUrl, data);
	dispatch(createPostSuccess(response.data));
};
