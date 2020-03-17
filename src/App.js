import React from "react";
import MessageListContainer from "./components/messagesList/MessageListContainer";
import GlobalStyle from "./globalStyle";
import SendMessageFormContainer from "./components/sendMessageForm/SendMessageFormContainer";
import { MessagesContext } from "./contexts/MessagesContext";

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="container">
        <MessagesContext>
          <SendMessageFormContainer />
          <MessageListContainer />
        </MessagesContext>
      </div>
    </>
  );
}

export default App;
