import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import App from "./App";
import store from "./store";

import GlobalStyle from "./globalStyle";

const alertOptions = {
	position: "top center",
	timeout: 5000,
	offset: "30px",
	transition: "fade",
};

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<GlobalStyle />
			<AlertProvider template={AlertTemplate} {...alertOptions}>
				<App />
			</AlertProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
