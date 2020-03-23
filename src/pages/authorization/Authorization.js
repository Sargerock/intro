import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";

import { signIn, signUp, getUser } from "../../store/auth/auth-actions";

import { FieldStyled, ButtonStyled } from "../../components/common/styles";
import { FormAuth, WrapperAuth } from "./AuthorizationStyled";

const signInValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required("Enter your email.")
		.email("Email is incorrect."),
	password: yup.string().required("Password is required.")
});

const signUpValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required("Enter your email.")
		.email("Email is incorrect."),
	userName: yup
		.string()
		.required("Enter your name.")
		.min(3, "Name is too short.")
		.max(64, "Name is too long."),
	password: yup
		.string()
		.required("Password is required.")
		.required("Password is required.")
		.min(7, "Min password length is 7"),
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

const Authorization = () => {
	const isSignUp = useHistory().location.pathname === "/signup";
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);
	const error = useSelector(state => state.auth.error);

	const signHandleSubmit = ({ email, password, userName }, { resetForm }) => {
		dispatch(
			isSignUp
				? signUp({ email, password, userName })
				: signIn({ email, password })
		).then(() => {
			dispatch(getUser());
		});
	};

	if (token) return <Redirect to="/posts" />;
	return (
		<WrapperAuth>
			<h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
			<Formik
				initialValues={initialValues}
				onSubmit={signHandleSubmit}
				validationSchema={
					isSignUp ? signUpValidationSchema : signInValidationSchema
				}
			>
				{({ errors }) => (
					<FormAuth>
						<FieldStyled
							type="email"
							name="email"
							placeholder="Email address"
							width="100%"
						/>
						<ErrorMessage name="email" />
						{isSignUp && (
							<>
								<FieldStyled
									type="userName"
									name="userName"
									placeholder="User name"
									width="100%"
								/>
								<ErrorMessage name="userName" />
							</>
						)}
						<FieldStyled
							type="password"
							name="password"
							placeholder="Password"
							width="100%"
						/>
						<ErrorMessage name="password" />
						{isSignUp && (
							<>
								<FieldStyled
									type="password"
									name="passwordConfirm"
									placeholder="Confirm password"
									width="100%"
								/>
								<ErrorMessage name="passwordConfirm" />
							</>
						)}
						<ButtonStyled type="submit" alignSelf={"flex-end"} margin="10px 0">
							{isSignUp ? "Sign Up" : "Sign In"}
						</ButtonStyled>
						{error}
					</FormAuth>
				)}
			</Formik>
		</WrapperAuth>
	);
};

export default Authorization;
