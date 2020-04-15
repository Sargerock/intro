import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useProfile } from "store/auth/auth-selectors";
import { signOut } from "store/auth/auth-actions";

import { ButtonStyled, FlexWrapper, WrapperNavbar, Logo } from "./styles";

const Navbar = () => {
	const dispatch = useDispatch();
	const { userName } = useProfile();

	return (
		<WrapperNavbar>
			<FlexWrapper>
				<Link to="/posts">
					<Logo src="/assets/twitter.svg" alt="logo" />
				</Link>
				<Link to={`/posts/${userName}`}>{userName}</Link>
			</FlexWrapper>

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
