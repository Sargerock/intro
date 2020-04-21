import React from "react";

import UsersProfile from "../components/UsersProfile";
import {useProfile} from "../store/auth/auth-selectors";
import NavBar from "../components/NavBar";

import {MainWrapper, NavBarProfile, NavLinkProfile} from "../components/styles";


const withProfileLayout = (Component) => (props) => {
	const {userName} = useProfile();
	return <>
		<NavBar/>
		<MainWrapper>
			<UsersProfile userName={userName}/>
			<NavBarProfile>
				<NavLinkProfile to="/profile/posts">Posts</NavLinkProfile>
				<NavLinkProfile to={`/profile/notifications?mentionName=${userName}`}>Notifications</NavLinkProfile>
				<NavLinkProfile to="/profile/settings">Settings</NavLinkProfile>
			</NavBarProfile>
			<Component {...props}/>
		</MainWrapper>
	</>
};

export default withProfileLayout;
