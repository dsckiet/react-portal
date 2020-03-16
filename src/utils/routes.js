/** USERS MODULE **/
export const ADD_USER = "/users"; // POST
export const LOGIN = "/users/login"; // POST
// @queryParams userId
export const UPDATE_USER = "/users/5deab2193026f30ec826a0cc"; // PUT
// @queryParams userId
export const VIEW_PROFILE = "/users/profile/?id=5deab2193026f30ec826a0cc"; // GET
export const UPDATE_PROFILE = "/users/profile/?id=5deab2193026f30ec826a0cc"; // POST
export const VIEW_USERS = "/users?sortBy=createdAt&sortType=asc"; // GET

/** EVENTS MODULE : PARTICIPANTS **/
export const REGISTER_PARTICIPANT = "/events/register_part"; // POST
export const LOGIN_PARTICIPANT = "/events/part_login"; // POST
export const REGISTER_FOR_EVENT = "/events/register_in_event"; // POST
export const UPDATE_PARTICIPANT =
	"/events/update_part/5e6a67b4890fda16986ae843"; // PUT
export const PARTICIPANT_DETAILS =
	"/events/part_data?participantId=5e6bc1dec3988900640bd922"; // GET
export const PARTICIPANT_DETAILS_BY_LEAD =
	"/events/get_part?query=ritik&eventId=5e6dfb7caad4441a9ceb5b2e"; // GET

/** EVENTS MODULE : EVENTS **/
export const GET_EVENTS = "/events/get_events"; // GET
export const ADD_EVENT = "/events/add_event"; // POST
export const CHANGE_EVENT_CODE = "/events/change_event_code"; // POST
export const TOGGLE_REGISTRATION = "/events/event_regist_open"; // POST
export const UPDATE_EVENT = "/events/update_event/5e6df96455067836bc991d6a"; // PUT
export const DELETE_EVENT = "/events/delete_event"; // DELETE

/** ATTENDANCE MODULE **/
export const MARK_ATTENDANCE = "/events/mark_attend"; // POST
export const GET_ATTENDANCE_REPORT =
	"/events/get_attend_report?query=ritik&sortBy[0]=branch&sortBy[1]=year&event=5e6dfb7caad4441a9ceb5b2e"; // GET
export const EVENT_ATTENDANCE_STATS =
	"/events/get_attend_stats?event=5e6dfb7caad4441a9ceb5b2e"; // GET
export const PARTICIPANT_EVENT_ATTENDANCE =
	"/events/get_user_attend?event=5e6df19c16ea1e3a9c5a508b&attendance=5e6df287aa68b63e48201e11"; // GET
