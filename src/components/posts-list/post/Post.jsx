import React, { useState } from "react";
import PropTypes from "prop-types";
import stringReplace from "react-string-replace";
import { Link } from "react-router-dom";

import Avatar from "components/common/Avatar";
import { useProfile } from "store/auth/auth-selectors";

import { WrapperPost, PostBody, PostMessage } from "./PostStyled";
import PostControlButtons from "../post-control-buttons";
import { ModalStyled } from "components/common/styles";
import EditPost from "components/EditPost";

const Post = (props) => {
	const { text, authorName, authorId, id } = props;
	const { userId } = useProfile();
	const [isVisible, setVisibility] = useState(false);

	let stringWithLinks = stringReplace(text, /\B@(\w+)/gim, (match, i) => (
		<Link to={`/posts/${match}`} key={match + i}>
			{`@${match}`}
		</Link>
	));

	stringWithLinks = stringReplace(stringWithLinks, /#(\w+)/gim, (match, i) => (
		<Link to={`/posts?tag=${match}`} key={match + i} data-tag={match}>
			{`#${match}`}
		</Link>
	));

	return (
		<WrapperPost>
			<ModalStyled
				isOpen={isVisible}
				onRequestClose={() => setVisibility(false)}
			>
				<EditPost id={id} text={text} setVisibility={setVisibility} />
			</ModalStyled>
			<div>
				<Avatar src="https://via.placeholder.com/100" alt="avatar" />
			</div>
			<PostBody>
				<Link to={`/posts/${authorName}`}>
					<strong>{authorName}</strong>
				</Link>
				<PostMessage>{stringWithLinks}</PostMessage>
				{userId === authorId ? (
					<PostControlButtons id={id} setVisibility={setVisibility} />
				) : undefined}
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
