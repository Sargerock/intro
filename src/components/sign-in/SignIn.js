import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage } from "formik";

import { signIn, getUser } from "../../store/auth/auth-actions";

import { FieldStyled, ButtonStyled } from "../common/styles";
import { FormAuth } from "../../pages/authorization/AuthorizationStyled";

const signInValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required("Enter your email.")
		.email("Email is incorrect."),
	password: yup.string().required("Password is required.")
});

const initialValues = {
	email: "",
	password: ""
};

const SignIn = () => {
	const dispatch = useDispatch();
	const error = useSelector(state => state.auth.error);

	const signInHandleSubmit = ({ email, password }) => {
		dispatch(signIn({ email, password })).then(() => {
			dispatch(getUser());
		});
	};
	return (
		<>
			<h2>Sign In</h2>
			<Formik
				initialValues={initialValues}
				onSubmit={signInHandleSubmit}
				validationSchema={signInValidationSchema}
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
							type="password"
							name="password"
							placeholder="Password"
							width="100%"
						/>
						<ErrorMessage name="password" />
						<span>{error}</span>
						<ButtonStyled
							type="submit"
							alignSelf={"flex-end"}
							margin="10px 0"
							disabled={!dirty || !isValid}
						>
							Sign In
						</ButtonStyled>
					</FormAuth>
				)}
			</Formik>
		</>
	);
};

export default SignIn;
