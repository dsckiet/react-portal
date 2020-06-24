import axios from "axios";
import { _notification } from "./_helpers";
import history from "../App";

const NetworkServices = () => {
	// Add a response interceptor
	axios.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			//catches if the session ended!
			if (error.response.data.message.includes("Logout")) {
				console.log(error.response.data.message);
				localStorage.clear();
				// _notification("error", "Error", error.response.data.message);
				// console.log(history.push);
				history.push("/login");
			}
			return Promise.reject(error);
		}
	);
};

export default NetworkServices;
