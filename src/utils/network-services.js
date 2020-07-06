import axios from "axios";

const NetworkServices = () => {
	// Add a response interceptor
	axios.interceptors.response.use(
		function (response) {
			return response;
		},
		async function (error) {
			if (error.response) {
				// Catching axios errors
				if (error.response.data.message) {
					//catches if the session ended!
					if (error.response.data.message.includes("Logout")) {
						console.log(error.response.data.message);
						localStorage.clear();
						setTimeout(() => {
							window.location = "/login";
						}, 500);
					}
				}
				// Catching blob errors
				if (
					error.request.responseType === "blob" &&
					error.response.data instanceof Blob &&
					error.response.data.type &&
					error.response.data.type.toLowerCase().indexOf("json") !==
						-1
				) {
					let result = await pFileReader(error.response.data);
					let errmsg = JSON.parse(result);
					if (errmsg.message) {
						if (errmsg.message.includes("Logout")) {
							localStorage.clear();
							setTimeout(() => {
								window.location = "/login";
							}, 500);
						}
					}
					return Promise.reject(errmsg);
				}
			}
			return Promise.reject(error);
		}
	);
};
function pFileReader(blobFile) {
	return new Promise((resolve, reject) => {
		var fr = new FileReader();
		fr.onload = () => resolve(fr.result); // CHANGE to whatever function you want which would eventually call resolve
		fr.readAsText(blobFile);
	});
}

export default NetworkServices;
