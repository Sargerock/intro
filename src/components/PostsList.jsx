import React, {useState} from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import {useDispatch} from "react-redux";

import Post from "./Post";
import Loader from "components/common/Loader";
import {fetchPosts} from "store/posts/posts-actions";
import EditPost from "./EditPost";

import {ModalStyled} from "./styles";

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
	authorName: PropTypes.string
};

PostsList.defaultProps = {
	authorName: "",
};

export default PostsList;
