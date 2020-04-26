import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";

import NavBar from "components/NavBar";
import PostsList from "components/PostsList";
import {fetchPosts, postsNamespaces} from "../store/posts/posts-actions";

import { MainWrapper } from "components/styles";

const HashtagPage = () => {
	const dispatch = useDispatch();
	const {tag} = useParams();
	const postsState = useSelector(state => state.tagPosts);

	useEffect(() => {
			dispatch(fetchPosts({
				tag,
				namespace: postsNamespaces.TAG,
				cursor: 0,
				postsPerFetch: postsState.postsPerFetch,
				isInitial: true
			}))
	}, [dispatch, tag, postsState.postsPerFetch])

	return (
		<>
			<NavBar />
			<MainWrapper>
				<PostsList postsState={postsState} tag={tag} namespace={postsNamespaces.TAG}/>
			</MainWrapper>
		</>
	);
};

export default HashtagPage;
