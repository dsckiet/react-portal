import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import ParticipantsOptions from "./ParticipantsOptions";
import ParticipantDetail from "./ParticipantDetail";
import { Table, Card, Drawer, Popconfirm, Divider } from "antd";
import {
	CloseOutlined,
	CheckOutlined,
	DeleteOutlined
} from "@ant-design/icons";
import "./style.css";
import {
	getParticipantsService,
	deleteParticipantServices,
	getRole
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
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const userData = getRole();

	// const [allEvents, setAllEvents] = useState([]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getParticipantsService();
				setAllParticipants(data.participants);
				setParticipants(data.participants);
				setCount(data.totalParticipants);
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
				setCount(data.totalParticipants);
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
				setCount(data.totalParticipants);
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
			setCount(data.totalParticipants);
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
			setCount(data.totalParticipants);
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
			setCount(data.totalParticipants);
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
			title: "#",
			dataIndex: "key",
			key: "key",
			render: (value, item, index) => (page - 1) * 10 + index + 1
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			sorter: (a, b) => a.name[0].localeCompare(b.name[0]),
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
			role: "lead",
			render: action => (
				<span>
					<Popconfirm
						title="Do you want to toggle user revoke?"
						onConfirm={() => handleParticipantRevoke(action[1])}
						okText="Yes"
						cancelText="No"
					>
						{action[0] ? (
							<CloseOutlined style={{ color: "#F4B400" }} />
						) : (
							<CheckOutlined style={{ color: "green" }} />
						)}
					</Popconfirm>
					{userData && userData.role === "lead" ? (
						<>
							<Divider type="vertical" />
							<Popconfirm
								title="Are you sure delete this user?"
								onConfirm={() =>
									handleParticipantDelete(action[1])
								}
								okText="Yes"
								cancelText="No"
							>
								<DeleteOutlined style={{ color: "#DB4437" }} />
							</Popconfirm>
						</>
					) : null}
				</span>
			)
		}
	].filter(
		item =>
			(userData.role !== "lead" && item.role !== "lead") ||
			userData.role === "lead"
	);

	const data = participants
		? participants.map((event, id) => {
				const { _id, name, email, branch, phone, year, isRevoked } =
					event;
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

				<Card
					title={`Total Count: ${count}`}
					style={{ padding: 0, width: "100%", overflowX: "auto" }}
				>
					<Table
						loading={isLoading}
						columns={columns}
						dataSource={data}
						onChange={(d, e) => console.log(d, e)}
						pagination={{
							onChange(current) {
								setPage(current);
							},
							defaultPageSize: 500
						}}
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
