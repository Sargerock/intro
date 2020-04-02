import React from "react";

import Navbar from "../../components/navbar/Navbar";

import { MainWrapper } from "../../components/common/styles";
import CreatePost from "../../components/create-post/CreatePost";
import PostsList from "../../components/posts-list/PostsList";
import { useAuthorization } from "../../store/auth/auth-selectors";
import Toast from "../../components/common/toast/Toast";

const Posts = () => {
	const { error } = useAuthorization();

	return (
		<>
			{error ? (
				<Toast title="Network error" text="Refresh page to try again" />
			) : (
				undefined
			)}
			<Navbar />
			<MainWrapper>
				<CreatePost />
				<PostsList />
			</MainWrapper>
		</>
	);
};

export default Posts;
