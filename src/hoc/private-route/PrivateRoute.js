import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isAuthorized = useSelector(state => state.auth.isAuthorized);

	return (
		<Route {...rest}>
			{isAuthorized ? <Component /> : <Redirect to="/sign-in" />}
		</Route>
	);
};

export default PrivateRoute;
