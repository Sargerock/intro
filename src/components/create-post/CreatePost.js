import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
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
	text: yup
		.string()
		.required("Enter you message.")
		.min(8, "Message must contain at least 8 characters")
		.max(512, "Message is too long.")
});

const createPostInitialValues = {
	text: ""
};

const CreatePost = () => {
	const dispatch = useDispatch();
	const errors = useSelector(state => state.posts.validationErrors);

	const createPostHandleSubmit = async ({ text }, { resetForm }) => {
		dispatch(createPost({ text }))
			.then(() => {
				resetForm();
			})
			.catch(() => {});
	};

	return (
		<WrapperCreatePost>
			<Avatar src="https://via.placeholder.com/100" alt="avatar" size="50" />
			<Formik
				initialValues={createPostInitialValues}
				initialErrors={errors}
				validationSchema={createPostValidationSchema}
				onSubmit={createPostHandleSubmit}
				enableReinitialize={true}
			>
				{({ dirty, isValid, submitForm, errors: err }) => (
					<FormCreatePost>
						<TextAreaCreatePost
							name="text"
							component="textarea"
							placeholder="What you think ?"
							onKeyDown={e => {
								if (e.ctrlKey && e.key === "Enter") submitForm();
							}}
						/>
						<ErrorMessage name="text" />
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
