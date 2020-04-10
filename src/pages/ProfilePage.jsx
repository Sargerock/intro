import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Profile from "components/profile";
import PostsList from "components/posts-list";
import { usePosts } from "store/posts/posts-selectors";
import { fetchProfile } from "store/posts/posts-actions";
import NotFound from "components/common/not-found";
import { useProfile } from "store/auth/auth-selectors";
import CreatePost from "components/create-post";

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

	if (!profile && error) {
		return <NotFound message={"404 User not found"} />;
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
