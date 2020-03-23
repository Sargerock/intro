import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Posts from "./pages/posts/Posts";
import Authorization from "./pages/authorization/Authorization";
import Navigation from "./components/navigation/Navigation";
import PrivateRoute from "./hoc/private-route/PrivateRoute";
import { getUser } from "./store/auth/auth-actions";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUser());
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Navigation />
			<Switch>
				<Route path={["/signin", "/signup"]} component={Authorization} />
				<PrivateRoute path="/posts" component={Posts} />
				<Redirect to="/posts" />
			</Switch>
		</>
	);
}

export default App;
