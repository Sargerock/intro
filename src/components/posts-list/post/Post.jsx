import React from "react";
import PropTypes from "prop-types";

import Avatar from "../../common/avatar/Avatar";

import Div from "./PostStyled";

const Post = ({ id, author, messageText }) => {
	return (
		<Div>
			<div>
				<Avatar src="https://via.placeholder.com/100" alt="avatar" />
			</div>
			<div>
				<p className="author">{author}</p>
				<p className="message">{messageText}</p>
			</div>
		</Div>
	);
};

Post.propTypes = {
	author: PropTypes.string.isRequired,
	messageText: PropTypes.string.isRequired
};

export default Post;
