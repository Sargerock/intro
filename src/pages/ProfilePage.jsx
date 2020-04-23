import React from "react";
import {useLocation} from "react-router-dom";

import Profile from "../components/Profile";
import {useProfile} from "../store/profile/profile-selectors";
import NavBar from "../components/NavBar";

import {MainWrapper, NavBarProfile, NavLinkProfile} from "../components/styles";
import PostsList from "../components/PostsList";
import Settings from "../components/Settings";
import CreatePost from "../components/CreatePost";



const ProfilePage = () => {
	const pathname = useLocation().pathname.split("/")[2];
	const profile = useProfile();

	let content;

	switch (pathname) {
		case "posts":
			content = <>
				<CreatePost/>
				<PostsList authorName={profile.userName}/>
			</>
			break;
		case "mentions":
			content = <PostsList mentionName={profile.userName}/>
			break;
		case "settings":
			content = <Settings/>;
			break;
		default:
			content = <PostsList authorName={profile.userName}/>
	}

	return <>
		<NavBar/>
		<MainWrapper>
			<Profile profile={profile}/>
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
