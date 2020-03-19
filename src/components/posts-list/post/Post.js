import React from "react";
import PropTypes from "prop-types";

import Avatar from "../../common/avatar/Avatar";

import { WrapperPost, PostMessage } from "./PostStyled";

const Post = ({ author, messageText }) => {
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
			</div>
		</WrapperPost>
	);
};

Post.propTypes = {
	author: PropTypes.string.isRequired,
	messageText: PropTypes.string.isRequired
};

export default Post;
