import { compose } from "redux";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as yup from "yup";

import SendPostForm from "./SendPostForm";
import { createPost } from "../../store/posts/posts-thunks";

const sendPostValidationschema = yup.object().shape({
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

const createPostFormikHOC = withFormik({
	mapPropsToValues: ({ authorName }) => ({
		authorName: authorName || "",
		postMessage: ""
	}),
	validationSchema: sendPostValidationschema,
	handleSubmit: ({ authorName, postMessage }, { props, resetForm }) => {
		const timestamp = Math.floor(Date.now() / 1000);
		props.createPost({ author: authorName, message: postMessage, timestamp });
		resetForm(authorName);
	}
});

export default compose(
	connect(null, { createPost }),
	createPostFormikHOC
)(SendPostForm);
