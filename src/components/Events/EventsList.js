import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import EventOptions from "./EventOptions";
import { Table, Divider, Tag, Card, Icon, Drawer, Popconfirm } from "antd";
import "./style.css";
import { getEventsService, deleteEventsService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import { Link } from "react-router-dom";
import UpdateEvent from "./UpdateEvent";

export default props => {
	const [events, setEvents] = useState([]);
	const [editDrawer, setEditDrawer] = useState(false);
	const [eventId, setEventId] = useState(null);
	const [refresh, toggleRefresh] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getEventsService();
				setEvents(data);
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

	const columns = [
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
			title: "Time",
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
				<Tag color="green" key={code}>
					{code}
				</Tag>
			)
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: status => {
				let val = status ? "Open" : "Closed";
				return (
					<Tag color="blue" key={status}>
						{val}
					</Tag>
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
		? events.map(event => {
				const {
					_id,
					title,
					venue,
					description,
					startDate,
					endDate,
					time,
					code,
					isRegistrationRequired,
					isRegistrationOpen
				} = event;
				return {
					key: _id,
					event_name: [title, _id],
					venue,
					time,
					startDate: new Date(startDate).toDateString(),
					endDate: new Date(endDate).toDateString(),
					code,
					status: isRegistrationOpen,
					reg: isRegistrationRequired,
					action: _id
				};
		  })
		: null;

	return (
		<>
			<PageTitle title="Events" />

			<div className="table-wrapper-card">
				<EventOptions onAddEvent={handleAddEvent} />
				<Card style={{ padding: 0, width: "100%", overflowX: "auto" }}>
					<Table columns={columns} dataSource={data} />
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
				<UpdateEvent eventId={eventId} />
			</Drawer>
		</>
	);
};
