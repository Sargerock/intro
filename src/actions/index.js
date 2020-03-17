import { SET_MESSAGES, CREATE_MESSAGE } from "../constants";

export const setMessages = messages => ({
	type: SET_MESSAGES,
	payload: messages
});

export const createMessage = message => ({
	type: CREATE_MESSAGE,
	payload: message
});
