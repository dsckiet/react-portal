import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import ParticipantsOptions from "./ParticipantsOptions";
import ParticipantDetail from "./ParticipantDetail";
import { Table, Card, Drawer, Popconfirm, Icon, Divider } from "antd";
import "./style.css";
import {
	getParticipantsService,
	deleteParticipantServices
} from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import { Link } from "react-router-dom";
import { revokeParticipantServices } from "./../../utils/services";

const ParticipantsList = props => {
	const [participants, setParticipants] = useState([]);
	const [allParticipants, setAllParticipants] = useState([]);
	const [viewDrawer, setViewDrawer] = useState(false);
	const [participantId, setParticipantId] = useState(null);
	const [eventId, setEventId] = useState(null);
	const [refresh, toggleRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const [allEvents, setAllEvents] = useState([]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getParticipantsService();
				setAllParticipants(data.participants);
				setParticipants(data.participants);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh]);

	const handleEventChange = async id => {
		setIsLoading(true);
		try {
			if (id === "All") {
				setParticipants(allParticipants);
			} else {
				setEventId(id);
				let params = { eid: id };
				const { data } = await getParticipantsService(params);
				setParticipants(data.participants);
			}
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
		}
	};

	const handleQuery = async val => {
		setIsLoading(true);
		try {
			let params = { eventId, query: val };
			const { data } = await getParticipantsService(params);
			// setParticipants(data.participants);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
		}
	};

	const handleParticipantRevoke = async id => {
		try {
			const res = await revokeParticipantServices(id);
			if (res.message === "success") {
				toggleRefresh(!refresh);
				_notification(
					"success",
					"Success",
					"Toggle Participant Revoke"
				);
			} else {
				_notification("warning", "Error", res.message);
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	const handleParticipantDelete = async id => {
		try {
			const res = await deleteParticipantServices(id);
			if (res.message === "success") {
				toggleRefresh(!refresh);
				_notification("success", "Success", "Participant deleted");
			} else {
				_notification("warning", "Error", res.message);
			}
		} catch (error) {
			_notification("error", "Error", error.message);
		}
	};

	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: text => (
				<Link
					to="#"
					onClick={() => {
						setViewDrawer(true);
						setParticipantId(text[1]);
					}}
				>
					{text[0]}
				</Link>
			)
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Branch",
			dataIndex: "branch",
			key: "branch",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.branch.length - b.branch.length
		},
		{
			title: "Year",
			dataIndex: "year",
			key: "year",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.year - b.year
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone"
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: action => (
				<span>
					<Popconfirm
						title="Do you want to toggle user revoke?"
						onConfirm={() => handleParticipantRevoke(action[1])}
						okText="Yes"
						cancelText="No"
					>
						{action[0] ? (
							<Icon type="close" style={{ color: "#F4B400" }} />
						) : (
							<Icon type="check" style={{ color: "green" }} />
						)}
					</Popconfirm>
					<Divider type="vertical" />
					<Popconfirm
						title="Are you sure delete this user?"
						onConfirm={() => handleParticipantDelete(action[1])}
						okText="Yes"
						cancelText="No"
					>
						<Icon style={{ color: "#DB4437" }} type="delete" />
					</Popconfirm>
				</span>
			)
		}
	];

	const data = participants
		? participants.map((event, id) => {
				const {
					_id,
					name,
					email,
					branch,
					phone,
					year,
					isRevoked
				} = event;
				return {
					index: ++id,
					key: _id,
					name: [name, _id],
					email,
					branch,
					year,
					phone,
					action: [isRevoked, _id]
				};
		  })
		: null;

	console.log(data);

	return (
		<>
			<PageTitle title="Participants" />

			<div className="table-wrapper-card">
				<ParticipantsOptions
					onEventChange={handleEventChange}
					onQuery={handleQuery}
				/>
				<Card style={{ padding: 0, width: "100%", overflowX: "auto" }}>
					<Table
						loading={isLoading}
						columns={columns}
						dataSource={data}
					/>
				</Card>
			</div>

			<Drawer
				title="Participant Information"
				placement="right"
				closable={true}
				width="40%"
				destroyOnClose={true}
				onClose={() => setViewDrawer(false)}
				visible={viewDrawer}
			>
				<ParticipantDetail participantId={participantId} />
			</Drawer>
		</>
	);
};

export default ParticipantsList;
