import React from "react";
import {ErrorMessage, Formik} from "formik";
import {useDispatch} from "react-redux";
import * as yup from "yup";

import {createPost} from "store/posts/posts-actions";
import {usePosts} from "store/posts/posts-selectors";
import PostMentionInput from "./post-mention-input";
import {useProfile} from "../store/profile/profile-selectors";

import {WrapperCreatePost, FormCreatePost, ButtonCreatePost, Avatar} from "./styles";

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
	const {isLoading} = usePosts();
	const {avatarUrl} = useProfile();

	return (
		<WrapperCreatePost>
			{avatarUrl && <Avatar src={process.env.REACT_APP_BASE_URL + avatarUrl} alt="avatar" size={50}/>}
			<Formik
				initialValues={createPostInitialValues}
				validationSchema={createPostValidationSchema}
				onSubmit={async ({text}, {resetForm, setErrors}) => {
					try {
						await dispatch(createPost({text}));
						resetForm();
					} catch (action) {
						setErrors(action.payload.response.data.errors);
					}
				}}
				validateOnBlur={false}
			>
				{({
					  dirty,
					  isValid,
					  submitForm,
					  handleChange,
					  values,
				  }) => (
					<FormCreatePost>
						<PostMentionInput
							name="text"
							placeholder="What do you think ?"
							submitForm={submitForm}
							handleChange={handleChange}
							value={values.text}
						/>
						<ErrorMessage name="text"/>
						<ButtonCreatePost
							title="Ctrl + Enter"
							type="submit"
							disabled={isLoading || !dirty || !isValid}
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
