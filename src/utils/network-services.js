import axios from "axios";

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
				setTimeout(() => {
					window.location = "/login";
				}, 500);
			}
			return Promise.reject(error);
		}
	);
};

export default NetworkServices;
