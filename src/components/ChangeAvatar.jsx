import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import {ErrorMessage, Form, Formik} from "formik";
import {changeAvatar} from "../store/profile/profile-actions";

import {ButtonStyled, ErrorMessages} from "./styles";

const initialValues = {
	avatar: null,
}

const ChangeAvatar = () => {
	const dispatch = useDispatch();
	const fileInputRef = useRef(null)

	return (
		<>
			<p>Change user photo</p>
			<Formik
				initialValues={initialValues}
				onSubmit={({avatar}) => {
					const formData = new FormData();
					formData.append("avatar", avatar);
					dispatch(changeAvatar(formData));
					fileInputRef.current.value = null;
				}}
			>
				{({dirty, isValid, setFieldValue}) => (
					<Form>
						<input
							ref={fileInputRef}
							type="file"
							id="file"
							name="file"
							accept="image/*"
							onChange={(e) => {
								setFieldValue("avatar", e.target.files[0])
							}}
						/>
						<label htmlFor="avatar">Choose a file</label>
						<ErrorMessage name="avatar" component={ErrorMessages}/>
						<div>
							<ButtonStyled
								type="submit"
								disabled={!dirty || !isValid}
							>
								Save
							</ButtonStyled>

						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default ChangeAvatar;
