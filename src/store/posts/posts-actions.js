import {createRequestAction} from "utils";

export const FETCH_POSTS = "FETCH_POSTS";
export const fetchPosts = (userName, tag, mentionName, isInitial) => async (dispatch, getState) => {
	const {
		posts: {cursor, postsPerFetch},
	} = getState();
	const tagQuery = tag ? `&tag=${tag}` : "";
	const mentionQuery = mentionName ? `&mentionName=${mentionName}` : "";

	dispatch(
		createRequestAction(
			FETCH_POSTS,
			"get",
			`/posts/${
				userName || ""
			}?sort=createdAt&order=desc&offset=${cursor}&limit=${postsPerFetch + tagQuery + mentionQuery}`,
			null,
			{
				isInitial,
				destination: userName ? "profilePosts" : "posts"
			}
		)
	);
};

export const CREATE_POST = "CREATE_POST";
export const createPost = (data) =>
	createRequestAction(CREATE_POST, "post", "/posts", data, {
		asPromise: true,
	});

export const DELETE_POST = "DELETE_POST";
export const deletePost = (id) =>
	createRequestAction(DELETE_POST, "delete", `/posts/${id}`, {}, {id});

export const EDIT_POST = "EDIT_POST";
export const editPost = (id, data) =>
	createRequestAction(EDIT_POST, "put", `/posts/${id}`, data);

export const RESET_POSTS = "RESET_POSTS";
export const resetPosts = () => ({type: RESET_POSTS});

export const mentionTypes = {
	TAG: "TAG",
	USERNAME: "USERNAME"
}
export const FETCH_MENTION_DATA = "FETCH_MENTION_DATA";
export const fetchMentionData = (query, mentionType) => {
	const url = mentionType === mentionTypes.USERNAME
		? `/users/autocomplete/${query}`
		: `/posts/autocomplete/${query}`

	return createRequestAction(
		FETCH_MENTION_DATA,
		"get",
		url,
		{},
		{asPromise: true}
	)
};
