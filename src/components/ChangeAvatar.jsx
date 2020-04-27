import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import {ErrorMessage, Form, Formik} from "formik";
import * as yup from "yup";

import {changeAvatar} from "../store/profile/profile-actions";
import {useProfile} from "../store/profile/profile-selectors";

import {ButtonStyled, ErrorMessages, FileInputLabel} from "./styles";

const validationSchema = yup
	.object().required("No files were uploaded").shape({
		size: yup.number().max(5242880, "Maximum file size is 5MB"),
		type: yup.string().matches(/^image\/\w+$/, {message: "Invalid image format"})
	});

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
				onSubmit={({avatar}, {setErrors}) => {
					const formData = new FormData();
					formData.append("avatar", avatar);
					try {
						validationSchema.validateSync({size: avatar.size, type: avatar.type}, {abortEarly: false});
						dispatch(changeAvatar(formData));
						fileInputRef.current.value = null;
					} catch (e) {
						setErrors({avatar: e.errors.map(message => message + "\n")});
					}
				}}
			>
				{({setFieldValue, values}) => (
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
