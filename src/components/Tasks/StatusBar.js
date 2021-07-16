import React from "react";
import { Row, Tag } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { updateTaskStatus } from "../../utils/services";

const StatusBar = ({ status, modal, data, refresh, setRefresh }) => {
	let color =
		status === "pending"
			? "orange"
			: status === "completed"
			? "green"
			: status === "closed"
			? "geekBlue"
			: status === "overdue"
			? "red"
			: "gold";

	const editTaskStatus = async id => {
		let data = { status: "pending" };
		try {
			const res = await updateTaskStatus(id, data);
			if (!res.error && res.message === "success") {
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
				{!modal && (
					<AiOutlineEdit
						onClick={() => editTaskStatus(data._id)}
						style={{
							color: `${color}`,
							width: "1.25em",
							height: "1.25em",
							cursor: "pointer"
						}}
					/>
				)}
			</Row>
		</>
	);
};

export default StatusBar;
