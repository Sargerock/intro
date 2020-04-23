import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import {useDispatch} from "react-redux";

import Post from "./Post";
import Loader from "components/common/Loader";
import {usePosts} from "store/posts/posts-selectors";
import {fetchPosts, resetPosts} from "store/posts/posts-actions";
import {useQuery} from "utils/hooks";
import EditPost from "./EditPost";
import {ModalStyled} from "./styles";

const PostsList = ({authorName, mentionName}) => {
	const dispatch = useDispatch();
	const query = useQuery();
	const tag = query.get("tag");
	const {posts, hasMore} = usePosts();
	const [modalOptions, setModalOptions] = useState({
		isVisible: false,
		id: 0,
		text: ""
	});

	useEffect(() => {
		dispatch(fetchPosts(authorName, tag, mentionName, true));
		return () => {
			dispatch(resetPosts());
		};
	}, [dispatch, authorName, tag, mentionName]);

	return (
		<>
			<InfiniteScroll
				loadMore={() => dispatch(fetchPosts(authorName, tag, mentionName))}
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
						avatarUrl={user.avatarUrl}
						setModalOptions={setModalOptions}
					/>
				))}
			</InfiniteScroll>
			<ModalStyled
				isOpen={modalOptions.isVisible}
				onRequestClose={() => setModalOptions({...modalOptions, isVisible: false})}
			>
				<EditPost id={modalOptions.id} text={modalOptions.text} setModalOptions={setModalOptions} />
			</ModalStyled>
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
