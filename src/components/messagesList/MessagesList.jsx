import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Message from "./message/Message";

const MessagesList = ({ messages }) => {
	useEffect(() => {}, []);

	return (
		<div>
			<Message
				author="author"
				messageText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, est!"
			/>
			<Message
				author="author"
				messageText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, est!"
			/>
			<Message
				author="author"
				messageText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, est!"
			/>
		</div>
	);
};

MessagesList.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired
		})
	)
};

MessagesList.defaultProps = {
	messages: []
};

export default MessagesList;
