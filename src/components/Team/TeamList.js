import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { Table, Divider, Tag, Card, Icon, Drawer, Popconfirm } from "antd";
import "./style.css";
import { getUsersService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import UserOptions from "./UserOptions";
import { Link } from "react-router-dom";

export default props => {
	const [users, setUsers] = useState([]);
	// const [editDrawer, setEditDrawer] = useState(false);
	// const [eventId, setEventId] = useState(null);
	const [refresh, toggleRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getUsersService();
				setUsers(data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh]);

	const handleAddMember = () => {
		toggleRefresh(!refresh);
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
					// onClick={() => {
					// 	setEditDrawer(true);
					// 	setEventId(text[1]);
					// }}
				>
					{text}
				</Link>
			)
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			render: role => <Tag color="geekblue">{role}</Tag>
		},
		{
			title: "Designation",
			dataIndex: "designation",
			key: "designation"
		}
	];

	const data = users
		? users.map((user, id) => {
				const { _id, name, email, role, designation } = user;
				return {
					index: ++id,
					name,
					email,
					role,
					designation
				};
		  })
		: null;

	return (
		<>
			<PageTitle title="Events" />

			<div className="table-wrapper-card">
				<UserOptions onAddMember={handleAddMember} />
				<Card style={{ padding: 0, width: "100%", overflowX: "auto" }}>
					<Table
						loading={isLoading}
						columns={columns}
						dataSource={data}
					/>
				</Card>
			</div>
		</>
	);
};
