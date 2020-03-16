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
	}
];

export default routes;
