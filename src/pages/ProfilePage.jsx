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
	const userName = profile.userName;
	const profilePostsState = useSelector(state => state.profilePosts);
	const mentionPostsState = useSelector(state => state.mentionPosts);

	let content;

	switch (pathname) {
		case "posts":
			content = !userName ? undefined : <>
				<CreatePost/>
				<PostsList
					userName={userName}
					postsState={profilePostsState}
					namespace={postsNamespaces.PROFILE}
				/>
			</>
			break;
		case "mentions":
			content = !userName ? undefined : <PostsList
				mentionName={userName}
				postsState={mentionPostsState}
				namespace={postsNamespaces.MENTIONS}
			/>
			break;
		case "settings":
			content = <Settings/>;
			break;
		default:
			content = undefined;
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
