import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { MentionsInput, Mention } from "react-mentions";

import { fetchMentionData, mentionType } from "store/posts/posts-actions";
import { usePosts } from "store/posts/posts-selectors";

import styles from "./mentions.module.css";

const PostMentionInput = (props) => {
	const { name, value, submitForm, handleChange, handleBlur, ...rest } = props;
	const dispatch = useDispatch();
	const { mentionData } = usePosts();

	const createDataFetcher = (type) => (query, callback) => {
		if (!query) return;
		dispatch(fetchMentionData(query, type));
		callback(mentionData);
	};
	return (
		<MentionsInput
			className="mentions"
			classNames={styles}
			name={name}
			onKeyDown={(e) => {
				if (e.ctrlKey && e.key === "Enter") {
					submitForm();
				}
			}}
			onChange={(e) => {
				e.target.name = name; //mentions didn't set name
				handleChange(e);
			}}
			onBlur={handleBlur}
			value={value}
			{...rest}
		>
			<Mention
				trigger="@"
				data={createDataFetcher(mentionType.MENTION)}
				markup="@>>>__display__>>>"
				displayTransform={(id, name) => `@${name}`}
			/>
			<Mention
				trigger="#"
				data={createDataFetcher(mentionType.TAG)}
				markup="#>>>__display__>>>"
				displayTransform={(id, name) => `#${name}`}
			/>
		</MentionsInput>
	);
};

PostMentionInput.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	submitForm: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
};

export default PostMentionInput;
