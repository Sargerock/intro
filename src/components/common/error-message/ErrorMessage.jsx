import React from "react";
import PropTypes from "prop-types";
import { WrapperErrorMessage } from "./ErrorMessageStyled";

const ErrorMessage = ({ message, ...rest }) => {
	return <WrapperErrorMessage {...rest}>{message}</WrapperErrorMessage>;
};

ErrorMessage.propTypes = {
	message: PropTypes.string,
	margin: PropTypes.string,
	withBorder: PropTypes.bool
};

ErrorMessage.defaultProps = {
	message: "",
	margin: "10px",
	withBorder: false
};

export default ErrorMessage;
