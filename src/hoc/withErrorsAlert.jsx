import React from "react";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

const withErrorsAlert = (Component) => (props) => {
	const error = useSelector((state) => state.posts.error);
	const alert = useAlert();
	if (error) alert.show(error);
	return <Component {...props} />;
};

export default withErrorsAlert;
