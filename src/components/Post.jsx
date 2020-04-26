import React from "react";
import PropTypes from "prop-types";
import stringReplace from "react-string-replace";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import Avatar from "./common/Avatar";
import {useProfile} from "../store/profile/profile-selectors";
import {deletePost} from "../store/posts/posts-actions";

import {WrapperPost, PostBody, PostMessage, ButtonDeletePost, ButtonEditPost} from "./styles";

const getTextWithLinks = (text) => {
	let result = stringReplace(text, /\B@(\w+)/gim, (match, i) => (
		<Link to={`/${match}`} key={match + i}>
			{`@${match}`}
		</Link>
	));

	result = stringReplace(result, /#(\w+)/gim, (match, i) => (
		<Link to={`/hashtag/${match}`} key={match + i} data-tag={match}>
			{`#${match}`}
		</Link>
	));
	return result;
};

const Post = (props) => {
	const dispatch = useDispatch();
	const {text, authorName, authorId, id, avatarUrl, setModalOptions} = props;
	const {userId} = useProfile();

	return (
		<WrapperPost>
			<div>
				<Avatar src={process.env.REACT_APP_BASE_URL + avatarUrl} alt="avatar"/>
			</div>
			<PostBody>
				<Link to={`/${authorName}`}>
					<strong>{authorName}</strong>
				</Link>
				<PostMessage>{getTextWithLinks(text)}</PostMessage>
				{userId === authorId
					? <>
						<ButtonDeletePost onClick={() => dispatch(deletePost(id))}>
							&times;
						</ButtonDeletePost>
						<ButtonEditPost>
							<span onClick={() => setModalOptions({
								isVisible: true,
								text,
								id
							})}>
								Edit
							</span>
						</ButtonEditPost>
					</>
					: undefined
				}
			</PostBody>
		</WrapperPost>
	);
};

Post.propTypes = {
	id: PropTypes.number.isRequired,
	authorName: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	authorId: PropTypes.number.isRequired,
};

export default Post;
