import React from "react";
import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import SignUp from "../../components/sign-up/SignUp";
import SignIn from "../../components/sign-in/SignIn";

import { WrapperAuth } from "./AuthorizationStyled";

const Authorization = () => {
	const isSignUp = useHistory().location.pathname === "/sign-up";
	const isAuthorized = useSelector(state => state.auth.isAuthorized);

	if (isAuthorized) return <Redirect to="/posts" />;
	return (
		<>
			<Navbar />
			<WrapperAuth>{isSignUp ? <SignUp /> : <SignIn />}</WrapperAuth>
		</>
	);
};

export default Authorization;
