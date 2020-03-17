const initialState = {
	posts: [],
	totalPostsCount: 0,
	cursor: 0,
	isFirstFetch: true,
	postsPerFetch: 5
};

export default (state = initialState, action) => {
	switch (action.type) {
		case "GET_POSTS_SUCCESS":
			return {
				...state,
				posts: [...state.messages, ...action.payload.posts],
				totalPostsCount: action.payload.totalPostsCount,
				cursor: state.cursor + action.payload.posts.length
			};
		case "CREATE_POST_SUCCESS":
			return {
				...state,
				posts: [action.payload.post, ...state.posts],
				totalPostsCount: state.totalPostsCount + 1,
				cursor: state.cursor + 1
			};
		default:
			return state;
	}
};
