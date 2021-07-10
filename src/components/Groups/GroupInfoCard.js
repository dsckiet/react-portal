import React, { useState } from "react";
import { Card, Avatar, Tooltip, Row, Popconfirm } from "antd";
import { FaCrown } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { deleteGroupService, getRole } from "../../utils/services";
import { _notification } from "../../utils/_helpers";

const GroupInfoCard = ({
	data,
	cardConfig,
	setRefreshGroups,
	refreshGroups,
	onClick,
	memberDetails
}) => {
	const [userData] = useState(getRole());
	const deleteGroup = async (e, id) => {
		e.stopPropagation();
		try {
			const res = await deleteGroupService(id);
			if (!res.error && res.message === "success") {
				setRefreshGroups(!refreshGroups);
				_notification("success", "Success", "Successfully Deleted!");
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	return (
		<>
			<Card hoverable onClick={onClick}>
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
						<Popconfirm
							onClick={e => e.stopPropagation()}
							okText="Yes"
							cancelText="No"
							title="Are you sure to delete this group?"
							onConfirm={e => {
								deleteGroup(e, data._id);
							}}
							onCancel={e => e.stopPropagation()}
						>
							<IoIosCloseCircle />
						</Popconfirm>
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
							{memberDetails.heads.map((head, id) => (
								<Tooltip
									title="User Name"
									placement="top"
									key={id}
								>
									<Avatar src={head.image} />
								</Tooltip>
							))}
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
							{memberDetails.members.map((mem, id) => (
								<Tooltip
									title="User Name"
									placement="top"
									key={id}
								>
									<Avatar src={mem.image} />
								</Tooltip>
							))}
						</Avatar.Group>
					</Row>
				</div>
			</Card>
		</>
	);
};

export default GroupInfoCard;
