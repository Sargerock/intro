import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import UsersProfile from "components/UsersProfile";
import PostsList from "components/PostsList";
import NavBar from "components/NavBar";
import {usePosts} from "store/posts/posts-selectors";
import {fetchProfile} from "store/posts/posts-actions";
import NotFound from "components/common/NotFound";

import {MainWrapper} from "components/styles";

const UserPage = () => {
	const dispatch = useDispatch();
	const {userName: authorName} = useParams();
	const {profile, error} = usePosts();

	useEffect(() => {
		dispatch(fetchProfile(authorName));
	}, [dispatch, authorName]);

	return (
		<>
			<NavBar/>
			<MainWrapper>
				{!profile && error && <NotFound message={"404 User not found"}/>}
				{profile && (
					<>
						<UsersProfile userName={authorName}/>
						<PostsList authorName={authorName}/>
					</>
				)}
			</MainWrapper>
		</>
	);
};

export default UserPage;
