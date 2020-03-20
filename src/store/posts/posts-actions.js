import { createRequestAction } from "../../utils";

export const GET_POSTS = "GET_POSTS";
export const getPosts = () => async (dispatch, getState) => {
	const {
		posts: { cursor, postsPerFetch }
	} = getState();
	dispatch({
		type: GET_POSTS,
		payload: {
			request: {
				url: `/posts?_sort=timestamp&_order=desc&_start=${cursor}&_limit=${postsPerFetch}`
			}
		}
	});
};

export const CREATE_POST = "CREATE_POST";
export const createPost = createRequestAction(CREATE_POST, "post", "/posts");
