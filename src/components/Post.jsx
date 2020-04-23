import React, { useState } from "react";
import PropTypes from "prop-types";
import stringReplace from "react-string-replace";
import { Link } from "react-router-dom";

import Avatar from "./common/Avatar";
import { useProfile } from "../store/profile/profile-selectors";
import EditPost from "./EditPost";
import PostControlButtons from "./PostControlButtons";

import { ModalStyled, WrapperPost, PostBody, PostMessage } from "./styles";

const getTextWithLinks = (text) => {
	let result = stringReplace(text, /\B@(\w+)/gim, (match, i) => (
		<Link to={`/${match}`} key={match + i}>
			{`@${match}`}
		</Link>
	));

	result = stringReplace(result, /#(\w+)/gim, (match, i) => (
		<Link to={`/home?tag=${match}`} key={match + i} data-tag={match}>
			{`#${match}`}
		</Link>
	));
	return result;
};

const Post = (props) => {
	const { text, authorName, authorId, id, avatarUrl } = props;
	const { userId } = useProfile();
	const [isVisible, setVisibility] = useState(false);

	return (
		<WrapperPost>
			<div>
				<Avatar src={process.env.REACT_APP_BASE_URL + avatarUrl} alt="avatar" />
			</div>
			<PostBody>
				<Link to={`/${authorName}`}>
					<strong>{authorName}</strong>
				</Link>
				<PostMessage>{getTextWithLinks(text)}</PostMessage>
				{userId === authorId ? (
					<>
						<ModalStyled
							isOpen={isVisible}
							onRequestClose={() => setVisibility(false)}
						>
							<EditPost id={id} text={text} setVisibility={setVisibility} />
						</ModalStyled>
						<PostControlButtons id={id} setVisibility={setVisibility} />
					</>
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
