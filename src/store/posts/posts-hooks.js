import { useSelector } from "react-redux";

const isMorePostsAvaible = (isFirstFetch, cursor, totalPostsCount) => {
	return isFirstFetch || cursor < totalPostsCount;
};

export const usePosts = () => {
	const posts = useSelector(state => state.posts);
	const error = useSelector(state => state.error);
	const hasMore = useSelector(({ isFirstFetch, cursor, totalPostsCount }) =>
		isMorePostsAvaible(isFirstFetch, cursor, totalPostsCount)
	);
	return { posts, error, hasMore };
};
