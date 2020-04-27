import React, {useState} from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import {useDispatch} from "react-redux";

import Post from "./Post";
import Loader from "components/common/Loader";
import {fetchPosts, postsNamespaces} from "store/posts/posts-actions";
import EditPost from "./EditPost";

import {ModalStyled, RefreshIcon} from "./styles";

const PostsList = (props) => {
	const dispatch = useDispatch();
	const {postsState, userName, mentionName, namespace, tag} = props;
	const {posts, hasMore, cursor, postsPerFetch} = postsState;
	const [modalOptions, setModalOptions] = useState({
		isVisible: false,
		id: 0,
		text: ""
	});

	return (
		<>
			<InfiniteScroll
				loadMore={() => dispatch(fetchPosts({
					userName,
					tag,
					mentionName,
					namespace,
					cursor,
					postsPerFetch
				}))}
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
			{!hasMore && <RefreshIcon onClick={() => dispatch(fetchPosts({
				userName,
				tag,
				mentionName,
				namespace,
				cursor: 0,
				postsPerFetch,
				isInitial: true
			}))}
			/>}

			<ModalStyled
				isOpen={modalOptions.isVisible}
				onRequestClose={() => setModalOptions({...modalOptions, isVisible: false})}
			>
				<EditPost id={modalOptions.id} text={modalOptions.text} setModalOptions={setModalOptions}/>
			</ModalStyled>
		</>
	);
};

PostsList.propTypes = {
	userName: PropTypes.string,
	mentionName: PropTypes.string,
	tag: PropTypes.string,
	namespace: PropTypes.oneOf(Object.values(postsNamespaces)),
	postsState: PropTypes.shape({
		posts: PropTypes.array.isRequired,
		hasMore: PropTypes.bool.isRequired,
		cursor: PropTypes.number.isRequired,
		postsPerFetch: PropTypes.number.isRequired
	}).isRequired
};

PostsList.defaultProps = {
	userName: "",
	mentionName: "",
	tag: ""
};

export default PostsList;
