import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useProfile } from "../../store/auth/auth-hooks";
import { signOut } from "../../store/auth/auth-actions";

import { WrapperNavigation, FlexMainWrapper, Logo } from "./NavigationStyled";
import { ButtonStyled, FlexWrapper } from "../common/styles";

const Navigation = () => {
	const isSignUp = useHistory().location.pathname === "/signup";
	const token = useSelector(state => state.auth.token);
	const dispatch = useDispatch();
	const { userName } = useProfile();

	return (
		<WrapperNavigation>
			<FlexMainWrapper>
				<FlexWrapper>
					<Logo src="/assets/twitter.svg" alt="logo" />
					<span>{userName}</span>
				</FlexWrapper>
				{token ? (
					<ButtonStyled onClick={() => dispatch(signOut())}>
						Sign Out
					</ButtonStyled>
				) : (
					<div>
						<NavLink to="/signin">
							<ButtonStyled margin="10px" disabled={!isSignUp}>
								Sign In
							</ButtonStyled>
						</NavLink>
						<NavLink to="/signup">
							<ButtonStyled disabled={isSignUp}>Sign Up</ButtonStyled>
						</NavLink>
					</div>
				)}
			</FlexMainWrapper>
		</WrapperNavigation>
	);
};

export default Navigation;
