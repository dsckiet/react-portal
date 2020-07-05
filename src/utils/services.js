import axios from "axios";
import jwt from "jwt-decode";
import {
	LOGIN,
	GET_EVENTS,
	DELETE_EVENT,
	ADD_EVENT,
	GET_EVENT,
	UPDATE_EVENT,
	CHANGE_EVENT_CODE,
	TOGGLE_REGISTRATION,
	VIEW_USERS,
	ADD_USER,
	GET_PARTICIPANTS,
	GET_PARTICIPANT_DETAILS,
	TOGGLE_WEBSITE_SEEN,
	TOGGLE_REVOKE,
	DELETE_USER,
	GET_PROFILE,
	UPDATE_PROFILE,
	FORGOTPASS,
	RESETPASS,
	DELETE_PARTICIPANT,
	REVOKE_PARTICIPANT,
	PREVIEW_CERTIFICATE,
	ADD_CERTIFICATE
} from "./routes";

const BASE_URL = "https://api.dsckiet.com/dev";

axios.defaults.baseURL = BASE_URL;

function setUserToken(token) {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	if (AUTH_TOKEN.token !== "") {
		if (AUTH_TOKEN.token.includes("Logout")) {
			localStorage.clear();
			window.location.push("/login");
		}
		axios.defaults.headers.common["x-auth-token"] = AUTH_TOKEN.token;
	}
}

/******************AUTH SERVICES********************/
export async function loginService(data) {
	try {
		const response = await axios.post(LOGIN, data);
		if (response.status === 200 && response.data.error === false) {
			return {
				res: response.data,
				token: response.headers["x-auth-token"]
			};
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export const forgotPassService = async data => {
	try {
		const response = await axios.post(FORGOTPASS, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const resetPassService = async data => {
	try {
		const response = await axios.post(RESETPASS, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

/******************EVENT SERVICES********************/
export async function getEventsService() {
	try {
		const response = await axios.get(GET_EVENTS);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export async function getEventService(id) {
	try {
		const response = await axios.get(`${GET_EVENT}?eid=${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else if (response.status === 500)
			return { response: { data: { message: "Something went wrong" } } };
		else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export async function addEventService(data) {
	setUserToken();
	try {
		const config = {
			headers: {
				"content-type": "multipart/form-data"
			}
		};
		const response = await axios.post(ADD_EVENT, data, config);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export async function updateEventService(data, params) {
	setUserToken();
	try {
		const config = {
			headers: {
				"content-type": "multipart/form-data"
			}
		};
		const response = await axios.put(
			`${UPDATE_EVENT}/${params}`,
			data,
			config
		);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export async function refreshEventCodeService(data) {
	setUserToken();
	try {
		const response = await axios.post(CHANGE_EVENT_CODE, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export async function toggleRegistrationsService(data) {
	setUserToken();
	try {
		const response = await axios.post(TOGGLE_REGISTRATION, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export async function deleteEventsService(eventId) {
	setUserToken();
	try {
		const response = await axios.delete(`${DELETE_EVENT}/${eventId}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

/******************USER/TEAM SERVICES********************/
export async function getUsersService() {
	try {
		const response = await axios.get(VIEW_USERS);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export const getUserService = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_PROFILE}?uid=${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (error) {
		if (error.response) throw error.response.data;
		else throw error.message;
	}
};

export async function addUserService(data) {
	setUserToken();
	try {
		const response = await axios.post(ADD_USER, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export const updateUserService = async data => {
	setUserToken();
	try {
		const response = await axios.post(UPDATE_PROFILE, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (error) {
		if (error.response) throw error.response.data;
		else throw error.message;
	}
};

export const toggleWebsiteSeen = async id => {
	setUserToken();
	try {
		const response = await axios.put(`${TOGGLE_WEBSITE_SEEN}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (error) {
		if (error.response) throw error.response.data;
		else throw error.message;
	}
};

export const toggleUserRevoke = async id => {
	setUserToken();
	try {
		const response = await axios.put(`${TOGGLE_REVOKE}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (error) {
		if (error.response) throw error.response.data;
		else throw error.message;
	}
};

export const deleteUser = async id => {
	setUserToken();
	try {
		const response = await axios.delete(`${DELETE_USER}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (error) {
		if (error.response) throw error.response.data;
		else throw error.message;
	}
};

/******************PARTICIPANTS SERVICES********************/
export async function getParticipantsService(params) {
	setUserToken();
	try {
		const response = await axios.get(GET_PARTICIPANTS, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export async function getParticipantsDetailService(params) {
	setUserToken();
	try {
		const response = await axios.get(GET_PARTICIPANT_DETAILS, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
}

export const deleteParticipantServices = async id => {
	setUserToken();
	try {
		const response = await axios.delete(`${DELETE_PARTICIPANT}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const revokeParticipantServices = async id => {
	setUserToken();
	try {
		const response = await axios.put(`${REVOKE_PARTICIPANT}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (error) {
		if (error.response) throw error.response.data;
		else throw error.message;
	}
};

/******************CERTIFICATE SERVICES********************/
export const previewCertificateService = data => {
	setUserToken();
	axios
		.post(PREVIEW_CERTIFICATE, data, {
			responseType: "blob" //Force to receive data in a Blob Format
		})
		.then(response => {
			console.log(response);
			//Create a Blob from the PDF Stream
			const file = new Blob([response.data], { type: "application/pdf" });
			//Build a URL from the file
			const fileURL = URL.createObjectURL(file);
			//Open the URL on new Window
			window.open(fileURL);
		})
		.catch(err => {
			//since response type is forced to be Blob, we need to parse if server sends a JSON resp.
			if (
				err.request.responseType === "blob" &&
				err.response.data instanceof Blob &&
				err.response.data.type &&
				err.response.data.type.toLowerCase().indexOf("json") !== -1
			) {
				let reader = new FileReader();
				reader.readAsText(err.response.data);
				reader.onload = () => {
					err.response.data = JSON.parse(reader.result);
					console.log(err.response.data);
				};
			}
		});
};

export const addCertificateService = async (data, id) => {
	try {
		const response = await axios.post(`${ADD_CERTIFICATE}/${id}`, data);
		return response.data;
	} catch (error) {
		if (error.response) throw error.response.data;
		else throw error.message;
	}
};

/******************Helper SERVICES********************/
export const getRole = () => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	let decode = jwt(AUTH_TOKEN.token);
	return decode;
};
