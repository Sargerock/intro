import React from 'react';
import {useDispatch} from "react-redux";
import {ErrorMessage, Form, Formik} from "formik";
import * as yup from "yup";

import withProfileLayout from "../hoc/withProfileLayout";

import {ButtonStyled, ErrorMessages, FieldStyled, WrapperSettings} from "./styles";

import {changePassword} from "../store/auth/auth-actions";
import {useAuthorization} from "../store/auth/auth-selectors";

const validationSchema = yup.object().shape({
	oldPassword: yup.string().required("Password is required."),
	newPassword: yup
		.string()
		.required("Password is required.")
		.required("Password is required.")
		.min(7, "Min password length is 7.")
		.max(64, "Max password length is 64.")
		.test({
			name: "whitespace",
			test: (value) => !/\s/gi.test(value),
			message: "Whitespaces not allowed",
		}),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("newPassword")], "Passwords didn't match.")
		.required("Password confirm is required."),
});

const initialValues = {
	oldPassword: "",
	newPassword: "",
	confirmPassword: ""
}

const Settings = () => {
	const dispatch = useDispatch();
	const {validationErrors} = useAuthorization();

	return (
		<WrapperSettings>
			<p>Change password</p>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={({oldPassword, newPassword}, {resetForm}) => {
					dispatch(changePassword({oldPassword, newPassword}))
					resetForm();
				}}
				initialErrors={validationErrors}
				enableReinitialize={true}
			>
				{({dirty, isValid}) => (
					<Form>
						<FieldStyled
							type="password"
							name="oldPassword"
							placeholder="Old password"

						/>
						<ErrorMessage name="oldPassword" component={ErrorMessages}/>
						<FieldStyled
							type="password"
							name="newPassword"
							placeholder="Password"
						/>
						<ErrorMessage name="newPassword" component={ErrorMessages}/>
						<FieldStyled
							type="password"
							name="confirmPassword"
							placeholder="Confirm password"
						/>
						<ErrorMessage name="confirmPassword"/>
						<div>
							<ButtonStyled
								type="submit"
								disabled={!dirty || !isValid}
							>
								Change
							</ButtonStyled>
						</div>
					</Form>
				)}
			</Formik>
		</WrapperSettings>
	);
};

export default withProfileLayout(Settings);
