import React from "react";
import {Redirect, useLocation} from "react-router-dom";

import {useAuthorization} from "store/auth/auth-selectors";
import {WrapperSign} from "../components/styles";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";


const AuthenticationPage = () => {
	const {isAuthorized} = useAuthorization();
	const pathname = useLocation().pathname.split("/")[1];

	return (
		<>
			{isAuthorized && <Redirect to="/home"/>}
			<WrapperSign>
				{pathname === "sign-in" ? <SignIn/> : <SignUp/>}
			</WrapperSign>
		</>
	);
};

export default AuthenticationPage;
