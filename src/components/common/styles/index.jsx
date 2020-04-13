import styled from "styled-components";
import PropTypes from "prop-types";
import { Field } from "formik";
import Modal from "react-modal";

export const MainWrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

export const ButtonStyled = styled.button`
	width: ${({ width }) => width};
	background-color: #6699ff;
	border: 2px solid #6699ff;
	color: #fff;
	font-weight: bolder;
	border-radius: 50px;
	padding: 7px 30px;
	cursor: pointer;
	margin: ${({ margin }) => margin};
	align-self: ${({ alignSelf }) => alignSelf};

	&:disabled {
		background-color: #bfe1fb;
		border: 2px solid #bfe1fb;
	}

	&:active {
		background-color: #acc6fb;
	}
`;

ButtonStyled.propTypes = {
	margin: PropTypes.string,
	width: PropTypes.string,
	alignSelf: PropTypes.string,
};
ButtonStyled.defaultProps = {
	margin: "0",
	width: "fit-content",
	alignSelf: "auto",
};

export const FieldStyled = styled(Field)`
	display: block;
	width: ${({ width }) => width};
	margin: 5px 0;
	padding: 10px;
	border: 2px solid #bae0f9;
	border-radius: 15px;
`;

FieldStyled.propTypes = {
	width: PropTypes.string,
};
FieldStyled.defaultProps = {
	width: "auto",
};

export const FlexWrapper = styled.div`
	display: flex;
	align-items: center;
	width: ${({ width }) => width};
	justify-content: ${({ justifyContent }) => justifyContent};
`;

FlexWrapper.propTypes = {
	width: PropTypes.string,
	justifyContent: PropTypes.string,
};
FlexWrapper.defaultProps = {
	width: "auto",
	justifyContent: "flex-start",
};

export const ErrorMessages = styled.div`
	white-space: pre-wrap;
`;

export const ModalStyled = styled(Modal)`
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;
