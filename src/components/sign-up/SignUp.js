import React, { useEffect } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage } from "formik";

import { signUp, resetErrors } from "../../store/auth/auth-actions";

import { FieldStyled, ButtonStyled, ErrorMessages } from "../common/styles";
import {
	FormAuth,
	LinkSign,
} from "../../pages/authorization/AuthorizationStyled";

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
	const errors = useSelector((state) => state.auth.validationErrors);

	useEffect(() => {
		return () => {
			dispatch(resetErrors());
		};
	}, [dispatch]);

	const signUpHandleSubmit = ({ email, password, userName }) => {
		dispatch(signUp({ email, password, userName }));
	};
	return (
		<>
			<h2>Sign Up</h2>
			<Formik
				initialValues={initialValues}
				initialErrors={errors}
				onSubmit={signUpHandleSubmit}
				validationSchema={signUpValidationSchema}
				enableReinitialize={true}
			>
				{({ dirty, isValid }) => (
					<FormAuth>
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
							disabled={!dirty || !isValid}
						>
							Sign Up
						</ButtonStyled>
						<LinkSign to="/sign-in">or Sign In</LinkSign>
					</FormAuth>
				)}
			</Formik>
		</>
	);
};

export default SignUp;
