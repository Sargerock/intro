import React from "react";

import Navbar from "./Navbar";
import UsersProfile from "./UsersProfile";
import {useProfile} from "store/auth/auth-selectors";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";

import {MainWrapper} from "./styles";

const Profile = () => {
	const {userName} = useProfile();
	return <>
		<Navbar/>
		<MainWrapper>
			<UsersProfile userName={userName}/>
			<CreatePost/>
			<PostsList authorName={userName}/>
		</MainWrapper>
	</>
}

export default Profile;
