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
		.min(10, "Message is too short")
		.max(500, "Message is too long.")
});

const CreatePost = () => {
	const dispatch = useDispatch();

	const createPostHandleSubmit = (
		{ authorName, postMessage },
		{ resetForm }
	) => {
		dispatch(createPost({ text: postMessage }));
		resetForm({ authorName });
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
						<ErrorMessage name="authorName" />
						<ErrorMessage name="postMessage" />
						<TextAreaCreatePost
							name="postMessage"
							component="textarea"
							placeholder="What you think ?"
							onKeyDown={e => {
								if (e.ctrlKey && e.key === "Enter") submitForm();
							}}
						/>
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
