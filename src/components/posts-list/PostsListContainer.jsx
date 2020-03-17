import { connect } from "react-redux";

import PostsList from "./PostsList";
import { getPosts } from "../../store/posts/posts-thunks";

const isMorePostsAvaible = (isFirstFetch, cursor, totalPostsCount) => {
	return isFirstFetch || cursor < totalPostsCount;
};

const mapStateToProp = state => {
	const { posts, isFirstFetch, cursor, totalPostsCount } = state;
	return {
		posts,
		isMorePostsAvaible: isMorePostsAvaible(
			isFirstFetch,
			cursor,
			totalPostsCount
		)
	};
};

export default connect(mapStateToProp, { getPosts })(PostsList);
