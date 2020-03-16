import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Authentication/Login";
import Navigator from "../src/components/Layout/Navigator";

import "./App.css";
import "./custom-antd.css";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route path="/" component={Navigator} />
			</Switch>
		</Router>
	);
}

export default App;
