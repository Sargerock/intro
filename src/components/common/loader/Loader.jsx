import React from "react";
import PropTypes from "prop-types";

import { LoaderWrapper } from "./LoaderStyled";

const Loader = ({ height }) => {
	return (
		<LoaderWrapper height={height}>
			<img src="./assets/spinner.svg" alt="spinner" />
		</LoaderWrapper>
	);
};

LoaderWrapper.propTypes = {
	height: PropTypes.string,
};

LoaderWrapper.defaultProps = {
	height: "100px",
};

export default Loader;
