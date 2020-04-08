import React from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./NotFoundStyled";

const NotFound = ({ message }) => {
	return (
		<Wrapper>
			<h2>{message}</h2>
		</Wrapper>
	);
};

NotFound.propTypes = {
	message: PropTypes.string,
};

NotFound.defaultProps = {
	message: "404 Not Found",
};

export default NotFound;
