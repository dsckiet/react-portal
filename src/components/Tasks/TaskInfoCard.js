import React, { useState } from "react";
import { Card, Row, Tag, Avatar, Tooltip, Col, Popconfirm } from "antd";
import { AiOutlineDelete, AiOutlineInfoCircle } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { _notification } from "../../utils/_helpers";
import { deleteTaskService } from "../../utils/services";
import InfoModal from "./InfoModal";

const TaskInfoCard = ({
	data,
	refreshTasks,
	setRefreshTasks,
	onClick,
	userData
}) => {
	const [showInfo, setShowInfo] = useState(false);

	const deleteTask = async (e, id) => {
		e.stopPropagation();
		try {
			const res = await deleteTaskService(id);
			if (!res.error && res.message === "success") {
				setRefreshTasks(!refreshTasks);
				_notification("success", "Success", "Successfully Deleted!");
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	const showTaskInfo = e => {
		e.stopPropagation();
		setShowInfo(true);
	};

	const editTask = (e, id) => {
		e.stopPropagation();
		console.log(id, "edit");
	};

	return (
		<>
			<Card hoverable onClick={onClick}>
				<Row
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						textTransform: "capitalize",
						paddingBottom: "6px"
					}}
				>
					<Col style={{ overflowWrap: "anywhere" }}>{data.title}</Col>
					<Col>
						<Row>
							<AiOutlineInfoCircle
								color="#4285F4"
								style={{
									marginLeft: "8px",
									height: "1.25em",
									width: "1.25em"
								}}
								onClick={e => showTaskInfo(e)}
							/>
							{(userData.role === "lead" ||
								data.headIds.includes(userData.id)) && (
								<>
									<Popconfirm
										onClick={e => e.stopPropagation()}
										okText="Yes"
										cancelText="No"
										title="Are you sure to delete this task?"
										onConfirm={e => {
											deleteTask(e, data._id);
										}}
										onCancel={e => e.stopPropagation()}
									>
										<AiOutlineDelete
											color="#DB4437"
											style={{
												marginLeft: "8px",
												height: "1.25em",
												width: "1.25em"
											}}
										/>
									</Popconfirm>

									<BiEditAlt
										color="#F4B400"
										style={{
											marginLeft: "8px",
											height: "1.25em",
											width: "1.25em"
										}}
										onClick={e => editTask(e, data._id)}
									/>
								</>
							)}
						</Row>
					</Col>
				</Row>
				<Row
					style={{
						alignItems: "center",
						justifyContent: "space-between",
						paddingTop: "12px"
					}}
				>
					<Tag color="green">{data.createdAt.split("T")[0]}</Tag>
					<Avatar.Group
						size="small"
						maxCount={3}
						maxStyle={{
							color: "#f56a00",
							backgroundColor: "#fde3cf"
						}}
					>
						{data.taskAssigneeData.map(data => (
							<Tooltip
								title={data.userData[0].name}
								placement="top"
								key={data._id}
							>
								<Avatar src={data.userData[0].image} />
							</Tooltip>
						))}
					</Avatar.Group>
				</Row>
			</Card>

			<InfoModal
				setShowInfo={setShowInfo}
				showInfo={showInfo}
				data={data}
			/>
		</>
	);
};

export default TaskInfoCard;
