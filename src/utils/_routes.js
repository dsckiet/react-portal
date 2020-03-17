import EventsList from "../components/Events/EventsList";
import Dashboard from "../components/Layout/Dashboard";
import TeamList from "../components/Team/TeamList";

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
	},
	{
		path: "/team",
		exact: true,
		component: TeamList,
		name: "Team",
		key: "team",
		icon: "team"
	}
];

export default routes;
