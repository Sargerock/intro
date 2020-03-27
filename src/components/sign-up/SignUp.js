import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage } from "formik";

import { signUp, getUser } from "../../store/auth/auth-actions";

import { FieldStyled, ButtonStyled } from "../common/styles";
import { FormAuth } from "../../pages/authorization/AuthorizationStyled";

const signUpValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required("Enter your email.")
		.max(64, "Max email length is 64")
		.email("Email is incorrect."),
	userName: yup
		.string()
		.required("Enter your name.")
		.min(3, "Name is too short.")
		.max(32, "Name is too long."),
	password: yup
		.string()
		.required("Password is required.")
		.required("Password is required.")
		.min(7, "Min password length is 7.")
		.max(64, "Max password length is 64."),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords didn't match.")
		.required("Password confirm is required.")
});

const initialValues = {
	email: "",
	userName: "",
	password: "",
	passwordConfirm: ""
};

const SignUp = () => {
	const dispatch = useDispatch();
	const error = useSelector(state => state.auth.error);

	const signUpHandleSubmit = ({ email, password, userName }) => {
		dispatch(signUp({ email, password, userName }))
			.then(() => {
				dispatch(getUser());
			})
			.catch(() => {});
	};

	return (
		<>
			<h2>Sign Up</h2>
			<Formik
				initialValues={initialValues}
				onSubmit={signUpHandleSubmit}
				validationSchema={signUpValidationSchema}
			>
				{({ dirty, isValid }) => (
					<FormAuth>
						<FieldStyled
							type="email"
							name="email"
							placeholder="Email address"
							width="100%"
						/>
						<ErrorMessage name="email" />
						<FieldStyled
							type="userName"
							name="userName"
							placeholder="User name"
							width="100%"
						/>
						<ErrorMessage name="userName" />
						<FieldStyled
							type="password"
							name="password"
							placeholder="Password"
							width="100%"
						/>
						<ErrorMessage name="password" />
						<FieldStyled
							type="password"
							name="passwordConfirm"
							placeholder="Confirm password"
							width="100%"
						/>
						<ErrorMessage name="passwordConfirm" />
						<span>{error}</span>
						<ButtonStyled
							type="submit"
							alignSelf={"flex-end"}
							margin="10px 0"
							disabled={!dirty || !isValid}
						>
							Sign Up
						</ButtonStyled>
					</FormAuth>
				)}
			</Formik>
		</>
	);
};

export default SignUp;
