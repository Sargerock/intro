import React from "react";
import PropTypes from "prop-types";

import { WrapperNotFound } from "../styles";

const NotFound = ({ message }) => {
	return (
		<WrapperNotFound>
			<h2>{message}</h2>
		</WrapperNotFound>
	);
};

NotFound.propTypes = {
	message: PropTypes.string,
};

NotFound.defaultProps = {
	message: "404 Not Found",
};

export default NotFound;
