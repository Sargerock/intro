export const getPostsSuccess = (posts, totalPostsCount) => ({
	type: "GET_POSTS_SUCCESS",
	payload: {
		posts,
		totalPostsCount
	}
});

export const createPostSuccess = post => ({
	type: "CREATE_POST_SUCCESS",
	payload: {
		post
	}
});
