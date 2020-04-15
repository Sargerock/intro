import React from "react";

import Navbar from "components/Navbar";
import PostsList from "components/PostsList";
import CreatePost from "components/CreatePost";
import { useProfile } from "store/auth/auth-selectors";

import { MainWrapper } from "components/styles";

const PostsPage = () => {
	const profile = useProfile();
	return (
		<>
			<Navbar />
			<MainWrapper>
				{profile && <CreatePost />}
				<PostsList />
			</MainWrapper>
		</>
	);
};

export default PostsPage;
