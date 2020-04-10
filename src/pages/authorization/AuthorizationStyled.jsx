import styled from "styled-components";
import { Form } from "formik";
import { Link } from "react-router-dom";

import { MainWrapper } from "../../components/common/styles";

export const WrapperAuth = styled(MainWrapper)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 80vh;
`;

export const FormAuth = styled(Form)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 400px;
`;

export const LinkSign = styled(Link)`
	text-decoration: none;
	color: #636363;
`;
