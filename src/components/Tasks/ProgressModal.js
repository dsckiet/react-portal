import React from "react";
import { Modal, Typography, Tag } from "antd";
import StatusBar from "./StatusBar";
import CommentSection from "./CommentSection";
const { Text } = Typography;

const ProgressModal = ({ visible, handleShow, data, destroy }) => {
	return (
		<>
			<Modal
				visible={visible}
				footer={null}
				onCancel={handleShow}
				centered
				width={900}
				destroyOnClose={destroy}
			>
				{data[0] && (
					<>
						<h3>
							{data[0].userData[0].name}{" "}
							<Tag color="red">{data[0].userData[0].role}</Tag>
						</h3>

						<h3>{data.title}</h3>
						<Text
							code
							style={{ display: "flex", fontSize: "1.1rem" }}
						>
							{data.description}
						</Text>
						<br />
						<StatusBar status={data[0].status} modal />
						<br />
					</>
				)}
				<h3>Added Comments</h3>
				<CommentSection details={data[0]} />
			</Modal>
		</>
	);
};

export default ProgressModal;
