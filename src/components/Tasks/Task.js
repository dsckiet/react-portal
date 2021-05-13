import React, { useState } from "react";
import PersonCard from "../Groups/PersonCard";
import ProgressModal from "./ProgressModal";
// import StatusBar from "./StatusBar";
// import CommentSection from "./CommentSection";
import { Row, Col, Button, Typography } from "antd";
const { Text } = Typography;

const assignees = [
	{
		name: "Mayank Shakya",
		designation: "lead",
		role: "lead",
		image:
			"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg",
		_id: 1
	},
	{
		name: "Mayan Shakya",
		designation: "member",
		role: "member",
		image:
			"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg",
		_id: 2
	},
	{
		name: "Mayank Shakya",
		designation: "core",
		role: "core",
		image:
			"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg",
		_id: 3
	}
];

const Task = () => {
	const [showProgressModal, setShowProgressModal] = useState(false);

	const handleShow = () => {
		setShowProgressModal(!showProgressModal);
	};

	return (
		<>
			<Row style={{ justifyContent: "space-between" }}>
				<h2>Clone the UI part of Le-Mugs website</h2>

				<Button>Edit Task</Button>
			</Row>
			<Text code style={{ display: "flex", fontSize: "1.1rem" }}>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a galley
				of type and scrambled it to make a type specimen book. It has
				survived not only five centuries, but also the leap into
				electronic typesetting, remaining essentially unchanged. It was
				popularised.
			</Text>
			<br />
			<h3>Assigned To :</h3>
			<Row gutter={[16, 16]}>
				{assignees.map(assignee => (
					<Col
						xs={12}
						sm={12}
						md={8}
						lg={6}
						xl={4}
						key={assignee._id}
					>
						<PersonCard
							member={assignee}
							handleSelect={handleShow}
						/>
					</Col>
				))}
			</Row>
			<br />
			{/* <StatusBar status="pending" />
			<br />
			<h3>Added Comments</h3>
			<CommentSection /> */}
			<ProgressModal
				visible={showProgressModal}
				handleShow={handleShow}
			/>
		</>
	);
};

export default Task;
