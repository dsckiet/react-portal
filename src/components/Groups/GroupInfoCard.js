import React, { useState } from "react";
import { Card, Avatar, Tooltip, Row } from "antd";
import { FaCrown } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { deleteGroupService, getRole } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
//import { useHistory } from "react-router-dom";

const GroupInfoCard = ({
	data,
	cardConfig,
	setRefreshGroups,
	refreshGroups
}) => {
	//const history = useHistory();
	const [userData] = useState(getRole());
	const deleteGroup = async (e, id) => {
		try {
			const res = await deleteGroupService(id);
			if (!res.error && res.message === "success") {
				setRefreshGroups(!refreshGroups);
				_notification("success", "Success", "Successfully Deleted!");
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
		e.stopPropagation();
	};

	return (
		<>
			<Card hoverable>
				<div
					style={{
						backgroundColor: cardConfig && cardConfig.primary,
						margin: "-16px -16px 16px -16px",
						padding: "16px",
						fontSize: "28px",
						fontWeight: "400",
						color: "white",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					}}
				>
					{data.name}
					{userData.role === "lead" && (
						<IoIosCloseCircle
							onClick={e => {
								deleteGroup(e, data._id);
							}}
						/>
					)}
				</div>
				<div
					style={{
						overflow: "auto",
						backgroundColor: cardConfig && cardConfig.secondary,
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
								color: cardConfig.primary,
								backgroundColor: cardConfig.tertiary
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
								color: cardConfig.primary
							}}
						/>
					</Row>

					<Row style={{ overflow: "auto" }}>
						<Avatar.Group
							maxCount={4}
							maxStyle={{
								color: cardConfig.primary,
								backgroundColor: cardConfig.tertiary
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
