import EventsList from "../components/Events/EventsList";
import Dashboard from "../components/Layout/Dashboard";

let routes = [
	{
		path: "/",
		exact: true,
		name: "Dashboard",
		component: Dashboard,
		key: "dashboard",
		icon: "appstore"
	},
	{
		path: "/events",
		exact: true,
		component: EventsList,
		name: "Events",
		key: "events",
		icon: "calendar"
	},
	{
		path: "/participants",
		exact: true,
		component: EventsList,
		name: "Participants",
		key: "participants",
		icon: "team"
	}
];

export default routes;
