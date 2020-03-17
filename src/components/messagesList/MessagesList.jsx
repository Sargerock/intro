import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

import Message from "./message/Message";

const MessagesList = ({ messages, getMessages, hasMore }) => {
	const mapMessages = messages.map(({ id, author, message }) => (
		<Message key={id} author={author} messageText={message} />
	));
	return (
		<div>
			<InfiniteScroll
				pageStart={0}
				loadMore={getMessages}
				hasMore={hasMore}
				loader={<div key={0}>Loading ...</div>}
			>
				{mapMessages}
			</InfiniteScroll>
		</div>
	);
};

MessagesList.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired
		})
	)
};

MessagesList.defaultProps = {
	messages: []
};

export default MessagesList;
