import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Posts from "./pages/Posts";
import Authorization from "./pages/authorization/Authorization";
import PrivateRoute from "./hoc/private-route/PrivateRoute";
import { fetchUser, getTokens } from "./store/auth/auth-actions";
import { useAuthorization } from "./store/auth/auth-selectors";
import Loader from "./components/common/loader/Loader";

function App() {
	const dispatch = useDispatch();
	const { isAuthorized, isLoading } = useAuthorization();
	useEffect(() => {
		dispatch(getTokens());
	}, [dispatch]);
	useEffect(() => {
		if (isAuthorized) dispatch(fetchUser());
	}, [dispatch, isAuthorized]);

	//if (isLoading) return <Loader />;
	return (
		<Switch>
			<Route path={["/sign-in", "/sign-up"]} component={Authorization} />
			<PrivateRoute path="/posts" component={Posts} />
			<Redirect to="/posts" />
		</Switch>
	);
}

export default App;
