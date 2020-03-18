import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

import Avatar from "../common/avatar/Avatar";

import {
	WrapperSendPost,
	FormSendPost,
	InputSendPost,
	TextAreaSendPost,
	ButtonSendPost
} from "./SendPostFormStyled";

const SendPostForm = ({ dirty, isValid }) => {
	return (
		<WrapperSendPost>
			<Avatar src="https://via.placeholder.com/100" alt="avatar" size="50" />
			<FormSendPost>
				<ErrorMessage name="authorName" />
				<InputSendPost type="text" name="authorName" placeholder="Your name" />
				<ErrorMessage name="postMessage" />
				<TextAreaSendPost
					name="postMessage"
					component="textarea"
					placeholder="What you think ?"
				/>
				<ButtonSendPost type="submit" disabled={!dirty || !isValid}>
					Send
				</ButtonSendPost>
			</FormSendPost>
		</WrapperSendPost>
	);
};

SendPostForm.propTypes = {
	dirty: PropTypes.bool.isRequired,
	isValid: PropTypes.bool.isRequired
};

export default SendPostForm;
