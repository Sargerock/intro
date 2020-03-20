import React from "react";
import { WrapperNavigation, FlexWrapper, Logo } from "./NavigationStyled";
import { ButtonStyled } from "../common/styles";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/auth/auth-actions";

const Navigation = () => {
	const isSignUp = useHistory().location.pathname === "/signup";
	const token = useSelector(state => state.auth.token);
	const dispatch = useDispatch();

	return (
		<WrapperNavigation>
			<FlexWrapper>
				<Logo src="/assets/twitter.svg" alt="logo" />
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
			</FlexWrapper>
		</WrapperNavigation>
	);
};

export default Navigation;
