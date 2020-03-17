import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

import GlobalStyle from "./globalStyle";

ReactDOM.render(
	<Provider store={store}>
		<GlobalStyle />
		<App />
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
