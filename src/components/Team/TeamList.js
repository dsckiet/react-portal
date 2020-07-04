import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { Table, Divider, Tag, Card, Icon, Popconfirm } from "antd";
import "./style.css";
import {
	getUsersService,
	toggleWebsiteSeen,
	getRole,
	toggleUserRevoke,
	deleteUser
} from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import UserOptions from "./UserOptions";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserProfile from "./UserProfile";

const StyledTable = styled(Table)`
	.websiteShow {
		display: ${props => (props.role === "lead" ? "block" : "none")};
	}
	.userAction {
		display: ${props => (props.role === "lead" ? "block" : "none")};
	}
`;

const TeamList = props => {
	const [users, setUsers] = useState([]);
	const [refresh, toggleRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [uid, setUID] = useState(null);
	const [profileModal, setProfileModal] = useState(false);
	const [userData] = useState(getRole());

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

	const handleChangeWebsiteSeen = async userId => {
		try {
			const res = await toggleWebsiteSeen(userId);
			if (res.message === "success") {
				toggleRefresh(!refresh);
				_notification("success", "Success", "Show on website changed");
			} else {
				_notification("warning", "Error", res.message);
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	const handleUserRevoke = async userId => {
		try {
			const res = await toggleUserRevoke(userId);
			if (res.message === "success") {
				toggleRefresh(!refresh);
				_notification("success", "Success", "Toggle User Revoke");
			} else {
				_notification("warning", "Error", res.message);
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	const handleUserDelete = async userId => {
		try {
			const res = await deleteUser(userId);
			if (res.message === "success") {
				toggleRefresh(!refresh);
				_notification("success", "Success", "User deleted");
			} else {
				_notification("warning", "Error", res.message);
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};
	const handleHover = (value, uid) => {
		setProfileModal(value);
		setUID(uid);
	};

	const columns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key"
		},
		{
			title: "Name",
			dataIndex: "profile",
			key: "profile",
			render: profile => (
				<Link
					to="#"
					onClick={() => handleHover(true, profile[1])}
					// onClick={() => {
					// 	setEditDrawer(true);
					// 	setEventId(text[1]);
					// }}
				>
					{profile[0]}
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
			title: "Show on website",
			dataIndex: "show",
			key: "show",
			className: "websiteShow",
			render: show => (
				<>
					<Tag color="green">{show[0] ? "Shown" : "Not shown"}</Tag>
					<Popconfirm
						title="Do you want to toggle website seen?"
						onConfirm={() => handleChangeWebsiteSeen(show[1])}
						okText="Yes"
						cancelText="No"
					>
						<Icon type="redo" />
					</Popconfirm>
				</>
			)
		},
		{
			title: "Designation",
			dataIndex: "designation",
			key: "designation"
		},
		{
			title: "Action",
			key: "action",
			dataIndex: "action",
			className: "userAction",
			render: action => (
				<span>
					<Popconfirm
						title="Do you want to toggle user revoke?"
						onConfirm={() => handleUserRevoke(action[1])}
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
						onConfirm={() => handleUserDelete(action[1])}
						okText="Yes"
						cancelText="No"
					>
						<Icon style={{ color: "#DB4437" }} type="delete" />
					</Popconfirm>
				</span>
			)
		}
	];

	const data = users
		? users.map((user, id) => {
				const {
					_id,
					name,
					email,
					role,
					designation,
					showOnWebsite,
					isRevoked
				} = user;
				return {
					key: ++id,
					_id,
					profile: [name, _id],
					email,
					role,
					designation,
					isRevoked,
					show: [showOnWebsite, _id],
					action: [isRevoked, _id]
				};
		  })
		: null;

	return (
		<>
			<PageTitle title="Team" bgColor="#0F9D58" />

			<div className="table-wrapper-card">
				<UserOptions onAddMember={handleAddMember} />

				<Card style={{ padding: 0, width: "100%", overflowX: "auto" }}>
					<StyledTable
						loading={isLoading}
						columns={columns}
						dataSource={data}
						role={userData.role}
					/>
				</Card>
			</div>
			<UserProfile
				openProfile={handleHover}
				visible={profileModal}
				uid={uid}
			/>
		</>
	);
};

export default TeamList;
