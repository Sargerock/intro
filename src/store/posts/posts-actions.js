import { createRequestAction, createDispatchRequestAction } from "../../utils";

export const FETCH_POSTS = "FETCH_POSTS";
export const fetchPosts = () => async (dispatch, getState) => {
	const {
		posts: { cursor, postsPerFetch }
	} = getState();
	dispatch(
		createRequestAction(
			FETCH_POSTS,
			"get",
			`/posts?sort=createdAt&order=desc&offset=${cursor}&limit=${postsPerFetch}`
		)
	);
};

export const CREATE_POST = "CREATE_POST";
export const createPost = data =>
	createDispatchRequestAction(CREATE_POST, "post", "/posts", data);

export const DELETE_POST = "DELETE_POST";
export const deletePost = id =>
	createDispatchRequestAction(
		DELETE_POST,
		"delete",
		`/posts/${id}`,
		{},
		{ id }
	);

export const EDIT_POST = "EDIT_POST";
export const editPost = (id, data, meta) =>
	createDispatchRequestAction(EDIT_POST, "put", `/posts/${id}`, data, meta);
