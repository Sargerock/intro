import React from "react";
import PropTypes from "prop-types";
import {ErrorMessage, Formik} from "formik";
import {useDispatch} from "react-redux";
import * as yup from "yup";

import {editPost} from "store/posts/posts-actions";
import PostMentionInput from "components/post-mention-input";
import {usePosts} from "../store/posts/posts-selectors";

import {WrapperEditPost, FormCreatePost, FlexWrapper, ButtonStyled} from "./styles";

const postValidationSchema = yup.object().shape({
	text: yup
		.string()
		.required("Enter you message.")
		.min(3, "Message must contain at least 3 characters")
		.max(512, "Message is too long."),
});

const EditPost = ({id, text, setModalOptions}) => {
	const dispatch = useDispatch();
	const {isLoading} = usePosts()

	return (
		<WrapperEditPost>
			<Formik
				initialValues={{text}}
				validationSchema={postValidationSchema}
				onSubmit={async ({text}, {setErrors}) => {
					try {
						await dispatch(editPost(id, {text}));
						setModalOptions({isVisible: false});
					} catch (action) {
						setErrors(action.payload.response.data.errors)
					}
				}}
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
								onClick={() => setModalOptions({isVisible: false})}
							>
								Cancel
							</ButtonStyled>
							<ButtonStyled
								title="Ctrl + Enter"
								type="submit"
								disabled={isLoading || !isValid}
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

EditPost.propTypes = {
	id: PropTypes.number,
	text: PropTypes.string,
	setModalOptions: PropTypes.func.isRequired
}

EditPost.defaultProps = {
	id: 0,
	text: ""
}

export default EditPost;
