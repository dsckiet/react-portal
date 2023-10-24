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
	ADD_CERTIFICATE,
	GET_TODO,
	ADD_TODO,
	UPDATE_TODO,
	DELETE_TODO,
	DELETE_ALL_TODO,
	EDIT,
	CHANGE_PASSWORD,
	GET_GROUPS,
	ADD_GROUP,
	DELETE_GROUP,
	ADD_TASK,
	GET_MY_TASK,
	DELETE_TASK,
	GET_TASK,
	UPDATE_TASK_STATUS,
	GET_COMMENTS,
	UPDATE_TASK
} from "./routes";

const BASE_URL = window.location.host === "portal.dsckiet.com"
		? "https://api.dsckiet.com/prod"
		: "https://api.dsckiet.com/dev";
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
	setUserToken();
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
	setUserToken();
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
export async function getUsersService(params) {
	setUserToken();
	try {
		const response = await axios.get(VIEW_USERS, { params });
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

export const getTodo = async () => {
	setUserToken();
	try {
		const response = await axios.get(GET_TODO);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addTodo = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_TODO, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const updateTodo = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_TODO}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const editTodo = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_TODO}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const deleteTodo = async id => {
	setUserToken();
	try {
		const response = await axios.delete(`${DELETE_TODO}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const deleteAllTodo = async () => {
	setUserToken();
	try {
		const response = await axios.delete(DELETE_ALL_TODO);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const editService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${EDIT}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const changePassword = async data => {
	setUserToken();
	try {
		const response = await axios.post(CHANGE_PASSWORD, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
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
		return response.data;
	} catch (error) {
		if (error.response) throw error.response.data;
		else throw error.message;
	}
};

/******************CERTIFICATE SERVICES********************/
export const previewCertificateService = async data => {
	setUserToken();
	try {
		let response = await axios.post(PREVIEW_CERTIFICATE, data, {
			responseType: "blob" //Force to receive data in a Blob Format
		});
		const file = new Blob([response.data], { type: "application/pdf" });
		//Build a URL from the file
		const fileURL = URL.createObjectURL(file);
		//Open the URL on new Window
		window.open(fileURL);
	} catch (error) {
		throw error;
	}
};

export const addCertificateService = async (data, id) => {
	setUserToken();
	try {
		const response = await axios.post(`${ADD_CERTIFICATE}/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

/************************* PROGRESS SERVICES ****************************/
export const getGroupsService = async () => {
	setUserToken();
	try {
		const response = await axios.get(GET_GROUPS);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addGroupService = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_GROUP, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const deleteGroupService = async id => {
	setUserToken();
	try {
		const response = await axios.delete(`${DELETE_GROUP}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addTaskService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.post(`${ADD_TASK}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getTaskService = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_TASK}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const deleteTaskService = async id => {
	setUserToken();
	try {
		const response = await axios.delete(`${DELETE_TASK}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const updateTaskService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_TASK}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const updateTaskStatus = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_TASK_STATUS}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getTaskAssignee = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${UPDATE_TASK_STATUS}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getMyTaskService = async () => {
	setUserToken();
	try {
		const response = await axios.get(GET_MY_TASK);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const getCommentService = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_COMMENTS}/${id}`);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const addCommentService = async (id, data) => {
	setUserToken();
	try {
		const response = await axios.post(`${GET_COMMENTS}/${id}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};
/******************Helper SERVICES********************/
export const getRole = () => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	let decode = jwt(AUTH_TOKEN.token);
	return decode;
};
