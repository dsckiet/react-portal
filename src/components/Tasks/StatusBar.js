import React, { useState } from "react";
import { Row, Tag, Select } from "antd";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { updateTaskStatus } from "../../utils/services";

const StatusBar = ({ status, modal, data, refresh, setRefresh }) => {
	let color =
		status === "pending"
			? "orange"
			: status === "completed"
			? "green"
			: status === "closed"
			? "blue"
			: status === "overdue"
			? "red"
			: "gold";

	const [edit, setEdit] = useState(false);
	const { Option } = Select;
	const editTaskStatus = async val => {
		try {
			const res = await updateTaskStatus(data._id, { status: val });
			if (!res.error && res.message === "success") {
				setEdit(false);
				setRefresh(!refresh);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<Row style={{ alignItems: "center", fontSize: "16px" }}>
				Task Status :
				{!edit ? (
					<Tag
						color={color}
						style={{
							textTransform: "capitalize",
							fontSize: "14px",
							marginLeft: "8px",
							width: "120px",
							textAlign: "center"
						}}
					>
						{status}
					</Tag>
				) : (
					<div style={{ margin: "0px 12px" }}>
						<Select
							defaultValue={status}
							style={{ width: 120 }}
							onChange={editTaskStatus}
						>
							<Option value="ongoing">On going</Option>
							<Option value="pending">Pending</Option>
							<Option value="completed">Completed</Option>
							<Option value="overdue">Overdue</Option>
							<Option value="closed">Closed</Option>
						</Select>
					</div>
				)}
				{!modal &&
					(!edit ? (
						<AiOutlineEdit
							onClick={() => setEdit(true)}
							style={{
								color: `${color}`,
								width: "1.25em",
								height: "1.25em",
								cursor: "pointer"
							}}
						/>
					) : (
						<AiOutlineClose
							onClick={() => setEdit(false)}
							style={{
								width: "1.25em",
								height: "1.25em",
								cursor: "pointer"
							}}
						/>
					))}
			</Row>
		</>
	);
};

export default StatusBar;
