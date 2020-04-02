import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch } from "react-redux";

import Post from "./post/Post";
import { usePosts } from "../../store/posts/posts-selectors";
import { fetchPosts } from "../../store/posts/posts-actions";
import { useAuthorization } from "../../store/auth/auth-selectors";

const PostsList = () => {
	const dispatch = useDispatch();
	const { posts, error, hasMore, isLoading } = usePosts();
	const {
		isLoading: authorizationIsLoading,
		error: authorizationError
	} = useAuthorization();

	return (
		<div>
			<InfiniteScroll
				pageStart={0}
				loadMore={() =>
					authorizationIsLoading ||
					authorizationError ||
					isLoading ||
					error ||
					dispatch(fetchPosts())
				}
				hasMore={hasMore}
				loader={<div key={0}>Loading ...</div>}
			>
				{posts.map(({ id, text, userId, user }) => (
					<Post
						key={id}
						id={id}
						text={text}
						authorId={userId}
						authorName={user.userName}
					/>
				))}
			</InfiniteScroll>
		</div>
	);
};

PostsList.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired
		})
	)
};

PostsList.defaultProps = {
	posts: []
};

export default PostsList;
