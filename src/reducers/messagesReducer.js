import { CREATE_MESSAGE, SET_MESSAGES } from "../constants";

export const initialState = {
	messages: [],
	totalMessages: null,
	currentFetchPosition: 0
};

export const messagesReducer = (state, { type, payload }) => {
	switch (type) {
		case SET_MESSAGES:
			return {
				...state,
				messages: [...state.messages, ...payload.messages],
				totalMessages: payload.totalMessages,
				currentFetchPosition:
					state.currentFetchPosition + payload.messages.length
			};
		case CREATE_MESSAGE:
			return {
				...state,
				messages: [payload, ...state.messages],
				totalMessages: state.totalMessages + 1,
				currentFetchPosition: state.currentFetchPosition + 1
			};
		default:
			return state;
	}
};
