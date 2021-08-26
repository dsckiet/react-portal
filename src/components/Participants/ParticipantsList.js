import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import ParticipantsOptions from "./ParticipantsOptions";
import ParticipantDetail from "./ParticipantDetail";
import { Table, Card, Drawer, Popconfirm, Divider } from "antd";
import Icon from "@ant-design/icons";
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
	const [eId, setEID] = useState(null);
	const [refresh, toggleRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [branch, setBranch] = useState(null);
	const [year, setYear] = useState(null);
	const [query, setQuery] = useState(null);
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
				setBranch(null);
				setYear(null);
				setEID(null);
			} else {
				setEID(id);
				let params = { eid: id };
				if (branch) params = { ...params, branch };
				if (year) params = { ...params, year };
				const { data } = await getParticipantsService(params);
				setParticipants(data.participants);
			}
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
		}
	};

	const handleQuery = async val => {
		setQuery(val);
		setIsLoading(true);
		try {
			let params = { eid: eId, query: val, branch, year };
			const { data } = await getParticipantsService(params);
			setParticipants(data.participants);
			setIsLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
		}
	};

	const handleBranchChange = async val => {
		setIsLoading(true);
		setBranch(val);
		try {
			let params = { branch: val };
			if (year) params = { ...params, year };
			if (query) params = { ...params, query };
			if (eId) params = { ...params, eid: eId };
			const { data } = await getParticipantsService(params);
			setParticipants(data.participants);
			setIsLoading(false);
		} catch (error) {
			_notification("warning", "Error", error.message);
		}
	};

	const handleYearChange = async val => {
		setIsLoading(true);
		setYear(val);
		try {
			let params = { year: val };
			if (branch) params = { ...params, branch };
			if (query) params = { ...params, query };
			if (eId) params = { ...params, eid: eId };
			const { data } = await getParticipantsService(params);
			setParticipants(data.participants);
			setIsLoading(false);
		} catch (error) {
			_notification("warning", "Error", error.message);
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
			title: "Name",
			dataIndex: "name",
			key: "name",
			sorter: (a, b) => a.name[0].localeCompare(b.name[0]),
			sortDirections: ["descend"],
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
			sorter: (a, b) => a.branch.localeCompare(b.branch)
		},
		{
			title: "Year",
			dataIndex: "year",
			key: "year",
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

	return (
		<>
			<PageTitle title="Participants" bgColor="#4285F4" />

			<div className="table-wrapper-card">
				<ParticipantsOptions
					onEventChange={handleEventChange}
					onQuery={handleQuery}
					onBranchChange={handleBranchChange}
					onYearChange={handleYearChange}
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
