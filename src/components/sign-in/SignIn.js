import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage } from "formik";

import { signIn, fetchUser, resetErrors } from "../../store/auth/auth-actions";
import Checkbox from "../common/checkbox/Checkbox";

import { FieldStyled, ButtonStyled, FlexWrapper } from "../common/styles";
import {
	FormAuth,
	LinkSign,
} from "../../pages/authorization/AuthorizationStyled";
import { useEffect } from "react";

const signInValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required("Enter your email.")
		.email("Email is incorrect."),
	password: yup.string().required("Password is required."),
});

const initialValues = {
	email: "",
	password: "",
	sign: [],
};

const SignIn = () => {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.auth.error);

	useEffect(() => {
		return () => {
			dispatch(resetErrors());
		};
	}, [dispatch]);

	const signInHandleSubmit = ({ email, password, sign }) => {
		const remember = !!sign[0];
		dispatch(signIn({ email, password }, { remember }))
			.then(() => {
				dispatch(fetchUser());
			})
			.catch(() => {});
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
						<FlexWrapper width="100%" justifyContent="space-between">
							<Checkbox name="sign" value="Remember me" />
							<ButtonStyled
								type="submit"
								margin="10px 0"
								disabled={!dirty || !isValid}
							>
								Sign In
							</ButtonStyled>
						</FlexWrapper>
						<LinkSign to="/sign-up">or Sign Up</LinkSign>
					</FormAuth>
				)}
			</Formik>
		</>
	);
};

export default SignIn;
