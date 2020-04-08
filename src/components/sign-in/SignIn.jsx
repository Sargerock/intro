import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import { useEffect } from "react";

import { signIn, resetErrors } from "../../store/auth/auth-actions";
import Checkbox from "../common/checkbox/Checkbox";

import {
	FieldStyled,
	ButtonStyled,
	FlexWrapper,
	ErrorMessages,
} from "../common/styles";
import {
	FormAuth,
	LinkSign,
} from "../../pages/authorization/AuthorizationStyled";

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
		dispatch(signIn({ email, password }, { remember }));
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
						<ErrorMessage name="email" component={ErrorMessages} />
						<FieldStyled
							type="password"
							name="password"
							placeholder="Password"
							width="100%"
						/>
						<ErrorMessage name="password" component={ErrorMessages} />
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
