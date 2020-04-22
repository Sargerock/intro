import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {signOut} from "store/auth/auth-actions";

import {ButtonStyled, FlexWrapper, WrapperNavBar, Logo, LinkNavBar} from "./styles";

const NavBar = () => {
	const dispatch = useDispatch();

	return (
		<WrapperNavBar>
			<FlexWrapper>
				<Link to="/home">
					<Logo src="/assets/twitter.svg" alt="logo"/>
				</Link>
			</FlexWrapper>

			<div>
				<LinkNavBar to="/home">Home</LinkNavBar>
				<LinkNavBar to="/profile/posts">Profile</LinkNavBar>
				<LinkNavBar to="/profile/mentions">Mentions</LinkNavBar>
			</div>

			<ButtonStyled
				onClick={() => {
					dispatch(signOut());
					window.location.reload();
				}}
			>
				Sign Out
			</ButtonStyled>
		</WrapperNavBar>
	);
};

export default NavBar;
