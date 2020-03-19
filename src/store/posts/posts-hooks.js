import { useSelector } from "react-redux";

const isMorePostsAvaible = (isFirstFetch, cursor, totalPostsCount) => {
	return isFirstFetch || cursor < totalPostsCount;
};

export const usePosts = () => {
	const posts = useSelector(state => state.posts.posts);
	const error = useSelector(state => state.posts.error);
	const hasMore = useSelector(
		({ posts: { isFirstFetch, cursor, totalPostsCount } }) =>
			isMorePostsAvaible(isFirstFetch, cursor, totalPostsCount)
	);
	return { posts, error, hasMore };
};
