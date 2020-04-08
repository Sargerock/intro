import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useProfile } from "../../store/auth/auth-selectors";
import { signOut } from "../../store/auth/auth-actions";

import { WrapperNavbar, Logo } from "./NavbarStyled";
import { ButtonStyled, FlexWrapper } from "../common/styles";

const Navbar = () => {
	const dispatch = useDispatch();
	const isAuthorized = useSelector((state) => state.auth.isAuthorized);
	const { userName } = useProfile();

	return (
		<WrapperNavbar>
			<FlexWrapper>
				<Logo src="/assets/twitter.svg" alt="logo" />
				<Link to={`/posts/${userName}`}>{userName}</Link>
			</FlexWrapper>
			{isAuthorized ? (
				<ButtonStyled
					onClick={() => {
						dispatch(signOut());
						window.location.reload(); //reinitialize store
					}}
				>
					Sign Out
				</ButtonStyled>
			) : (
				<NavLink to="/sign-in">
					<ButtonStyled>Sign In</ButtonStyled>
				</NavLink>
			)}
		</WrapperNavbar>
	);
};

export default Navbar;
