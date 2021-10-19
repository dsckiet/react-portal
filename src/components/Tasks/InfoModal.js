import React from "react";
import { Modal, Table, Tag, Avatar } from "antd";

const InfoModal = ({ showInfo, setShowInfo, data }) => {
	const columns = [
		{
			title: "Photo",
			dataIndex: "image",
			key: "photu",
			render: image => <Avatar src={image} size="large" />
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			render: role => (
				<Tag
					color={
						role === "lead"
							? "red"
							: role === "core"
							? "geekblue"
							: "orange"
					}
					style={{ textTransform: "capitalize" }}
				>
					{role}
				</Tag>
			)
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: status => (
				<Tag
					color={
						status === "pending"
							? "orange"
							: status === "core"
							? "geekblue"
							: "orange"
					}
					style={{ textTransform: "capitalize" }}
				>
					{status}
				</Tag>
			)
		}
	];

	const getDataSource = () => {
		let arr = [],
			i = 0;
		data.taskAssigneeData.forEach(taskAsg => {
			arr.push({
				key: i++,
				name: taskAsg.userData[0].name,
				image: taskAsg.userData[0].image,
				status: taskAsg.status,
				role: taskAsg.userData[0].role
			});
		});
		return arr;
	};

	return (
		<Modal
			title="Task Details"
			visible={showInfo}
			onCancel={() => setShowInfo(false)}
			footer={false}
			width={600}
		>
			<Table
				columns={columns}
				dataSource={getDataSource()}
				pagination={false}
			/>
		</Modal>
	);
};

export default InfoModal;
