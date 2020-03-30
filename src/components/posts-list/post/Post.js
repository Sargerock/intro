import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import Avatar from "../../common/avatar/Avatar";
import { useProfile } from "../../../store/auth/auth-selectors";
import { deletePost, editPost } from "../../../store/posts/posts-actions";

import {
	WrapperPost,
	EditablePostMessage,
	ButtonDeletePost,
	ButtonEditPost
} from "./PostStyled";
import ErrorMessage from "../../common/error-message/ErrorMessage";

const textValidationSchema = yup
	.string()
	.required("Enter you message.")
	.min(8, "Message must contain at least 8 characters")
	.max(512, "Message is too long.");

const Post = props => {
	const dispatch = useDispatch();
	const { id, text, authorId, authorName } = props;
	const isAuthor = useProfile().userId === authorId;
	const [message, setMessage] = useState({
		text,
		isEditable: false,
		error: ""
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
			isEditable: false
		});
	};

	return (
		<WrapperPost>
			<div>
				<Avatar src="https://via.placeholder.com/100" alt="avatar" />
			</div>
			<div>
				<p>
					<strong>{authorName}</strong>
				</p>
				<EditablePostMessage
					html={message.text}
					disabled={!message.isEditable}
					onChange={event =>
						setMessage({ ...message, text: event.target.value, error: "" })
					}
				/>
				{message.error && (
					<ErrorMessage message={message.error} margin="20px 0 10px 0" />
				)}
				{isAuthor ? (
					<>
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
								<span
									onClick={() => setMessage({ ...message, isEditable: true })}
								>
									Edit
								</span>
							)}
						</ButtonEditPost>
					</>
				) : null}
			</div>
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
