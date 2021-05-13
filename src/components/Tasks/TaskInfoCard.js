import React from "react";
import { Card, Row, Tag, Avatar, Tooltip } from "antd";

const TaskInfoCard = ({ data }) => {
	return (
		<>
			<Card hoverable>
				<Row
				//style={{ margin: "-8px -4px" }}
				>
					{data.taskName}
				</Row>
				<Row
					style={{
						alignItems: "center",
						justifyContent: "space-between",
						paddingTop: "12px"
					}}
				>
					<Tag color="green">{data.dueDate}</Tag>
					<Avatar.Group
						size="small"
						maxCount={3}
						maxStyle={{
							color: "#f56a00",
							backgroundColor: "#fde3cf"
						}}
					>
						<Tooltip title="User Name" placement="top">
							<Avatar src="https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg" />
						</Tooltip>
						<Tooltip title="User Name" placement="top">
							<Avatar src="https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg" />
						</Tooltip>
						<Tooltip title="User Name" placement="top">
							<Avatar src="https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg" />
						</Tooltip>
						<Tooltip title="User Name" placement="top">
							<Avatar src="https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg" />
						</Tooltip>
					</Avatar.Group>
				</Row>
			</Card>
		</>
	);
};

export default TaskInfoCard;
