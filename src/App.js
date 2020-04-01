import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Posts from "./pages/posts/Posts";
import Authorization from "./pages/authorization/Authorization";
import PrivateRoute from "./hoc/private-route/PrivateRoute";
import { fetchUser, getTokens } from "./store/auth/auth-actions";

import "toasted-notes/src/styles.css";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTokens());
		dispatch(fetchUser());
		// eslint-disable-next-line
	}, []);

	return (
		<Switch>
			<Route path={["/sign-in", "/sign-up"]} component={Authorization} />
			<PrivateRoute path="/posts" component={Posts} />
			<Redirect to="/posts" />
		</Switch>
	);
}

export default App;
