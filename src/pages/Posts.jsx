import React from "react";
import { useAlert } from "react-alert";
import { useRouteMatch, Route, Switch } from "react-router-dom";

import Navbar from "components/navbar/Navbar";
import PostsList from "components/posts-list";
import { useAuthorization } from "store/auth/auth-selectors";
import Loader from "components/common/loader";
import ProfilePage from "pages/ProfilePage";
import withErrorsAlert from "../hoc/withErrorsAlert";

import { MainWrapper } from "components/common/styles";

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
					<Route path={`${path}/:userName`} component={ProfilePage} />
					<Route path="/" component={PostsList} />
				</Switch>
			</MainWrapper>
		</>
	);
};

export default withErrorsAlert(Posts);
