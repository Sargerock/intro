import React from "react";
import PropTypes from "prop-types";

import Avatar from "../../common/avatar/Avatar";
import { useProfile } from "../../../store/auth/auth-selectors";

import { WrapperPost, PostBody, PostMessage } from "./PostStyled";
import EditableTextBody from "../editable-text-body/EditableTextBody";
import { Link } from "react-router-dom";

const Post = (props) => {
	const { id, text, authorId, authorName } = props;
	const isAuthor = useProfile().userId === authorId;

	return (
		<WrapperPost>
			<div>
				<Avatar src="https://via.placeholder.com/100" alt="avatar" />
			</div>
			<PostBody>
				<Link to={`/posts/${authorName}`}>
					<strong>{authorName}</strong>
				</Link>
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
	authorId: PropTypes.number.isRequired,
};

export default Post;
