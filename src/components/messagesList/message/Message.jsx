import React from "react";
import PropTypes from "prop-types";

import Div from "./MessageStyled";
import Avatar from "../../common/avatar/Avatar";

const Message = ({ author, messageText }) => {
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

Message.propTypes = {
	author: PropTypes.string.isRequired,
	messageText: PropTypes.string.isRequired
};

export default Message;
