import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import Profile from "components/Profile";
import PostsList from "components/PostsList";
import NavBar from "components/NavBar";
import {fetchSelectedProfile, profileNamespaces} from "../store/profile/profile-actions";
import NotFound from "components/common/NotFound";
import {fetchPosts, postsNamespaces} from "../store/posts/posts-actions";

import {MainWrapper} from "components/styles";

const UserPage = () => {
	const dispatch = useDispatch();
	const {userName} = useParams();
	const profile = useSelector(state => state.selectedProfile);
	const postsState = useSelector(state => state.selectedProfilePosts);

	useEffect(() => {
	 	dispatch(fetchSelectedProfile(userName, profileNamespaces.SELECTED));
		dispatch(fetchPosts({
			userName,
			namespace: postsNamespaces.SELECTED_PROFILE,
			cursor: 0,
			postsPerFetch: postsState.postsPerFetch,
			isInitial: true
		}))
	 }, [dispatch, userName, postsState.postsPerFetch]);
	return (
		<>
			<NavBar/>
			<MainWrapper>
				{!profile.userName && !profile.isLoading && <NotFound message={"404 User not found"}/>}
				{profile.userName && (
					<>
						<Profile profile={profile}/>
						<PostsList
							userName={userName}
							postsState={postsState}
							namespace={postsNamespaces.SELECTED_PROFILE}
						/>
					</>
				)}
			</MainWrapper>
		</>
	);
};

export default UserPage;
