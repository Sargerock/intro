import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import { useEffect } from "react";

import { signIn, resetErrors } from "../../store/auth/auth-actions";
import Checkbox from "../common/checkbox/Checkbox";
import { useAuthorization } from "../../store/auth/auth-selectors";

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
	const { validationErrors } = useAuthorization();

	useEffect(() => {
		return () => {
			dispatch(resetErrors());
		};
	}, [dispatch]);

	const signInHandleSubmit = ({ email, password, sign }) => {
		const remember = !!sign[0]; //sign - array of checked inputs
		dispatch(signIn({ email, password }, { remember }));
	};
	return (
		<>
			<h2>Sign In</h2>
			<Formik
				initialValues={initialValues}
				initialErrors={validationErrors}
				onSubmit={signInHandleSubmit}
				validationSchema={signInValidationSchema}
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
							type="password"
							name="password"
							placeholder="Password"
							width="100%"
						/>
						<ErrorMessage name="password" component={ErrorMessages} />
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
