import React, { useContext } from "react";
import { AuthContext } from "./../../contexts/userContext";
import { Route, Redirect } from "react-router-dom";
//import { getRole } from "./../../utils/services";

const PrivateRoute = ({ component: Component, data, ...rest }) => {
	const Data = useContext(AuthContext);
	//const [userData] = useState(getRole());
	return (
		<Route
			{...rest}
			render={props =>
				Data.token !== "" ? (
					// rest.path === "/groups" && userData.role === "member" ? (
					// 	<Redirect to="/login" />
					// ) : (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
