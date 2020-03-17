import React, { useContext } from "react";

import { Api } from "../../api";
import { messagesContext } from "../../contexts/MessagesContext";
import SendMessageForm from "./SendMessageForm";
import { createMessage } from "../../actions";

const SendMessageFormContainer = () => {
	const { dispatch } = useContext(messagesContext);

	const sendMessage = async message => {
		const payload = await Api.createMessage(message);
		dispatch(createMessage(payload));
	};

	return <SendMessageForm sendMessage={sendMessage} />;
};

export default SendMessageFormContainer;
