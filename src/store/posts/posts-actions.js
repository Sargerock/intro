import moment from "moment";

import { createRequestAction } from "../../utils";

export const GET_POSTS = "GET_POSTS";
export const getPosts = () => async (dispatch, getState) => {
	const {
		posts: { cursor, postsPerFetch }
	} = getState();
	dispatch(
		createRequestAction(
			GET_POSTS,
			"get",
			`/660/posts?_sort=timestamp&_order=desc&_start=${cursor}&_limit=${postsPerFetch}`
		)
	);
};

export const CREATE_POST = "CREATE_POST";
export const createPost = data => (dispatch, getState) => {
	const timestamp = moment().unix();
	const { userId, userName } = getState().auth.profile;
	dispatch(
		createRequestAction(CREATE_POST, "post", "/660/posts", {
			...data,
			timestamp,
			author: userName,
			userId
		})
	);
};

export const DELETE_POST = "DELETE_POST";
export const deletePost = id => dispatch => {
	dispatch(
		createRequestAction(DELETE_POST, "delete", `/660/posts/${id}`, {}, { id })
	);
};
