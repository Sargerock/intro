import React from "react";
import MessagesList from "./components/messagesList/MessagesList";
import GlobalStyle from "./globalStyle";
import SendMessageForm from "./components/sendMessageForm/SendMessageForm";

function App() {
	return (
		<>
			<GlobalStyle />
			<div className="container">
				<SendMessageForm />
				<MessagesList />
			</div>
		</>
	);
}

export default App;
