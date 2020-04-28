import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import Profile from "components/Profile";
import PostsList from "components/PostsList";
import NavBar from "components/NavBar";
import {fetchSelectedProfile} from "../store/profile/profile-actions";
import NotFound from "components/common/NotFound";
import {fetchPosts, postsNamespaces} from "../store/posts/posts-actions";

import {MainWrapper} from "components/styles";
import {useProfile} from "../store/profile/profile-selectors";

const UserPage = () => {
	const dispatch = useDispatch();
	const {userName} = useParams();
	const {isLoading} = useProfile();
	const profile = useSelector(state => state.profile.byUsername[userName]);
	const postsState = useSelector(state => state.selectedProfilePosts);

	useEffect(() => {
		if (!profile) {
			dispatch(fetchSelectedProfile(userName));
		}
		if (profile) {
			dispatch(fetchPosts({
				userName: profile.userName,
				namespace: postsNamespaces.SELECTED_PROFILE,
				cursor: 0,
				postsPerFetch: postsState.postsPerFetch,
				isInitial: true
			}))
		}

	}, [dispatch, profile, userName, postsState.postsPerFetch]);

	return (
		<>
			<NavBar/>
			<MainWrapper>
				{!profile && !isLoading && <NotFound message={"404 User not found"}/>}
				{profile && (
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
