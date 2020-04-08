import React from "react";
import { ErrorMessage, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { MentionsInput, Mention } from "react-mentions";

import Avatar from "../common/avatar/Avatar";
import { createPost, fetchUsers } from "../../store/posts/posts-actions";
import styles from "./mentions.module.css";

import {
	WrapperCreatePost,
	FormCreatePost,
	ButtonCreatePost,
} from "./CreatePostStyled";
import { usePosts } from "../../store/posts/posts-selectors";

const createPostValidationSchema = yup.object().shape({
	text: yup
		.string()
		.required("Enter you message.")
		.min(8, "Message must contain at least 8 characters")
		.max(512, "Message is too long."),
});

const createPostInitialValues = {
	text: "",
};

const CreatePost = () => {
	const dispatch = useDispatch();
	const { errors, mentionData } = usePosts();

	const createPostHandleSubmit = async ({ text }, { resetForm }) => {
		try {
			await dispatch(createPost({ text: text.replace(/\[\[\[/g, "") }));
			resetForm();
		} catch {}
	};

	const fetchData = async (query, callback) => {
		if (!query) return;
		await dispatch(fetchUsers(query));

		callback(mentionData);
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
				validateOnBlur={false}
			>
				{({ dirty, isValid, submitForm, handleChange, handleBlur, values }) => (
					<FormCreatePost>
						<MentionsInput
							className="mentions"
							classNames={styles}
							name="text"
							placeholder="What you think ?"
							onKeyDown={(e) => {
								if (e.ctrlKey && e.key === "Enter") {
									submitForm();
								}
							}}
							onChange={(e) => {
								e.target.name = "text"; //mentions didn't set name
								handleChange(e);
							}}
							onBlur={handleBlur}
							value={values.text}
						>
							<Mention
								trigger="@"
								data={fetchData}
								markup="@[[[__display__[[["
								displayTransform={(id, name) => `@${name}`}
							/>
						</MentionsInput>
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
