import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {useAuthorization} from "store/auth/auth-selectors";
import {signOut} from "store/auth/auth-actions";

import {ButtonStyled, FlexWrapper, WrapperNavbar, Logo, LinkNavbar} from "./styles";

const Navbar = () => {
	const dispatch = useDispatch();
	const {profile} = useAuthorization();
	const userName = profile ? profile.userName : "";

	return (
		<WrapperNavbar>
			<FlexWrapper>
				<Link to="/posts">
					<Logo src="/assets/twitter.svg" alt="logo"/>
				</Link>
				<Link to={`/profile`}>{userName}</Link>
			</FlexWrapper>

			<div>
				<LinkNavbar to="/posts">Home</LinkNavbar>
				<LinkNavbar to="/profile/posts">Profile</LinkNavbar>
				<LinkNavbar to={`/profile/notifications?mentionName=${userName}`}>Notifications</LinkNavbar>
			</div>

			<ButtonStyled
				onClick={() => {
					dispatch(signOut());
					window.location.reload();
				}}
			>
				Sign Out
			</ButtonStyled>
		</WrapperNavbar>
	);
};

export default Navbar;
