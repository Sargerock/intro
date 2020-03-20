import React from "react";
import { Switch, Route } from "react-router-dom";

import Posts from "./pages/posts/Posts";
import Authorization from "./pages/authorization/Authorization";
import Navigation from "./components/navigation/Navigation";
import PrivateRoute from "./hoc/private-route/PrivateRoute";

function App() {
	return (
		<>
			<Navigation />
			<Switch>
				<Route path={["/signin", "/signup"]} component={Authorization} />
				<PrivateRoute path="/posts" component={Posts} />
			</Switch>
		</>
	);
}

export default App;
