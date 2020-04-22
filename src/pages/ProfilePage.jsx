import React from "react";
import {useLocation} from "react-router-dom";

import Profile from "../components/Profile";
import {useProfile} from "../store/auth/auth-selectors";
import NavBar from "../components/NavBar";

import {MainWrapper, NavBarProfile, NavLinkProfile} from "../components/styles";
import PostsList from "../components/PostsList";
import Settings from "../components/Settings";
import CreatePost from "../components/CreatePost";


const ProfilePage = () => {
	const {userName} = useProfile();
	const pathname = useLocation().pathname.split("/")[2];

	let content;

	switch (pathname) {
		case "posts":
			content = <>
				<CreatePost/>
				<PostsList authorName={userName}/>
			</>
			break;
		case "mentions":
			content = <PostsList mentionName={userName}/>
			break;
		case "settings":
			content = <Settings/>;
			break;
		default:
			content = <PostsList authorName={userName}/>
	}

	return <>
		<NavBar/>
		<MainWrapper>
			<Profile userName={userName}/>
			<NavBarProfile>
				<NavLinkProfile to="/profile/posts">Posts</NavLinkProfile>
				<NavLinkProfile to="/profile/mentions">Mentions</NavLinkProfile>
				<NavLinkProfile to="/profile/settings">Settings</NavLinkProfile>
			</NavBarProfile>
			{content}
		</MainWrapper>
	</>
};

export default ProfilePage;
