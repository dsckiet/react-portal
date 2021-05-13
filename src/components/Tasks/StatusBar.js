import React from "react";
import { Row, Tag } from "antd";
import { AiOutlineEdit } from "react-icons/ai";

const StatusBar = ({ status, modal }) => {
	return (
		<>
			<Row style={{ alignItems: "center", fontSize: "16px" }}>
				Task Status :{" "}
				<Tag
					color="orange"
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
				{!modal ? <AiOutlineEdit style={{ color: "#D46D2C" }} /> : null}
			</Row>
		</>
	);
};

export default StatusBar;
