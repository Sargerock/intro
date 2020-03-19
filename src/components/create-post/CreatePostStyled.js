import styled from "styled-components";
import { Form, Field } from "formik";

import { ButtonStyled } from "../common/styles";

export const WrapperCreatePost = styled.div`
	display: flex;
	background-color: #e7f5fd;
	padding: 10px;
	border: 1px solid #e6ecf0;
`;

export const FormCreatePost = styled(Form)`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const FieldStyled = styled(Field)`
	display: block;
	margin: 5px 0;
	padding: 10px;
	border: 2px solid #bae0f9;
	border-radius: 15px;
`;

export const TextAreaCreatePost = styled(FieldStyled)`
	min-height: 90px;
	scroll-padding: 10px;
	resize: none;
	overflow-y: auto;
`;

export const InputCreatePost = styled(FieldStyled)`
	width: 200px;
`;

export const ButtonCreatePost = styled(ButtonStyled)`
	align-self: flex-end;
	cursor: pointer;

	&:disabled {
		background-color: #98cff9;
		border: 2px solid #98cff9;
	}
`;
