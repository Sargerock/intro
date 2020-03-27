import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import Avatar from "../common/avatar/Avatar";
import { createPost } from "../../store/posts/posts-actions";

import {
	WrapperCreatePost,
	FormCreatePost,
	TextAreaCreatePost,
	ButtonCreatePost
} from "./CreatePostStyled";

const createPostValidationSchema = yup.object().shape({
	postMessage: yup
		.string()
		.required("Enter you message.")
		.min(8, "Message must contain at least 8 characters")
		.max(512, "Message is too long.")
});

const CreatePost = () => {
	const dispatch = useDispatch();

	const createPostHandleSubmit = ({ postMessage }, { resetForm }) => {
		dispatch(createPost({ text: postMessage }));
		resetForm();
	};

	const createPostInitialValues = {
		postMessage: ""
	};

	return (
		<WrapperCreatePost>
			<Avatar src="https://via.placeholder.com/100" alt="avatar" size="50" />
			<Formik
				initialValues={createPostInitialValues}
				validationSchema={createPostValidationSchema}
				onSubmit={createPostHandleSubmit}
			>
				{({ dirty, isValid, submitForm }) => (
					<FormCreatePost>
						<TextAreaCreatePost
							name="postMessage"
							component="textarea"
							placeholder="What you think ?"
							onKeyDown={e => {
								if (e.ctrlKey && e.key === "Enter") submitForm();
							}}
						/>
						<ErrorMessage name="postMessage" />
						<ButtonCreatePost
							title="Ctrl + Enter"
							type="submit"
							disabled={!dirty || !isValid}
						>
							Send
						</ButtonCreatePost>
					</FormCreatePost>
				)}
			</Formik>
		</WrapperCreatePost>
	);
};

export default CreatePost;
