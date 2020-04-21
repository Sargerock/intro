import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {useAuthorization} from "store/auth/auth-selectors";
import {signOut} from "store/auth/auth-actions";

import {ButtonStyled, FlexWrapper, WrapperNavBar, Logo, LinkNavBar} from "./styles";

const NavBar = () => {
	const dispatch = useDispatch();
	const {profile} = useAuthorization();
	const userName = profile ? profile.userName : "";

	return (
		<WrapperNavBar>
			<FlexWrapper>
				<Link to="/posts">
					<Logo src="/assets/twitter.svg" alt="logo"/>
				</Link>
				<Link to={`/profile/posts`}>{userName}</Link>
			</FlexWrapper>

			<div>
				<LinkNavBar to="/posts">Home</LinkNavBar>
				<LinkNavBar to="/profile/posts">Profile</LinkNavBar>
				<LinkNavBar to={`/profile/notifications?mentionName=${userName}`}>Notifications</LinkNavBar>
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
