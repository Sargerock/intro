import React from "react";

import Navbar from "../../components/navbar/Navbar";

import { MainWrapper } from "../../components/common/styles";
import CreatePost from "../../components/create-post/CreatePost";
import PostsList from "../../components/posts-list/PostsList";

const Posts = () => {
	return (
		<>
			<Navbar />
			<MainWrapper>
				<CreatePost />
				<PostsList />
			</MainWrapper>
		</>
	);
};

export default Posts;
