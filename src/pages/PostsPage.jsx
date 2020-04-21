import React from "react";

import NavBar from "components/NavBar";
import PostsList from "components/PostsList";
import CreatePost from "components/CreatePost";
import { useProfile } from "store/auth/auth-selectors";

import { MainWrapper } from "components/styles";

const PostsPage = () => {
	const profile = useProfile();
	return (
		<>
			<NavBar />
			<MainWrapper>
				{profile && <CreatePost />}
				<PostsList />
			</MainWrapper>
		</>
	);
};

export default PostsPage;
