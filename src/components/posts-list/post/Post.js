import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Avatar from "../../common/avatar/Avatar";
import { useProfile } from "../../../store/auth/auth-selectors";
import { deletePost } from "../../../store/posts/posts-actions";

import { WrapperPost, PostMessage, ButtonPost } from "./PostStyled";

const Post = ({ id, author, messageText, authorId }) => {
	const dispatch = useDispatch();
	const { userId } = useProfile();
	return (
		<WrapperPost>
			<div>
				<Avatar src="https://via.placeholder.com/100" alt="avatar" />
			</div>
			<div>
				<p>
					<strong>{author}</strong>
				</p>
				<PostMessage>{messageText}</PostMessage>
				{authorId === userId ? (
					<ButtonPost onClick={() => dispatch(deletePost(id))}>
						&times;
					</ButtonPost>
				) : (
					undefined
				)}
			</div>
		</WrapperPost>
	);
};

Post.propTypes = {
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	messageText: PropTypes.string.isRequired,
	authorId: PropTypes.number.isRequired
};

export default Post;
