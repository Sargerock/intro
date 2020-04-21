import React, { useEffect } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";

import { signUp, resetErrors } from "store/auth/auth-actions";
import { useAuthorization } from "store/auth/auth-selectors";

import {
	FieldStyled,
	ButtonStyled,
	ErrorMessages,
	FormSign,
	LinkSign,
	WrapperSign,
} from "./styles";

const whitespaceTestOptions = {
	name: "whitespace",
	test: (value) => !/\s/gi.test(value),
	message: "Whitespaces not allowed",
};

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
		.max(32, "Name is too long.")
		.test(whitespaceTestOptions),
	password: yup
		.string()
		.required("Password is required.")
		.required("Password is required.")
		.min(7, "Min password length is 7.")
		.max(64, "Max password length is 64.")
		.test(whitespaceTestOptions),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords didn't match.")
		.required("Password confirm is required."),
});

const initialValues = {
	email: "",
	userName: "",
	password: "",
	passwordConfirm: "",
};

const SignUp = () => {
	const dispatch = useDispatch();
	const { validationErrors, isAuthorized, isLoading } = useAuthorization();

	useEffect(() => {
		return () => {
			dispatch(resetErrors());
		};
	}, [dispatch]);

	const signUpHandleSubmit = ({ email, password, userName }) => {
		dispatch(signUp({ email, password, userName }, { remember: true }));
	};
	return (
		<>
			{isAuthorized && <Redirect to="/posts" />}

			<WrapperSign>
				<h2>Sign Up</h2>
				<Formik
					initialValues={initialValues}
					initialErrors={validationErrors}
					onSubmit={signUpHandleSubmit}
					validationSchema={signUpValidationSchema}
					enableReinitialize={true}
				>
					{({ dirty, isValid }) => (
						<FormSign>
							<FieldStyled
								type="email"
								name="email"
								placeholder="Email address"
								width="100%"
							/>

							<ErrorMessage name="email" component={ErrorMessages} />
							<FieldStyled
								type="userName"
								name="userName"
								placeholder="User name"
								width="100%"
							/>
							<ErrorMessage name="userName" component={ErrorMessages} />
							<FieldStyled
								type="password"
								name="password"
								placeholder="Password"
								width="100%"
							/>
							<ErrorMessage name="password" component={ErrorMessages} />
							<FieldStyled
								type="password"
								name="passwordConfirm"
								placeholder="Confirm password"
								width="100%"
							/>
							<ErrorMessage name="passwordConfirm" />
							<ButtonStyled
								type="submit"
								alignSelf={"flex-end"}
								margin="10px 0"
								disabled={isLoading || !dirty || !isValid}
							>
								Sign Up
							</ButtonStyled>
							<LinkSign to="/sign-in">or Sign In</LinkSign>
						</FormSign>
					)}
				</Formik>
			</WrapperSign>
		</>
	);
};

export default SignUp;
