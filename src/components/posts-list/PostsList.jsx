import React, { useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch } from "react-redux";

import Post from "./post";
import Loader from "components/common/loader";
import { usePosts } from "store/posts/posts-selectors";
import { fetchPosts, resetPosts } from "store/posts/posts-actions";
import { useProfile } from "store/auth/auth-selectors";
import { useQuery } from "utils/hooks";

const PostsList = ({ authorName }) => {
	const dispatch = useDispatch();
	const tag = useQuery().get("tag");
	const { posts, hasMore } = usePosts();
	const { userName } = useProfile();

	useEffect(() => {
		if (userName) dispatch(fetchPosts(authorName, tag));
	}, [dispatch, userName, authorName, tag]);

	useEffect(() => {
		return () => {
			dispatch(resetPosts());
		};
	}, [dispatch, authorName, tag]);

	return (
		<div>
			<InfiniteScroll
				pageStart={0}
				loadMore={() => dispatch(fetchPosts(authorName, tag))}
				hasMore={hasMore}
				loader={<Loader key={0} />}
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
			id: PropTypes.number.isRequired,
		})
	),
};

PostsList.defaultProps = {
	posts: [],
};

export default PostsList;
