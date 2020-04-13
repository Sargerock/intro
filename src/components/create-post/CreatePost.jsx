import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import Avatar from "components/common/Avatar";
import { createPost } from "store/posts/posts-actions";
import { usePosts } from "store/posts/posts-selectors";
import { getTags } from "utils";

import {
	WrapperCreatePost,
	FormCreatePost,
	ButtonCreatePost,
} from "./CreatePostStyled";
import PostMentionInput from "../post-mention-input";

const createPostValidationSchema = yup.object().shape({
	text: yup
		.string()
		.required("Enter you message.")
		.min(3, "Message must contain at least 3 characters")
		.max(512, "Message is too long."),
});

const createPostInitialValues = {
	text: "",
};

const CreatePost = () => {
	const dispatch = useDispatch();
	const { validationErrors } = usePosts();

	const createPostHandleSubmit = async ({ text: rawText }, { resetForm }) => {
		const tags = getTags(rawText);
		let text = rawText.replace(/>>>/g, "");

		try {
			await dispatch(createPost({ text, tags }));
			resetForm();
		} catch {}
	};

	return (
		<WrapperCreatePost>
			<Avatar src="https://via.placeholder.com/100" alt="avatar" size="50" />
			<Formik
				initialValues={createPostInitialValues}
				initialErrors={validationErrors}
				validationSchema={createPostValidationSchema}
				onSubmit={createPostHandleSubmit}
				enableReinitialize={true}
				validateOnBlur={false}
			>
				{({
					dirty,
					isValid,
					submitForm,
					handleChange,
					handleBlur,
					values,
					isSubmitting,
				}) => (
					<FormCreatePost>
						<PostMentionInput
							name="text"
							placeholder="What you think ?"
							submitForm={submitForm}
							handleBlur={handleBlur}
							handleChange={handleChange}
							value={values.text}
						/>
						<ErrorMessage name="text" />
						<ButtonCreatePost
							title="Ctrl + Enter"
							type="submit"
							disabled={isSubmitting || !dirty || !isValid}
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
