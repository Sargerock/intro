import React from "react";
import PropTypes from "prop-types";

import Avatar from "../../common/avatar/Avatar";
import { useProfile } from "../../../store/auth/auth-selectors";

import { WrapperPost, PostBody, PostMessage } from "./PostStyled";
import EditableTextBody from "../editable-text-body/EditableTextBody";

const Post = props => {
	const { id, text, authorId, authorName } = props;
	const isAuthor = useProfile().userId === authorId;

	return (
		<WrapperPost>
			<div>
				<Avatar src="https://via.placeholder.com/100" alt="avatar" />
			</div>
			<PostBody>
				<p>
					<strong>{authorName}</strong>
				</p>
				{isAuthor ? (
					<EditableTextBody id={id} text={text} />
				) : (
					<PostMessage>{text}</PostMessage>
				)}
			</PostBody>
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
