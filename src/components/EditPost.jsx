import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import { editPost } from "store/posts/posts-actions";
import { usePosts } from "store/posts/posts-selectors";
import { getTags } from "utils";
import PostMentionInput from "components/post-mention-input";

import {
	WrapperCreatePost,
	FormCreatePost,
	ButtonCreatePost,
} from "components/create-post/CreatePostStyled";

const createPostValidationSchema = yup.object().shape({
	text: yup
		.string()
		.required("Enter you message.")
		.min(3, "Message must contain at least 3 characters")
		.max(512, "Message is too long."),
});

const EditPost = ({ id, text, setVisibility }) => {
	const dispatch = useDispatch();
	const { validationErrors } = usePosts();

	const createPostInitialValues = {
		text: text,
	};

	const createPostHandleSubmit = async ({ text: rawText }) => {
		const tags = getTags(rawText);
		let text = rawText.replace(/>>>/g, "");

		try {
			await dispatch(editPost(id, { text, tags }));
			setVisibility(false);
		} catch {}
	};

	return (
		<WrapperCreatePost>
			<Formik
				initialValues={createPostInitialValues}
				initialErrors={validationErrors}
				validationSchema={createPostValidationSchema}
				onSubmit={createPostHandleSubmit}
				enableReinitialize={true}
				validateOnBlur={false}
			>
				{({ dirty, isValid, submitForm, handleChange, handleBlur, values }) => (
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
							disabled={!isValid}
						>
							Save
						</ButtonCreatePost>
					</FormCreatePost>
				)}
			</Formik>
		</WrapperCreatePost>
	);
};

export default EditPost;
