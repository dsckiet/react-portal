import EventsList from "../components/Events/EventsList";
import Dashboard from "../components/Layout/Dashboard";
import TeamList from "../components/Team/TeamList";
//import ParticipantsList from "../components/Participants/ParticipantsList";
//import AddCertificate from "./../components/Certificates/AddCertificate";
import Profile from "../components/Profile/Profile";
import {
	AiOutlineAppstore,
	AiOutlineSmile,
	AiOutlineTeam
	//AiOutlineUsergroupAdd
} from "react-icons/ai";
import { MdEvent } from "react-icons/md";
//import { RiContactsLine } from "react-icons/ri";
//import ManageGroups from "../components/Groups/ManageGroups";

let routes = [
	{
		path: "/",
		exact: true,
		name: "Dashboard",
		component: Dashboard,
		key: "dashboard",
		icon: AiOutlineAppstore,
		description: "List of all the events",
		color: "#F4B400"
	},
	{
		path: "/events",
		exact: true,
		component: EventsList,
		name: "Events",
		key: "events",
		description: "List of all the events",
		color: "#DB4437",
		icon: MdEvent
	},
	// {
	// 	path: "/participants",
	// 	exact: true,
	// 	component: ParticipantsList,
	// 	name: "Participants",
	// 	key: "participants",
	// 	icon: RiContactsLine,
	// 	description: "List of all the participants",
	// 	color: "#4285F4"
	// },
	{
		path: "/team",
		exact: true,
		component: TeamList,
		name: "Team",
		key: "team",
		icon: AiOutlineTeam,
		description: "List of all the members",
		color: "#0F9D58"
	},
	// {
	// 	path: "/certificate",
	// 	exact: true,
	// 	component: AddCertificate,
	// 	name: "Certificates",
	// 	key: "certificates",
	// 	icon: "file",
	// 	description: "Add certificates for Events",
	// 	color: "#F4B400"
	// },
	// {
	// 	path: "/groups",
	// 	exact: true,
	// 	component: ManageGroups,
	// 	name: "Groups",
	// 	key: "groups",
	// 	icon: AiOutlineUsergroupAdd,
	// 	description: "Manage Groups",
	// 	color: "#DB4437"
	// },
	{
		path: "/profile",
		exact: true,
		component: Profile,
		name: "Profile",
		key: "profile",
		icon: AiOutlineSmile,
		description: "Your Profile",
		color: "#F4B400"
	}
];

export default routes;
