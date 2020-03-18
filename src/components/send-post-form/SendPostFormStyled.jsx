import styled from "styled-components";
import { Form, Field } from "formik";

import { ButtonStyled } from "../common/styles";

export const WrapperSendPost = styled.div`
	display: flex;
	background-color: #e7f5fd;
	padding: 10px;
	border: 1px solid #e6ecf0;
`;

export const FormSendPost = styled(Form)`
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

export const TextAreaSendPost = styled(FieldStyled)`
	height: 70px;
	resize: none;
`;

export const InputSendPost = styled(FieldStyled)`
	width: 200px;
`;

export const ButtonSendPost = styled(ButtonStyled)`
	align-self: flex-end;

	&:disabled {
		background-color: #98cff9;
		border: 2px solid #98cff9;
	}
`;
