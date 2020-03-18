import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

import Post from "./post/Post";

const PostsList = props => {
	const { posts, isMorePostsAvaible, getPosts } = props;

	return (
		<div>
			<InfiniteScroll
				pageStart={0}
				loadMore={getPosts}
				hasMore={isMorePostsAvaible}
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
