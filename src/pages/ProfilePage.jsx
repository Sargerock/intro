import React from "react";
import {useLocation} from "react-router-dom";

import Profile from "../components/Profile";
import {useProfile} from "../store/profile/profile-selectors";
import NavBar from "../components/NavBar";
import PostsList from "../components/PostsList";
import Settings from "../components/Settings";
import CreatePost from "../components/CreatePost";
import {useSelector} from "react-redux";
import {postsNamespaces} from "../store/posts/posts-actions";

import {MainWrapper, NavBarProfile, NavLinkProfile} from "../components/styles";

const ProfilePage = () => {
	const pathname = useLocation().pathname.split("/")[2];
	const profile = useProfile();
	const profilePostsState = useSelector(state => state.profilePosts);
	const mentionPostsState = useSelector(state => state.mentionPosts);

	let content;

	switch (pathname) {
		case "posts":
			content = <>
				<CreatePost/>
				<PostsList
					userName={profile.userName}
					postsState={profilePostsState}
					namespace={postsNamespaces.PROFILE}
				/>
			</>
			break;
		case "mentions":
			content = <PostsList
				mentionName={profile.userName}
				postsState={mentionPostsState}
				namespace={postsNamespaces.MENTIONS}
			/>
			break;
		case "settings":
			content = <Settings/>;
			break;
		default:
			content = <>
				<CreatePost/>
				<PostsList
					userName={profile.userName}
					postsState={profilePostsState}
					namespace={postsNamespaces.PROFILE}
				/>
			</>
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
			{!profile.isLoading && content}
		</MainWrapper>
	</>
};

export default ProfilePage;
