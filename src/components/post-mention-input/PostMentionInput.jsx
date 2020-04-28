import React from "react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {MentionsInput, Mention} from "react-mentions";

import {fetchMentionData, mentionTypes} from "store/posts/posts-actions";

import styles from "./mentions.module.css";

const PostMentionInput = (props) => {
	const {name, value, submitForm, handleChange, ...rest} = props;
	const dispatch = useDispatch();

	const createDataFetcher = (type) => async (query, callback) => {
		if (!query) {
			return;
		}
		try {
			const action = await dispatch(fetchMentionData(query, type));
			const mentionData = action.payload.data.map((data) => ({
				id: data.id,
				display: data.userName || data.tag,
			}));
			callback(mentionData);
		} catch (e) {
		}
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
				e.target.name = name; //mentions didn't set a name
				handleChange(e);
			}}
			value={value}
			{...rest}
		>
			<Mention
				trigger="@"
				data={createDataFetcher(mentionTypes.USERNAME)}
				markup="@>>>__display__>>>"
				displayTransform={(id, name) => `@${name}`}
			/>
			<Mention
				trigger="#"
				data={createDataFetcher(mentionTypes.TAG)}
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
};

export default PostMentionInput;
