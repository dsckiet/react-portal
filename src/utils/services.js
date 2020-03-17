import axios from "axios";
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
	ADD_USER
} from "./routes";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

axios.defaults.baseURL = BASE_URL;

function setUserToken(token) {
	let AUTH_TOKEN = localStorage.getItem("token");
	if (AUTH_TOKEN) axios.defaults.headers.common["x-auth-token"] = AUTH_TOKEN;
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
		return err.response.data;
	}
}

/******************EVENT SERVICES********************/
export async function getEventsService() {
	try {
		const response = await axios.get(GET_EVENTS);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		return err.response.data;
	}
}

export async function getEventService(id) {
	try {
		const params = { id };
		const response = await axios.get(GET_EVENT, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		return err.response.data;
	}
}

export async function addEventService(data) {
	setUserToken();
	try {
		const response = await axios.post(ADD_EVENT, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		return err.response.data;
	}
}

export async function updateEventService(data, params) {
	setUserToken();
	try {
		const response = await axios.put(`${UPDATE_EVENT}/${params}`, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		return err.response.data;
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
		return err.response.data;
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
		return err.response.data;
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
		return err.response.data;
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
		return err.response.data;
	}
}

export async function addUserService(data) {
	setUserToken();
	try {
		const response = await axios.post(ADD_USER, data);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		return err.response.data;
	}
}
