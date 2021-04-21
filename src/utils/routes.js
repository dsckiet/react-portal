/** USERS MODULE **/
export const ADD_USER = "/users"; // POST
export const LOGIN = "/users/login"; // POST
export const FORGOTPASS = "/users/forgot"; // POST
export const RESETPASS = "/users/reset"; // POST
// @queryParams userId
export const UPDATE_USER = "/users/5deab2193026f30ec826a0cc"; // PUT
export const TOGGLE_WEBSITE_SEEN = "/users/approve";
export const TOGGLE_REVOKE = "/users/revoke";
export const DELETE_USER = "/users";
// @queryParams userId
export const GET_PROFILE = "/users/profile"; // GET
export const UPDATE_PROFILE = "/users/profile"; // POST
export const VIEW_USERS = "/users"; // GET

/** EVENTS MODULE : PARTICIPANTS **/
export const REGISTER_PARTICIPANT = "/events/participants/"; // POST
export const LOGIN_PARTICIPANT = "/events/participants/login"; // POST
export const REGISTER_FOR_EVENT = "/events/register"; // POST
export const UPDATE_PARTICIPANT = "/events/participants"; // PUT
export const DELETE_PARTICIPANT = "/events/participants"; //DELETE
export const REVOKE_PARTICIPANT = "/events/participants/revoke"; //PUT
export const GET_PARTICIPANT_DETAILS = "/events/participants/profile"; // GET
// ?participantId=5e6bc1dec3988900640bd922
export const GET_PARTICIPANTS = "/events/participants"; // GET
// ?query=ritik&eventId=5e6dfb7caad4441a9ceb5b2e

/** EVENTS MODULE : EVENTS **/
export const GET_EVENTS = "/events"; // GET
export const GET_EVENT = "/events"; // GET
export const ADD_EVENT = "/events/"; // POST
export const CHANGE_EVENT_CODE = "/events/change-code"; // POST
export const TOGGLE_REGISTRATION = "/events/toggle-reg"; // POST
export const UPDATE_EVENT = "/events"; // PUT
export const DELETE_EVENT = "/events"; // DELETE

/** ATTENDANCE MODULE **/
export const MARK_ATTENDANCE = "/events/attendance/mark"; // POST
export const GET_ATTENDANCE_REPORT =
	"/events/attendance/report?query=ritik&sortBy[0]=branch&sortBy[1]=year&event=5e6dfb7caad4441a9ceb5b2e"; // GET
export const EVENT_ATTENDANCE_STATS =
	"/events/attendance/stats?event=5e6dfb7caad4441a9ceb5b2e"; // GET
export const PARTICIPANT_EVENT_ATTENDANCE =
	"/events/attendance/user?event=5e6df19c16ea1e3a9c5a508b&attendance=5e6df287aa68b63e48201e11"; // GET

/**CERTIFICATE MODULE**/
export const PREVIEW_CERTIFICATE = "/events/certificate/preview"; // POST
export const ADD_CERTIFICATE = "/events/certificate"; // POST
