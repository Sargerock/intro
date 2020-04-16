import React from "react";
import {useAlert} from "react-alert";

import {useEffect} from "react";
import {useAuthorization} from "../store/auth/auth-selectors";

const withErrorsAlert = (Component) => (props) => {
	const {error} = useAuthorization();
	const alert = useAlert();

	useEffect(() => {
		if (error) {
			alert.show(error);
		}
		// eslint-disable-next-line
	}, );

	return <Component {...props} />;
};

export default withErrorsAlert;
