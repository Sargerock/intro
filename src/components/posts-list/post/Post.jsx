import React from "react";
import PropTypes from "prop-types";
import stringReplace from "react-string-replace";
import { Link } from "react-router-dom";

import Avatar from "components/common/Avatar";

import { WrapperPost, PostBody, PostMessage } from "./PostStyled";

const Post = (props) => {
	const { text, authorName } = props;

	let stringWithLinks = stringReplace(text, /\B(@\w+)/gim, (match, i) => (
		<Link to={`/posts/${match}`} key={match + i}>
			{match}
		</Link>
	));

	stringWithLinks = stringReplace(stringWithLinks, /#(\w+)/gim, (match, i) => (
		<Link to={`/posts?tag=${match}`} key={match + i} data-tag={match}>
			{`#${match}`}
		</Link>
	));

	return (
		<WrapperPost>
			<div>
				<Avatar src="https://via.placeholder.com/100" alt="avatar" />
			</div>
			<PostBody>
				<Link to={`/posts/${authorName}`}>
					<strong>{authorName}</strong>
				</Link>
				<PostMessage>{stringWithLinks}</PostMessage>
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
