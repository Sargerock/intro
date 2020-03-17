import React, { useReducer, createContext } from "react";
import { messagesReducer, initialState } from "../reducers/messagesReducer";

export const messagesContext = createContext(null);

export const MessagesContext = ({ children }) => {
	const [state, dispatch] = useReducer(messagesReducer, initialState);
	return (
		<messagesContext.Provider value={{ state, dispatch }}>
			{children}
		</messagesContext.Provider>
	);
};
