import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProfilePage from "./pages/ProfilePage";
import PostsPage from "./pages/PostsPage";
import PrivateRoute from "./components/PrivateRoute";
import { fetchUser, checkToken } from "store/auth/auth-actions";
import { useAuthorization } from "store/auth/auth-selectors";

import GlobalStyle from "./globalStyle";

function App() {
	const dispatch = useDispatch();
	const { isAuthorized } = useAuthorization();

	useEffect(() => {
		dispatch(checkToken());
	}, [dispatch]);

	useEffect(() => {
		if (isAuthorized) {
			dispatch(fetchUser());
		}
	}, [dispatch, isAuthorized]);

	return (
		<>
			<GlobalStyle />
			<AlertProvider
				template={AlertTemplate}
				position="top center"
				timeout={5000}
				offset="30px"
				transition="fade"
			>
				<BrowserRouter>
					<Switch>
						<Route path="/sign-in" component={SignIn} />
						<Route path="/sign-up" component={SignUp} />
						<PrivateRoute path="/posts/:userName" component={ProfilePage} />
						<PrivateRoute path="/posts" component={PostsPage} />
						<Redirect to="/posts" />
					</Switch>
				</BrowserRouter>
			</AlertProvider>
		</>
	);
}

export default App;
