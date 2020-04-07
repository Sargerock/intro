import React from "react";
import { useAlert } from "react-alert";

import Navbar from "../../components/navbar/Navbar";

import { MainWrapper } from "../../components/common/styles";
import CreatePost from "../../components/create-post/CreatePost";
import PostsList from "../../components/posts-list/PostsList";
import { useAuthorization } from "../../store/auth/auth-selectors";
import Loader from "../../components/common/loader/Loader";
import Profile from "../../components/profile/Profile";
import { useRouteMatch, Route, Switch } from "react-router-dom";

const Posts = () => {
	const { error, isLoading } = useAuthorization();
	const alert = useAlert();
	const { path } = useRouteMatch();

	if (error) alert.show("Network error");
	if (isLoading) return <Loader />;
	return (
		<>
			<Navbar />
			<MainWrapper>
				<Switch>
					<Route path={`${path}/:userName`}>
						<Profile />
						<PostsList />
					</Route>
					<Route path="/" component={PostsList} />
				</Switch>
			</MainWrapper>
		</>
	);
};

export default Posts;
