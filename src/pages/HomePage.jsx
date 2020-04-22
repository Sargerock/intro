import React from "react";

import NavBar from "components/NavBar";
import PostsList from "components/PostsList";
import CreatePost from "components/CreatePost";
import {useQuery} from "../utils/hooks";

import { MainWrapper } from "components/styles";

const HomePage = () => {
	const tag = useQuery().get("tag");

	return (
		<>
			<NavBar />
			<MainWrapper>
				{tag ? undefined : <CreatePost />}
				<PostsList />
			</MainWrapper>
		</>
	);
};

export default HomePage;
