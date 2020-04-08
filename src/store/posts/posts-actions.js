import { createRequestAction, createDispatchRequestAction } from "../../utils";

export const FETCH_POSTS = "FETCH_POSTS";
export const fetchPosts = (userName) => async (dispatch, getState) => {
	const {
		posts: { cursor, postsPerFetch },
	} = getState();
	dispatch(
		createRequestAction(
			FETCH_POSTS,
			"get",
			`/posts/${
				userName || ""
			}?sort=createdAt&order=desc&offset=${cursor}&limit=${postsPerFetch}`
		)
	);
};

export const CREATE_POST = "CREATE_POST";
export const createPost = (data) =>
	createDispatchRequestAction(CREATE_POST, "post", "/posts", data, {
		asPromise: true,
	});

export const DELETE_POST = "DELETE_POST";
export const deletePost = (id) =>
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

export const RESET_POSTS = "RESET_POSTS";
export const resetPosts = () => ({ type: RESET_POSTS });

export const FETCH_PROFILE = "FETCH_PROFILE";
export const fetchProfile = (userName) => ({
	type: FETCH_PROFILE,
	payload: {
		request: {
			url: `/users/${userName}`,
			method: "get",
		},
	},
});

export const FETCH_USERS = "FETCH_USERS";
export const fetchUsers = (userName) =>
	createDispatchRequestAction(
		FETCH_USERS,
		"get",
		`/users/find/${userName}`,
		{},
		{ asPromise: true }
	);
