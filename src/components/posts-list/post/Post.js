import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Avatar from "../../common/avatar/Avatar";
import { useProfile } from "../../../store/auth/auth-selectors";
import { deletePost } from "../../../store/posts/posts-actions";

import { WrapperPost, PostMessage, ButtonPost } from "./PostStyled";

const Post = props => {
	const dispatch = useDispatch();
	const { userId } = useProfile();
	const { id, text, authorId, authorName } = props;
	return (
		<WrapperPost>
			<div>
				<Avatar src="https://via.placeholder.com/100" alt="avatar" />
			</div>
			<div>
				<p>
					<strong>{authorName}</strong>
				</p>
				<PostMessage>{text}</PostMessage>
				{authorId === userId ? (
					<ButtonPost onClick={() => dispatch(deletePost(id))}>
						&times;
					</ButtonPost>
				) : null}
			</div>
		</WrapperPost>
	);
};

Post.propTypes = {
	id: PropTypes.number.isRequired,
	authorName: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	authorId: PropTypes.number.isRequired
};

export default Post;
