import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useProfile } from "../../store/auth/auth-selectors";
import { signOut } from "../../store/auth/auth-actions";

import { WrapperNavbar, Logo } from "./NavbarStyled";
import { ButtonStyled, FlexWrapper } from "../common/styles";

const Navbar = () => {
	const dispatch = useDispatch();
	const isSignUp = useHistory().location.pathname === "/sign-up";
	const isAuthorized = useSelector(state => state.auth.isAuthorized);
	const { userName } = useProfile();

	return (
		<WrapperNavbar>
			<FlexWrapper>
				<Logo src="/assets/twitter.svg" alt="logo" />
				<span>{userName}</span>
			</FlexWrapper>
			{isAuthorized ? (
				<ButtonStyled onClick={() => dispatch(signOut())}>
					Sign Out
				</ButtonStyled>
			) : (
				<div>
					<NavLink to="/sign-in">
						<ButtonStyled margin="10px" disabled={!isSignUp}>
							Sign In
						</ButtonStyled>
					</NavLink>
					<NavLink to="/sign-up">
						<ButtonStyled disabled={isSignUp}>Sign Up</ButtonStyled>
					</NavLink>
				</div>
			)}
		</WrapperNavbar>
	);
};

export default Navbar;
