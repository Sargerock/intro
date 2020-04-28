import React from "react";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {Formik, ErrorMessage} from "formik";

import {signIn} from "store/auth/auth-actions";
import Checkbox from "components/common/Checkbox";
import {useAuthorization} from "store/auth/auth-selectors";

import {
	FieldStyled,
	ButtonStyled,
	FlexWrapper,
	ErrorMessages,
	FormSign,
	LinkSign,
} from "./styles";

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
	remember: false,
};

const SignIn = () => {
	const dispatch = useDispatch();
	const {isLoading} = useAuthorization();

	return (
		<>
			<h2>Sign In</h2>
			<Formik
				initialValues={initialValues}
				onSubmit={async ({email, password, remember}, {setErrors}) => {
					try {
						await dispatch(signIn({email, password}, {remember}));
					} catch (action) {
						setErrors(action.payload.response.data.errors);
					}
				}}
				validationSchema={signInValidationSchema}
			>
				{({dirty, isValid}) => (
					<FormSign>
						<FieldStyled
							type="email"
							name="email"
							placeholder="Email address"
							width="100%"
							autoComplete="username"
						/>
						<ErrorMessage name="email" component={ErrorMessages}/>
						<FieldStyled
							type="password"
							name="password"
							placeholder="Password"
							width="100%"
							autoComplete="current-password"
						/>
						<ErrorMessage name="password" component={ErrorMessages}/>
						<FlexWrapper width="100%" justifyContent="space-between">
							<Checkbox name="remember" label="Remember me"/>
							<ButtonStyled
								type="submit"
								margin="10px 0"
								disabled={isLoading || !dirty || !isValid}
							>
								Sign In
							</ButtonStyled>
						</FlexWrapper>
						<LinkSign to="/sign-up">or Sign Up</LinkSign>
					</FormSign>
				)}
			</Formik>
		</>
	);
};

export default SignIn;
