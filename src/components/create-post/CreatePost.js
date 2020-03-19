import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import Avatar from "../common/avatar/Avatar";
import { createPost } from "../../store/posts/posts-actions";

import {
	WrapperCreatePost,
	FormCreatePost,
	InputCreatePost,
	TextAreaCreatePost,
	ButtonCreatePost
} from "./CreatePostStyled";
import moment from "moment";

const createPostInitialValues = {
	authorName: "ds",
	postMessage: ""
};

const createPostValidationSchema = yup.object().shape({
	authorName: yup
		.string()
		.required("Name is required.")
		.min(3, "Name is too short.")
		.max(30, "Name is too long."),
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
		const timestamp = moment().unix();

		dispatch(
			createPost({ author: authorName, message: postMessage, timestamp })
		);
		resetForm({ authorName });
	};

	return (
		<WrapperCreatePost>
			<Avatar src="https://via.placeholder.com/100" alt="avatar" size="50" />
			<Formik
				initialValues={createPostInitialValues}
				validationSchema={createPostValidationSchema}
				onSubmit={createPostHandleSubmit}
			>
				{({ dirty, isValid }) => (
					<FormCreatePost>
						<ErrorMessage name="authorName" />
						<InputCreatePost
							type="text"
							name="authorName"
							placeholder="Your name"
						/>
						<ErrorMessage name="postMessage" />
						<TextAreaCreatePost
							name="postMessage"
							component="textarea"
							placeholder="What you think ?"
						/>
						<ButtonCreatePost type="submit" disabled={!dirty || !isValid}>
							Send
						</ButtonCreatePost>
					</FormCreatePost>
				)}
			</Formik>
		</WrapperCreatePost>
	);
};

export default CreatePost;
