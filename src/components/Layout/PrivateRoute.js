import React, { useContext } from "react";
import { AuthContext } from "./../../contexts/userContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, data, ...rest }) => {
	const Data = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={props =>
				Data.token !== "" ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
