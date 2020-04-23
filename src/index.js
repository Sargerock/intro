import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {Provider} from "react-redux";
import Modal from "react-modal";

import App from "./App";
import store from "./store";
import AlertTemplate from "react-alert-template-basic";
import {Provider as AlertProvider} from "react-alert";

Modal.setAppElement("#root");

ReactDOM.render(
	<Provider store={store}>
		<AlertProvider
			template={AlertTemplate}
			position="top center"
			timeout={5000}
			offset="30px"
			transition="fade"
		>
			<App/>
		</AlertProvider>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
