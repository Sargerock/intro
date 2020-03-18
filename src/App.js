import React from "react";

import PostsListContainer from "./components/posts-list/PostsListContainer";
import SendPostFormContainer from "./components/send-post-form/SendPostFormContainer";
import { DivContainer } from "./components/common/styles";

function App() {
	return (
		<>
			<DivContainer>
				<SendPostFormContainer />
				<PostsListContainer />
			</DivContainer>
		</>
	);
}

export default App;
