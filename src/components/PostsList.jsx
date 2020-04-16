import React, {useEffect} from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import {useDispatch} from "react-redux";

import Post from "./Post";
import Loader from "components/common/Loader";
import {usePosts} from "store/posts/posts-selectors";
import {fetchPosts, resetPosts} from "store/posts/posts-actions";
import {useQuery} from "utils/hooks";

const PostsList = ({authorName}) => {
	const dispatch = useDispatch();
	const query = useQuery();
	const tag = query.get("tag");
	const mentionName = query.get("mentionName");
	const {posts, hasMore} = usePosts();

	useEffect(() => {
		dispatch(fetchPosts(authorName, tag, mentionName));
		return () => {
			dispatch(resetPosts());
		};
	}, [dispatch, authorName, tag, mentionName]);

	return (
		<>
			<InfiniteScroll
				loadMore={() => dispatch(fetchPosts(authorName, tag))}
				hasMore={hasMore}
				loader={<Loader key={0}/>}
			>
				{posts.map(({id, text, userId, user}) => (
					<Post
						key={id}
						id={id}
						text={text}
						authorId={userId}
						authorName={user.userName}
					/>
				))}
			</InfiniteScroll>
		</>
	);
};

PostsList.propTypes = {
	authorName: PropTypes.string
};

PostsList.defaultProps = {
	authorName: "",
};

export default PostsList;
