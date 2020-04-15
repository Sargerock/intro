import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { resetPosts } from "../../store/posts/posts-actions";

import { WrapperNotFound } from "../styles";

const NotFound = ({ message }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		return () => {
			dispatch(resetPosts());
		};
	}, [dispatch]);
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
