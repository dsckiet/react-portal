import React from "react";
import { Card, Avatar, Tooltip, Row } from "antd";
import { FaCrown } from "react-icons/fa";

const GroupInfoCard = ({ data }) => {
	return (
		<>
			<Card hoverable>
				<div
					style={{
						backgroundColor: "rgb(219,68,55)",
						margin: "-16px -16px 16px -16px",
						padding: "16px",
						fontSize: "28px",
						fontWeight: "400",
						color: "white"
					}}
				>
					{data.groupName}
				</div>
				<div
					style={{
						overflow: "auto",
						backgroundColor: "rgb(219,68,55,.1)",
						margin: "-16px",
						padding: "16px"
					}}
				>
					<Row
						style={{
							overflow: "auto",
							paddingBottom: "12px",
							alignItems: "center",
							justifyContent: "space-between"
						}}
					>
						<Avatar.Group
							maxCount={4}
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
						</Avatar.Group>
						<FaCrown
							style={{
								fontSize: "18px",
								color: "rgb(219,68,55)"
							}}
						/>
					</Row>

					<Row style={{ overflow: "auto" }}>
						<Avatar.Group
							maxCount={4}
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
							<Tooltip title="User Name" placement="top">
								<Avatar src="https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg" />
							</Tooltip>
						</Avatar.Group>
					</Row>
				</div>
			</Card>
		</>
	);
};

export default GroupInfoCard;
