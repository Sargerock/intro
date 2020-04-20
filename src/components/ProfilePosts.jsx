import React from "react";

import {useProfile} from "store/auth/auth-selectors";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import withProfileLayout from "../hoc/withProfileLayout";

const ProfilePosts = () => {
	const {userName} = useProfile();
	return <>
		<CreatePost/>
		<PostsList authorName={userName}/>
	</>
}

export default withProfileLayout(ProfilePosts);
