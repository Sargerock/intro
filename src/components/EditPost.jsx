import React from "react";
import {ErrorMessage, Formik} from "formik";
import {useDispatch} from "react-redux";
import * as yup from "yup";

import {editPost} from "store/posts/posts-actions";
import {usePosts} from "store/posts/posts-selectors";
import PostMentionInput from "components/post-mention-input";

import {WrapperEditPost, FormCreatePost, FlexWrapper, ButtonStyled} from "./styles";

const postValidationSchema = yup.object().shape({
	text: yup
		.string()
		.required("Enter you message.")
		.min(3, "Message must contain at least 3 characters")
		.max(512, "Message is too long."),
});

const EditPost = ({id, text, setVisibility}) => {
	const dispatch = useDispatch();
	const {validationErrors} = usePosts();

	return (
		<WrapperEditPost>
			<Formik
				initialValues={{text}}
				initialErrors={validationErrors}
				validationSchema={postValidationSchema}
				onSubmit={({text}) => {
					dispatch(editPost(id, {text}));
					setVisibility(false);
				}}
				enableReinitialize={true}
				validateOnBlur={false}
			>
				{({isValid, submitForm, handleChange, values}) => (
					<FormCreatePost>
						<PostMentionInput
							name="text"
							placeholder="What you think ?"
							submitForm={submitForm}
							handleChange={handleChange}
							value={values.text}
						/>
						<ErrorMessage name="text"/>
						<FlexWrapper justifyContent="flex-end">
							<ButtonStyled
								margin="10px"
								title="Esc"
								onClick={() => setVisibility(false)}
							>
								Cancel
							</ButtonStyled>
							<ButtonStyled
								title="Ctrl + Enter"
								type="submit"
								disabled={!isValid}
							>
								Save
							</ButtonStyled>
						</FlexWrapper>

					</FormCreatePost>
				)}
			</Formik>
		</WrapperEditPost>
	);
};

export default EditPost;
