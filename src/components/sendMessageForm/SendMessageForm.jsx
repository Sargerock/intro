import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../common/avatar/Avatar";

import Div from "./SendMessageFormStyled";

const SendMessageForm = props => {
	const [author, setAuthor] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const onHandleChange = ({ target: { name, value } }) => {
		switch (name) {
			case "author":
				setAuthor(value);
				break;
			case "message":
				setMessage(value);
				break;
		}
	};

	const onMessageFormSubmit = e => {
		e.preventDefault();
		if (author.length < 3) {
			setError("Author name must be at least 3 chars long.");
			return;
		}
		if (message.length < 10) {
			setError("Message is too short.");
			return;
		}
		setError("");
	};

	return (
		<Div>
			<Avatar src="https://via.placeholder.com/100" alt="avatar" size="50" />
			<form onSubmit={onMessageFormSubmit}>
				<input
					name="author"
					type="text"
					placeholder="Your name"
					value={author}
					onChange={onHandleChange}
				/>
				<textarea
					name="message"
					type="text"
					placeholder="What you think ?"
					value={message}
					onChange={onHandleChange}
				/>
				{error && <div>{error}</div>}
				<button type="submit">Send</button>
			</form>
		</Div>
	);
};

SendMessageForm.propTypes = {};

export default SendMessageForm;
