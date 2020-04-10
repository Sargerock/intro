import React from "react";
import { useAlert } from "react-alert";

import { usePosts } from "store/posts/posts-selectors";
import { useEffect } from "react";

const withErrorsAlert = (Component) => (props) => {
	const { error, isLoading } = usePosts();
	const alert = useAlert();

	useEffect(() => {
		if (!isLoading && error) {
			alert.show(error);
		}
		// eslint-disable-next-line
	}, [error]);

	return <Component {...props} />;
};

export default withErrorsAlert;
