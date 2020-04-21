import React, {useEffect} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserPage from "./pages/UserPage";
import PostsPage from "./pages/PostsPage";
import PrivateRoute from "./components/PrivateRoute";
import {fetchUser, checkToken} from "store/auth/auth-actions";
import {useAuthorization} from "store/auth/auth-selectors";
import Notifications from "./components/Notifications";
import withErrorAlert from "./hoc/withErrorAlert";
import ProfilePosts from "./components/ProfilePosts";
import Settings from "./components/Settings";

import GlobalStyle from "./globalStyle";


function App() {
	const dispatch = useDispatch();
	const {isAuthorized} = useAuthorization();

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
			<GlobalStyle/>
			<BrowserRouter>
				<Switch>
					<Route path="/sign-in" component={SignIn}/>
					<Route path="/sign-up" component={SignUp}/>
					<PrivateRoute path="/posts/:userName" component={UserPage}/>
					<PrivateRoute exact path="/posts" component={PostsPage}/>
					<PrivateRoute path="/profile/posts" component={ProfilePosts}/>
					<PrivateRoute path="/profile/notifications" component={Notifications}/>
					<PrivateRoute path="/profile/settings" component={Settings}/>
					<Redirect to="/posts"/>
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default withErrorAlert(App);
