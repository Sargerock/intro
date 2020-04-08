import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Profile from "../components/profile/Profile";
import PostsList from "../components/posts-list/PostsList";
import { usePosts } from "../store/posts/posts-selectors";
import Loader from "../components/common/loader/Loader";
import { fetchProfile } from "../store/posts/posts-actions";
import NotFound from "../components/common/not-found/NotFound";
import { useProfile } from "../store/auth/auth-selectors";
import CreatePost from "../components/create-post/CreatePost";

const ProfilePage = () => {
	const dispatch = useDispatch();
	const { userName: authorName } = useParams();
	const { profile, error } = usePosts();
	const { userName } = useProfile();

	useEffect(() => {
		dispatch(fetchProfile(authorName));
	}, [dispatch, authorName]);

	if (!profile && error) {
		return <NotFound message={"404 User not found"} />;
	}

	if (!profile) {
		return <Loader />;
	}

	return (
		<>
			<Profile userName={authorName} />
			{userName === authorName ? <CreatePost /> : undefined}
			<PostsList />
		</>
	);
};

export default ProfilePage;
