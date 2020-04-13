import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { deletePost } from "store/posts/posts-actions";

import { ButtonDeletePost, ButtonEditPost } from "./PostControlButtonsStyled";

const PostControlButtons = ({ id, setVisibility }) => {
	const dispatch = useDispatch();

	return (
		<>
			<ButtonDeletePost onClick={() => dispatch(deletePost(id))}>
				&times;
			</ButtonDeletePost>
			<ButtonEditPost>
				<span onClick={() => setVisibility(true)}>Edit</span>
			</ButtonEditPost>
		</>
	);
};

PostControlButtons.propTypes = {
	id: PropTypes.number.isRequired,
	setVisibility: PropTypes.func.isRequired,
};

export default PostControlButtons;
