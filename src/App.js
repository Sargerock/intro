import React from "react";

import PostsListContainer from "./components/posts-list/PostsListContainer";
import SendPostFormContainer from "./components/send-post-form/SendPostFormContainer";

function App() {
	return (
		<>
			<div className="container">
				<SendPostFormContainer />
				<PostsListContainer />
			</div>
		</>
	);
}

export default App;
