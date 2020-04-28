import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import {ErrorMessage, Form, Formik} from "formik";
import * as yup from "yup";
import {useAlert} from "react-alert";

import {changeAvatar} from "../store/profile/profile-actions";

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
	const fileInputRef = useRef(null);
	const alert = useAlert();

	const handleSubmit = async ({avatar}, {setErrors, setValues}) => {
		const formData = new FormData();
		formData.append("avatar", avatar);
		try {
			validationSchema.validateSync({size: avatar.size, type: avatar.type}, {abortEarly: false});
			try {
				await dispatch(changeAvatar(formData));
				alert.show("Avatar successfully changed", {type: "success"});
				fileInputRef.current.value = null;
				setValues(initialValues);
			} catch (action) {
				const errors = Object.values(action.payload.response.data.errors)
					.reduce((acc, cur) => ({...acc, avatar: [...acc.avatar || [], ...cur]}), {})
				setErrors(errors);
			}
		} catch (e) {
			setErrors({avatar: e.errors.map(message => message + "\n")});
		}
	}

	return (
		<>
			<p>Change user photo</p>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
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
