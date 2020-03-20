import { useSelector } from "react-redux";

export const usePosts = () => {
	const posts = useSelector(state => state.posts.posts);
	const error = useSelector(state => state.posts.error);
	const hasMore = useSelector(state => state.posts.hasMore);

	return { posts, error, hasMore };
};
