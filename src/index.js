import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AuthProvider from "./contexts/userContext";
import NetworkServices from "./utils/network-services";
import { BrowserRouter } from "react-router-dom";

NetworkServices();
ReactDOM.render(
	<AuthProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AuthProvider>,
	document.getElementById("root")
);

serviceWorker.register();
