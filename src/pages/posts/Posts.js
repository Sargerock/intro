import React from "react";

import { MainWrapper } from "../../components/common/styles";
import CreatePost from "../../components/create-post/CreatePost";
import PostsList from "../../components/posts-list/PostsList";

const Posts = () => {
	return (
		<MainWrapper>
			<CreatePost />
			<PostsList />
		</MainWrapper>
	);
};

export default Posts;
