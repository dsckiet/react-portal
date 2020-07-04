import EventsList from "../components/Events/EventsList";
import Dashboard from "../components/Layout/Dashboard";
import TeamList from "../components/Team/TeamList";
import ParticipantsList from "../components/Participants/ParticipantsList";
import AddCertificate from "./../components/Certificates/AddCertificate";

let routes = [
	{
		path: "/",
		exact: true,
		name: "Dashboard",
		component: Dashboard,
		key: "dashboard",
		icon: "appstore",
		description: "List of all the events",
		color: "#F4B400"
	},
	{
		path: "/events",
		exact: true,
		component: EventsList,
		name: "Events",
		key: "events",
		icon: "calendar",
		description: "List of all the events",
		color: "#DB4437"
	},
	{
		path: "/participants",
		exact: true,
		component: ParticipantsList,
		name: "Participants",
		key: "participants",
		icon: "team",
		description: "List of all the participants",
		color: "#4285F4"
	},
	{
		path: "/team",
		exact: true,
		component: TeamList,
		name: "Team",
		key: "team",
		icon: "team",
		description: "List of all the members",
		color: "#0F9D58"
	},
	{
		path: "/certificate",
		exact: true,
		component: AddCertificate,
		name: "Certificates",
		key: "certificates",
		icon: "file",
		description: "Add certificates for Events",
		color: "#F4B400"
	}
];

export default routes;
