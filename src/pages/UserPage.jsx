import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import Profile from "components/Profile";
import PostsList from "components/PostsList";
import NavBar from "components/NavBar";
import {usePosts} from "store/posts/posts-selectors";
import {fetchProfile} from "store/posts/posts-actions";
import NotFound from "components/common/NotFound";

import {MainWrapper} from "components/styles";

const UserPage = () => {
	const dispatch = useDispatch();
	const {userName: authorName} = useParams();
	const {profile, isLoading} = usePosts();

	useEffect(() => {
		dispatch(fetchProfile(authorName));
	}, [dispatch, authorName]);

	console.log(profile)
	return (
		<>
			<NavBar/>
			<MainWrapper>
				{!profile && !isLoading && <NotFound message={"404 User not found"}/>}
				{profile && (
					<>
						<Profile userName={authorName}/>
						<PostsList authorName={authorName} avatarUrl={profile.avatarUrl}/>
					</>
				)}
			</MainWrapper>
		</>
	);
};

export default UserPage;
