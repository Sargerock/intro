import React, {useEffect} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import ProfilePage from "./pages/ProfilePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import {fetchUser, checkToken} from "store/auth/auth-actions";
import {useAuthorization} from "store/auth/auth-selectors";
import withErrorAlert from "./hoc/withErrorAlert";

import GlobalStyle from "./globalStyle";



function App() {
	const dispatch = useDispatch();
	const {isAuthorized, isInitialized} = useAuthorization();

	useEffect(() => {
		dispatch(checkToken());
	}, [dispatch]);

	useEffect(() => {
		if (isAuthorized) {
			dispatch(fetchUser());
		}
	}, [dispatch, isAuthorized]);

	if(!isInitialized){
		return <div>splash</div>
	}

	return (
		<>
			<GlobalStyle/>
			<BrowserRouter>
				<Switch>
					<Route path={["/sign-in", "/sign-up"]} component={AuthenticationPage}/>
					<PrivateRoute path="/home" component={HomePage}/>
					<PrivateRoute path={["/profile/posts", "/profile/mentions", "/profile/settings"]}
								  component={ProfilePage}/>
					<PrivateRoute path="/:userName" component={UserPage}/>
					<Redirect to="/home"/>
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default withErrorAlert(App);
