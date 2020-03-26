import { createRequestAction } from "../../utils";

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
export const createPost = data => dispatch => {
	dispatch(createRequestAction(CREATE_POST, "post", "/posts", data));
};

export const DELETE_POST = "DELETE_POST";
export const deletePost = id => dispatch => {
	dispatch(
		createRequestAction(DELETE_POST, "delete", `/posts/${id}`, {}, { id })
	);
};
