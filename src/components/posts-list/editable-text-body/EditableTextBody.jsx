import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import ErrorMessage from "components/common/error-message";
import { editPost, deletePost } from "store/posts/posts-actions";

import {
	EditablePostMessage,
	ButtonDeletePost,
	ButtonEditPost,
} from "./EditableTextBodyStyled";

const textValidationSchema = yup
	.string()
	.required("Enter you message.")
	.min(8, "Message must contain at least 8 characters")
	.max(512, "Message is too long.");

const EditableTextBody = ({ id, text }) => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState({
		text,
		isEditable: false,
		error: "",
	});

	const onSaveHandle = async () => {
		try {
			await textValidationSchema.validate(message.text);
			dispatch(editPost(id, { text: message.text }, { id }));
			setMessage({ ...message, isEditable: false });
		} catch (e) {
			setMessage({ ...message, error: e.message });
		}
	};
	const onCancelHandle = () => {
		setMessage({
			text,
			isEditable: false,
		});
	};
	return (
		<>
			<EditablePostMessage
				html={message.text}
				disabled={!message.isEditable}
				onChange={(event) =>
					setMessage({ ...message, text: event.target.value, error: "" })
				}
			/>
			{message.error && (
				<ErrorMessage message={message.error} margin="10px 0" />
			)}
			<ButtonDeletePost onClick={() => dispatch(deletePost(id))}>
				&times;
			</ButtonDeletePost>
			<ButtonEditPost>
				{message.isEditable ? (
					<>
						<span onClick={onSaveHandle}>Save</span>
						<span onClick={onCancelHandle}>Cancel</span>
					</>
				) : (
					<span onClick={() => setMessage({ ...message, isEditable: true })}>
						Edit
					</span>
				)}
			</ButtonEditPost>
		</>
	);
};

EditableTextBody.propTypes = {
	id: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
};

export default EditableTextBody;
