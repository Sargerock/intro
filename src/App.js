import React from "react";

import PostsList from "./components/posts-list/PostsList";
import CreatePost from "./components/create-post/CreatePost";
import { DivContainer } from "./components/common/styles";

function App() {
	return (
		<>
			<DivContainer>
				<CreatePost />
				<PostsList />
			</DivContainer>
		</>
	);
}

export default App;
