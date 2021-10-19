import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Navigator from "../src/components/Layout/Navigator";
import "./custom-antd.css";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import PrivateRoute from "./components/Layout/PrivateRoute";
import "./index.css";
import "./App.css";

function App() {
	return (
		<Switch>
			<Route exact path="/login" component={Login} />
			<Route exact path="/forgot" component={ForgotPassword} />
			<Route exact path="/reset/:id/:token" component={ResetPassword} />
			<PrivateRoute exact component={Navigator} />
		</Switch>
	);
}

export default App;
