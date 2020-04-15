import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Profile from "components/Profile";
import PostsList from "components/PostsList";
import Navbar from "components/Navbar";
import { usePosts } from "store/posts/posts-selectors";
import { fetchProfile } from "store/posts/posts-actions";
import NotFound from "components/common/NotFound";
import { useProfile } from "store/auth/auth-selectors";
import CreatePost from "components/CreatePost";

import { MainWrapper } from "components/styles";

const ProfilePage = () => {
	const dispatch = useDispatch();
	const { userName: authorName } = useParams();
	const { profile, error } = usePosts();
	const { userName } = useProfile();

	useEffect(() => {
		if (userName) {
			dispatch(fetchProfile(authorName));
		}
	}, [dispatch, authorName, userName]);

	return (
		<>
			<Navbar />
			<MainWrapper>
				{!profile && error && <NotFound message={"404 User not found"} />}
				{profile && (
					<>
						<Profile userName={authorName} />
						{userName === authorName ? <CreatePost /> : undefined}
						<PostsList authorName={authorName} />
					</>
				)}
			</MainWrapper>
		</>
	);
};

export default ProfilePage;
