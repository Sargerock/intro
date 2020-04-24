import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import {ErrorMessage, Form, Formik} from "formik";

import {changeAvatar} from "../store/profile/profile-actions";
import {useProfile} from "../store/profile/profile-selectors";

import {ButtonStyled, ErrorMessages, FileInputLabel} from "./styles";

const initialValues = {
	avatar: {},
}

const ChangeAvatar = () => {
	const dispatch = useDispatch();
	const {validationErrors} = useProfile();
	const fileInputRef = useRef(null);

	return (
		<>
			<p>Change user photo</p>
			<Formik
				initialValues={initialValues}
				initialErrors={validationErrors}
				enableReinitialize={true}
				onSubmit={({avatar}) => {
					const formData = new FormData();
					formData.append("avatar", avatar);
					dispatch(changeAvatar(formData));
					fileInputRef.current.value = null;
				}}
			>
				{({setFieldValue ,values}) => (
					<Form>
						<FileInputLabel htmlFor="file">
							{values.avatar.name || "Upload a file"}
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
						</FileInputLabel>
						<ButtonStyled
							type="submit"
							margin="0 0 0 20px"
							disabled={(!values.avatar.name)}
						>
							Save
						</ButtonStyled>
						<div>
							<ErrorMessage name="avatar" component={ErrorMessages}/>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default ChangeAvatar;
