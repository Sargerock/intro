import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import Profile from "components/Profile";
import PostsList from "components/PostsList";
import NavBar from "components/NavBar";
import {fetchProfile} from "../store/profile/profile-actions";
import NotFound from "components/common/NotFound";

import {MainWrapper} from "components/styles";

const UserPage = () => {
	const dispatch = useDispatch();
	const {userName} = useParams();
	const profile = useSelector(state => state.selectedProfile);

	console.log("isLoading: ", profile.isLoading)

	useEffect(() => {
	 	dispatch(fetchProfile(userName, "selected"));
	 }, [dispatch, userName]);

	return (
		<>
			<NavBar/>
			<MainWrapper>
				{!profile.userName && !profile.isLoading && <NotFound message={"404 User not found"}/>}
				{profile.userName && (
					<>
						<Profile profile={profile}/>
						<PostsList authorName={userName}/>
					</>
				)}
			</MainWrapper>
		</>
	);
};

export default UserPage;
