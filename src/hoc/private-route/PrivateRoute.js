import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const token = useSelector(state => state.auth.token);

	return (
		<Route {...rest}>{token ? <Component /> : <Redirect to="/signin" />}</Route>
	);
};

export default PrivateRoute;
