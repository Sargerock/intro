import React from "react";

import NavBar from "components/NavBar";
import PostsList from "components/PostsList";
import CreatePost from "components/CreatePost";
import {usePosts} from "../store/posts/posts-selectors";

import { MainWrapper } from "components/styles";

const HomePage = () => {
    const postsState = usePosts();

	return (
		<>
			<NavBar />
			<MainWrapper>
				<CreatePost />
				<PostsList postsState={postsState}/>
			</MainWrapper>
		</>
	);
};

export default HomePage;
