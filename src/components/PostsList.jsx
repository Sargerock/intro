import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import {useDispatch} from "react-redux";

import Post from "./Post";
import Loader from "components/common/Loader";
import {fetchPosts, postsNamespaces} from "store/posts/posts-actions";
import {useQuery} from "utils/hooks";
import EditPost from "./EditPost";

import {ModalStyled} from "./styles";

const PostsList = ({postsState, authorName, mentionName, namespace}) => {
	const dispatch = useDispatch();
	const {posts, hasMore, cursor, postsPerFetch} = postsState;
	const query = useQuery();
	const tag = query.get("tag");
	const [modalOptions, setModalOptions] = useState({
		isVisible: false,
		id: 0,
		text: ""
	});

	useEffect(() => {
		if( !namespace || namespace === postsNamespaces.SELECTED_PROFILE) {
			dispatch(fetchPosts({
				userName:authorName,
				tag,
				namespace,
				cursor: 0,
				postsPerFetch,
				isInitial: true
			}))
		}
	}, [dispatch, tag, authorName, namespace, postsPerFetch]);

	return (
		<>
			<InfiniteScroll
				loadMore={() => dispatch(fetchPosts({
					userName:authorName,
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
