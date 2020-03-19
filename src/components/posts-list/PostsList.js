import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch } from "react-redux";

import Post from "./post/Post";
import { usePosts } from "../../store/posts/posts-hooks";
import { getPosts } from "../../store/posts/posts-actions";
import ErrorMessage from "../common/error-message/ErrorMessage";

const PostsList = () => {
	const { posts, error, hasMore } = usePosts();
	const dispatch = useDispatch();

	if (error) return <ErrorMessage message={error} withBorder />;
	return (
		<div>
			<InfiniteScroll
				pageStart={0}
				loadMore={() => dispatch(getPosts())}
				hasMore={hasMore}
				loader={<div key={0}>Loading ...</div>}
			>
				{posts.map(({ id, author, message }) => (
					<Post key={id} author={author} messageText={message} />
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
