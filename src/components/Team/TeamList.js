import React, { useEffect, useState, useRef } from "react";
import PageTitle from "../Layout/PageTitle";
import {
	Table,
	Divider,
	Tag,
	Card,
	Popconfirm,
	Select,
	Input,
	Button,
	Space
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
import {
	AiOutlineClose,
	AiOutlineSearch,
	AiOutlineEdit,
	AiOutlineRedo,
	AiOutlineCheck,
	AiOutlineDelete
} from "react-icons/ai";
import Highlighter from "react-highlight-words";
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
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const ref = useRef();

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
						!arrayYears.filter(
							year => year.text === String(item.year)
						).length
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

	const getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={ref}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						size="small"
						onClick={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						icon={
							<AiOutlineSearch style={{ marginRight: "8px" }} />
						}
						style={{
							width: 90,
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						Search
					</Button>
					<Button
						onClick={() => handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: filtered => (
			<div
				style={{
					height: "100%",
					justifyContent: "center",
					display: "flex",
					alignItems: "center"
				}}
			>
				<AiOutlineSearch
					style={{
						color: filtered ? "#1890ff" : undefined,
						fontSize: "16px"
					}}
				/>
			</div>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
				: "",
		render: text =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			)
	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = clearFilters => {
		clearFilters();
		setSearchText(" ");
	};

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
			...getColumnSearchProps("name"),
			render: profile => (
				<Link to="#" onClick={() => handleHover(true, profile[1])}>
					{profile[0]}
				</Link>
			)
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			...getColumnSearchProps(`email`)
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
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center"
					}}
				>
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
								{role[2] &&
								Number(role[2]) === new Date().getFullYear() &&
								new Date().getMonth() >= 4 ? (
									<Option value="graduate">Graduate</Option>
								) : null}
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
									userData.role === "lead"
										? "w-lead"
										: "w-else"
								}
							>
								{role[0]}
							</Tag>
						)}

						{userData.role === "lead" && role[0] !== "lead" ? (
							<>
								{editRole && editRole === role[1] ? (
									<AiOutlineClose
										style={{
											cursor: "pointer",
											fontSize: "16px"
										}}
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
										<AiOutlineEdit
											type="edit"
											style={{
												fontSize: "16px",
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
				</div>
			)
		},
		{
			title: "Show on website",
			dataIndex: "show",
			key: "show",
			className: "websiteShow",
			filters: [
				{ text: "Shown", value: true },
				{ text: "Not Shown", value: false }
			],
			onFilter: (value, record) => record.show.indexOf(value) === 0,
			render: show => (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center"
					}}
				>
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
							<AiOutlineRedo
								style={{ cursor: "pointer", fontSize: "16px" }}
							/>
						</Popconfirm>
						<Divider type="vertical" />
					</>
				</div>
			)
		},
		{
			title: "Designation",
			dataIndex: "designation",
			key: "designation",
			...getColumnSearchProps("designation"),
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
			title: "Action",
			key: "action",
			dataIndex: "action",
			className: "userAction",
			render: action => (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center"
					}}
				>
					<>
						{userData.role === "lead" ? (
							<>
								{editDesignation &&
								editDesignation === action[1] ? (
									<AiOutlineClose
										style={{
											cursor: "pointer",
											fontSize: "16px"
										}}
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
											setEditDesignation(action[1]);
										}}
									>
										<AiOutlineEdit
											type="edit"
											style={{
												fontSize: "16px",
												cursor: "pointer",
												color: "#FA8C16"
											}}
										/>
									</Popconfirm>
								)}
								<Divider type="vertical" />
							</>
						) : null}
						{action[2] !== "lead" ? (
							<>
								<Popconfirm
									title="Do you want to toggle user revoke?"
									onConfirm={() =>
										handleUserRevoke(action[1])
									}
									okText="Yes"
									cancelText="No"
								>
									{action[0] ? (
										<AiOutlineClose
											type="close"
											style={{
												fontSize: "16px",
												color: "#F4B400",
												cursor: "pointer"
											}}
										/>
									) : (
										<AiOutlineCheck
											type="check"
											style={{
												fontSize: "16px",
												color: "green",
												cursor: "pointer"
											}}
										/>
									)}
								</Popconfirm>
								<Divider type="vertical" />
								<Popconfirm
									title="Are you sure delete this user?"
									onConfirm={() =>
										handleUserDelete(action[1])
									}
									okText="Yes"
									cancelText="No"
								>
									<AiOutlineDelete
										style={{
											fontSize: "16px",
											color: "#DB4437",
											cursor: "pointer"
										}}
										type="delete"
									/>
								</Popconfirm>
							</>
						) : null}
					</>
				</div>
			)
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
					name,
					profile: [name, _id],
					email,
					branch: branch ? branch : "N/A",
					year: year ? year : "N/A",
					role: [role, _id, year],
					designation: [designation, _id],
					isRevoked,
					show: [showOnWebsite, _id],
					action: [isRevoked, _id, role, designation]
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
