import React, { useContext } from "react";

import MessagesList from "./MessagesList";
import { Api } from "../../api";
import { messagesContext } from "../../contexts/MessagesContext";
import { setMessages } from "../../actions";

const MessageListContainer = () => {
	const {
		dispatch,
		state: { messages, currentFetchPosition, totalMessages }
	} = useContext(messagesContext);
	const getMessages = async () => {
		//initial totalMessages = null
		if (!totalMessages || currentFetchPosition <= totalMessages) {
			const payload = await Api.getMessages(currentFetchPosition);
			dispatch(setMessages(payload));
		}
	};

	const hasMore = () =>
		!totalMessages ? true : currentFetchPosition < totalMessages;

	return (
		<MessagesList
			getMessages={getMessages}
			messages={messages}
			hasMore={hasMore()}
		/>
	);
};

export default MessageListContainer;
