import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import EventOptions from "./EventOptions";
import { Table, Divider, Tag, Card, Icon, Drawer, Popconfirm } from "antd";
import "./style.css";
import {
	getEventsService,
	deleteEventsService,
	toggleRegistrationsService,
	refreshEventCodeService
} from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import { Link } from "react-router-dom";
import UpdateEvent from "./UpdateEvent";

export default props => {
	const [events, setEvents] = useState([]);
	const [editDrawer, setEditDrawer] = useState(false);
	const [eventId, setEventId] = useState(null);
	const [refresh, toggleRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getEventsService();
				setEvents(data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh]);

	const handleDelete = async id => {
		try {
			const res = await deleteEventsService(id);
			if (res.message === "success") {
				toggleRefresh(!refresh);
				_notification("success", "Success", "Event Deleted");
			} else {
				_notification("warning", "Error", res.message);
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	const handleAddEvent = () => {
		toggleRefresh(!refresh);
	};

	function cancel(e) {
		console.log(e);
	}

	const handleToggleEventStatus = async eventId => {
		try {
			const res = await toggleRegistrationsService({ id: eventId });
			if (res.message === "success") {
				toggleRefresh(!refresh);
				_notification("success", "Success", "Event Status Changed");
			} else {
				_notification("warning", "Error", res.message);
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	const handleChangeAttCode = async eventId => {
		try {
			const res = await refreshEventCodeService({ id: eventId });
			if (res.message === "success") {
				toggleRefresh(!refresh);
				_notification(
					"success",
					"Success",
					"Event Attendance code Changed"
				);
			} else {
				_notification("warning", "Error", res.message);
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Event Name",
			dataIndex: "event_name",
			key: "event_name",
			render: text => (
				<Link
					to="#"
					onClick={() => {
						setEditDrawer(true);
						setEventId(text[1]);
					}}
				>
					{text[0]}
				</Link>
			)
		},
		{
			title: "Venue",
			dataIndex: "venue",
			key: "venue"
		},
		{
			title: "Timings",
			dataIndex: "time",
			key: "time"
		},
		{
			title: "Start Date",
			dataIndex: "startDate",
			key: "startDate"
		},
		{
			title: "End Date",
			dataIndex: "endDate",
			key: "endDate"
		},
		{
			title: "Attendance code",
			dataIndex: "code",
			key: "code",
			render: code => (
				<>
					<Tag color="green" key={code[0]}>
						{code[0]}
					</Tag>
					<Popconfirm
						title="Do you want refresh the event attendance code?"
						onConfirm={() => handleChangeAttCode(code[1])}
						onCancel={cancel}
						okText="Yes"
						cancelText="No"
					>
						<Icon type="redo" />
					</Popconfirm>
				</>
			)
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: status => {
				return (
					<>
						<Tag color="blue" key={status[0]}>
							{status[0] ? "Open" : "Closed"}
						</Tag>
						<Popconfirm
							title="Do you want to toggle the event status?"
							onConfirm={() => handleToggleEventStatus(status[1])}
							onCancel={cancel}
							okText="Yes"
							cancelText="No"
						>
							<Icon type="redo" />
						</Popconfirm>
					</>
				);
			}
		},
		{
			title: "Registration",
			dataIndex: "reg",
			key: "reg",
			render: reg => {
				let val = reg ? "Required" : "Not required";
				return (
					<Tag color="orange" key={reg}>
						{val}
					</Tag>
				);
			}
		},
		{
			title: "Action",
			key: "action",
			dataIndex: "action",
			render: _id => (
				<span>
					<Link
						to="#"
						onClick={() => {
							setEditDrawer(true);
							setEventId(_id);
						}}
					>
						<Icon type="edit" style={{ color: "#F4B400" }} />
					</Link>
					<Divider type="vertical" />
					<Popconfirm
						title="Are you sure delete this event?"
						onConfirm={() => handleDelete(_id)}
						onCancel={cancel}
						okText="Yes"
						cancelText="No"
					>
						<Icon style={{ color: "#DB4437" }} type="delete" />
					</Popconfirm>
				</span>
			)
		}
	];

	const data = events
		? events.map((event, id) => {
				const {
					_id,
					title,
					venue,
					// description,
					startDate,
					endDate,
					time,
					code,
					isRegistrationRequired,
					isRegistrationOpened
				} = event;
				return {
					index: ++id,
					key: _id,
					event_name: [title, _id],
					venue,
					time,
					startDate: new Date(startDate).toDateString(),
					endDate: new Date(endDate).toDateString(),
					code: [code, _id],
					status: [isRegistrationOpened, _id],
					reg: isRegistrationRequired,
					action: _id
				};
		  })
		: null;

	const handleUpdateEvent = () => {
		toggleRefresh(!refresh);
		setEditDrawer(false);
	};

	return (
		<>
			<PageTitle title="Events" />

			<div className="table-wrapper-card">
				<EventOptions onAddEvent={handleAddEvent} />
				<Card style={{ padding: 0, width: "100%", overflowX: "auto" }}>
					<Table
						loading={isLoading}
						columns={columns}
						dataSource={data}
					/>
				</Card>
			</div>

			<Drawer
				title="Update Event Information"
				placement="right"
				closable={true}
				width="40%"
				destroyOnClose={true}
				onClose={() => setEditDrawer(false)}
				visible={editDrawer}
			>
				<UpdateEvent
					eventId={eventId}
					onUpdateEvent={handleUpdateEvent}
				/>
			</Drawer>
		</>
	);
};
