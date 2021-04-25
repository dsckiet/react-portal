import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import {
	Table,
	Divider,
	Tag,
	Card,
	Icon,
	Popconfirm,
	Select,
	Input
} from "antd";
import "./style.css";
import {
	getUsersService,
	toggleWebsiteSeen,
	getRole,
	toggleUserRevoke,
	deleteUser,
	editService
} from "../../utils/services";
import { AiOutlineClose } from "react-icons/ai";
import { _notification } from "../../utils/_helpers";
import UserOptions from "./UserOptions";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserProfile from "./UserProfile";

const StyledTable = styled(Table)`
	.websiteShow {
		display: ${props => (props.role === "lead" ? "normal" : "none")};
	}
	.userAction {
		display: ${props => (props.role === "lead" ? "normal" : "none")};
	}
`;

const TeamList = props => {
	const [users, setUsers] = useState([]);
	const [refresh, toggleRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [uid, setUID] = useState(null);
	const [profileModal, setProfileModal] = useState(false);
	const [userData] = useState(getRole());
	const [editRole, setEditRole] = useState(null);
	const [editDesignation, setEditDesignation] = useState(null);
	const [newDesignation, setNewDesignation] = useState(null);
	const [branchOptions, setBranchOptions] = useState([]);
	const [yearOptions, setYearOptions] = useState([]);

	const { Option } = Select;

	useEffect(() => {
		let arrayBranches = [];
		let arrayYears = [];
		(async () => {
			setIsLoading(true);
			try {
				let params = {
					sortBy: "name"
				};
				const { data } = await getUsersService(params);
				setUsers(data);
				data.map(item => {
					if (
						item.branch &&
						!arrayBranches.filter(
							branch => branch.text === item.branch
						).length
					) {
						arrayBranches.push({
							text: item.branch,
							value: item.branch
						});
					}
					if (
						item.year &&
						!arrayYears.filter(year => year.text === item.year)
							.length
					) {
						arrayYears.push({
							text: String(item.year),
							value: String(item.year)
						});
					}
					return null;
				});
				setBranchOptions(arrayBranches);
				setYearOptions(arrayYears);
				console.log(arrayBranches, arrayYears);

				//setUsers(data.filter(checkLoggedInUser));

				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	// const checkLoggedInUser = user => {
	// 	if (user._id !== userData.id) return user;
	// };

	const handleAddMember = () => {
		toggleRefresh(!refresh);
	};

	const handleEdit = async val => {
		if (editRole) {
			try {
				const res = await editService(editRole, { role: val });
				if (!res.error && res.message === "success") {
					_notification(
						"success",
						"Success",
						"Role changed successfully !"
					);
					toggleRefresh(!refresh);
				}
			} catch (err) {
				_notification("error", "Error", err.message);
			}
			setEditRole(null);
		}
		if (editDesignation) {
			try {
				const res = await editService(editDesignation, {
					designation: val
				});
				if (!res.error && res.message === "success") {
					_notification(
						"success",
						"Success",
						"Designation changed successfully !"
					);
					toggleRefresh(!refresh);
				}
			} catch (err) {
				_notification("error", "Error", err.message);
			}
			setEditDesignation(null);
		}
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
				<Link to="#" onClick={() => handleHover(true, profile[1])}>
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
			title: "Branch",
			dataIndex: "branch",
			key: "branch",
			filters: branchOptions,
			onFilter: (value, record) => record.branch.indexOf(value) === 0
		},
		{
			title: "Year",
			dataIndex: "year",
			key: "year",
			filters: yearOptions,
			onFilter: (value, record) =>
				String(record.year).indexOf(String(value)) === 0
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			filters: [
				{ text: "Lead", value: "lead" },
				{ text: "Core", value: "core" },
				{ text: "Member", value: "member" }
			],
			onFilter: (value, record) => record.role.indexOf(value) === 0,
			render: role => (
				<>
					{role[1] === editRole ? (
						<Select
							size="small"
							defaultValue={role[0]}
							label="Role"
							name="role"
							style={{ marginRight: "10px", width: "75%" }}
							onChange={val => handleEdit(val)}
						>
							<Option value="lead" disabled>
								Lead
							</Option>
							<Option value="core">Core</Option>
							<Option value="member">Member</Option>
						</Select>
					) : (
						<Tag
							color={
								role[0] === "lead"
									? "red"
									: role[0] === "core"
									? "geekblue"
									: "orange"
							}
							className={
								userData.role === "lead" ? "w-lead" : "w-else"
							}
						>
							{role[0]}
						</Tag>
					)}

					{userData.role === "lead" && role[0] !== "lead" ? (
						<>
							{editRole && editRole === role[1] ? (
								<AiOutlineClose
									style={{ cursor: "pointer" }}
									onClick={() => {
										setEditRole(null);
									}}
								/>
							) : (
								<Popconfirm
									title="Do you want to edit Roles?"
									okText="Yes"
									cancelText="No"
									onConfirm={() => {
										if (editDesignation) {
											setEditDesignation(null);
										}
										setEditRole(role[1]);
									}}
								>
									<Icon
										type="edit"
										style={{
											color: `${
												role[0] === "lead"
													? "#F5222D"
													: role[0] === "core"
													? "#5A85EF"
													: "#FA8C16"
											}`,
											cursor: "pointer"
										}}
									/>
								</Popconfirm>
							)}

							<Divider type="vertical" />
						</>
					) : null}
				</>
			)
		},
		{
			title: "Show on website",
			dataIndex: "show",
			key: "show",
			className: "websiteShow",
			render: show => (
				<>
					<Tag
						color={show[0] ? "green" : "red"}
						style={{
							textAlign: "center",
							width: "70%",
							textTransform: "capitalize"
						}}
					>
						{show[0] ? "Shown" : "Not shown"}
					</Tag>
					<Popconfirm
						title="Do you want to toggle website seen?"
						onConfirm={() => handleChangeWebsiteSeen(show[1])}
						okText="Yes"
						cancelText="No"
					>
						<Icon type="redo" />
					</Popconfirm>
					<Divider type="vertical" />
				</>
			)
		},
		{
			title: "Designation",
			dataIndex: "designation",
			key: "designation",
			render: designation => (
				<>
					{editDesignation === designation[1] ? (
						<Input
							size="small"
							name="designation"
							defaultValue={designation[0]}
							onChange={e => setNewDesignation(e.target.value)}
							onPressEnter={() => {
								if (newDesignation !== "")
									handleEdit(newDesignation);
							}}
						/>
					) : (
						<span>{designation[0]}</span>
					)}
				</>
			)
		},
		{
			title: "",
			key: "designationEdit",
			dataIndex: "designation",
			render: designation =>
				userData.role === "lead" ? (
					<>
						{editDesignation &&
						editDesignation === designation[1] ? (
							<AiOutlineClose
								style={{ cursor: "pointer" }}
								onClick={() => {
									setEditDesignation(null);
								}}
							/>
						) : (
							<Popconfirm
								title="Do you want to change Designation ?"
								okText="Yes"
								cancelText="No"
								onConfirm={() => {
									if (editRole) {
										setEditRole(null);
									}
									setEditDesignation(designation[1]);
								}}
							>
								<Icon
									type="edit"
									style={{
										cursor: "pointer",
										color: "#FA8C16"
									}}
								/>
							</Popconfirm>
						)}
						<Divider type="vertical" />
					</>
				) : null
		},

		{
			title: "Action",
			key: "action",
			dataIndex: "action",
			className: "userAction",
			render: action =>
				action[2] !== "lead" ? (
					<span>
						<Popconfirm
							title="Do you want to toggle user revoke?"
							onConfirm={() => handleUserRevoke(action[1])}
							okText="Yes"
							cancelText="No"
						>
							{action[0] ? (
								<Icon
									type="close"
									style={{ color: "#F4B400" }}
								/>
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
				) : null
		}
	];

	const data = users
		? users.map((user, id) => {
				const {
					_id,
					name,
					email,
					branch,
					year,
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
					branch: branch ? branch : "N/A",
					year: year ? year : "N/A",
					role: [role, _id],
					designation: [designation, _id],
					isRevoked,
					show: [showOnWebsite, _id],
					action: [isRevoked, _id, role]
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
