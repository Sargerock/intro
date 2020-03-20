import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

import GlobalStyle from "./globalStyle";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<GlobalStyle />
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
