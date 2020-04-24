import React from "react";

import NavBar from "components/NavBar";
import PostsList from "components/PostsList";
import CreatePost from "components/CreatePost";
import {useQuery} from "../utils/hooks";
import {usePosts} from "../store/posts/posts-selectors";

import { MainWrapper } from "components/styles";

const HomePage = () => {
	const tag = useQuery().get("tag");
    const postsState = usePosts();

	return (
		<>
			<NavBar />
			<MainWrapper>
				{tag ? undefined : <CreatePost />}
				<PostsList postsState={postsState}/>
			</MainWrapper>
		</>
	);
};

export default HomePage;
