import React from "react";

import Navbar from "../../components/navbar/Navbar";

import { MainWrapper } from "../../components/common/styles";
import CreatePost from "../../components/create-post/CreatePost";
import PostsList from "../../components/posts-list/PostsList";
import { useAuthorization } from "../../store/auth/auth-selectors";
import Toast from "../../components/common/toast/Toast";
import Loader from "../../components/common/loader/Loader";

const Posts = () => {
	const { error, isLoading } = useAuthorization();

	if (isLoading) return <Loader />;
	return (
		<>
			{error && <Toast title={error} text="Refresh page to try again" />}
			<Navbar />
			<MainWrapper>
				<CreatePost />
				<PostsList />
			</MainWrapper>
		</>
	);
};

export default Posts;
