import React from "react";

import { FieldStyled, ButtonStyled } from "../../components/common/styles";
import { Formik } from "formik";
import { useHistory, Redirect } from "react-router-dom";
import { FormAuth, WrapperAuth } from "./AuthorizationStyled";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../../store/auth/auth-actions";

const initialValues = {
	email: "",
	password: "",
	passwordRepeat: ""
};

const Authorization = () => {
	const isSignUp = useHistory().location.pathname === "/signup";
	const dispatch = useDispatch();

	const signHandleSubmit = ({ email, password }, { resetForm }) => {
		const action = isSignUp ? signUp : signIn;
		dispatch(action({ email, password }));
	};
	const token = useSelector(state => state.auth.token);
	if (token) return <Redirect to="/posts" />;
	return (
		<WrapperAuth>
			<h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
			<Formik initialValues={initialValues} onSubmit={signHandleSubmit}>
				{() => (
					<FormAuth>
						<FieldStyled
							type="email"
							name="email"
							placeholder="Email address"
							width="100%"
						/>
						<FieldStyled
							type="password"
							name="password"
							placeholder="Password"
							width="100%"
						/>
						{isSignUp && (
							<FieldStyled
								type="password"
								name="passwordRepeat"
								placeholder="Repeat password"
								width="100%"
							/>
						)}
						<ButtonStyled type="submit" alignSelf={"flex-end"} margin="10px 0">
							{isSignUp ? "Sign Up" : "Sign In"}
						</ButtonStyled>
					</FormAuth>
				)}
			</Formik>
		</WrapperAuth>
	);
};

export default Authorization;
