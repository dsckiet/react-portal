import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import ParticipantsOptions from "./ParticipantsOptions";
import ParticipantDetail from "./ParticipantDetail";
import { Table, Card, Drawer } from "antd";
import "./style.css";
import { getParticipantsService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import { Link } from "react-router-dom";

export default props => {
	const [participants, setParticipants] = useState([]);
	const [viewDrawer, setViewDrawer] = useState(false);
	const [participantId, setParticipantId] = useState(null);
	const [eventId, setEventId] = useState(null);
	// const [refresh, toggleRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const [allEvents, setAllEvents] = useState([]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getParticipantsService();
				// console.log(data);
				setParticipants(data.participants);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	const handleEventChange = async id => {
		setEventId(id);
		setIsLoading(true);
		try {
			let params = { eventId: id };
			const { data } = await getParticipantsService(params);
			setParticipants(data.participants);
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
			setParticipants(data.participants);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
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
			key: "branch"
		},
		{
			title: "Year",
			dataIndex: "year",
			key: "year"
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone"
		}
	];

	const data = participants
		? participants.map((event, id) => {
				const { _id, name, email, branch, phone, year } = event;
				return {
					index: ++id,
					key: _id,
					name: [name, _id],
					email,
					branch,
					year,
					phone
				};
		  })
		: null;

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
