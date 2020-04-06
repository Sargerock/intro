import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import SignUp from "../../components/sign-up/SignUp";
import SignIn from "../../components/sign-in/SignIn";

import { WrapperAuth } from "./AuthorizationStyled";

const Authorization = () => {
	const isAuthorized = useSelector((state) => state.auth.isAuthorized);

	if (isAuthorized) return <Redirect to="/posts" />;
	return (
		<>
			<Navbar />
			<WrapperAuth>
				<Switch>
					<Route path="/sign-in" component={SignIn} />
					<Route path="/sign-up" component={SignUp} />
				</Switch>
			</WrapperAuth>
		</>
	);
};

export default Authorization;
