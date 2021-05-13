import React from "react";
import { Modal, Typography, Tag } from "antd";
import StatusBar from "./StatusBar";
import CommentSection from "./CommentSection";
const { Text } = Typography;

const ProgressModal = ({ visible, handleShow }) => {
	return (
		<>
			<Modal
				visible={visible}
				footer={null}
				onCancel={handleShow}
				centered
				width={1000}
			>
				<h3>
					Mayank Shakya <Tag color="red">Lead</Tag>
				</h3>

				<h3>Clone the UI part of Le-Mugs website</h3>
				<Text code style={{ display: "flex", fontSize: "1.1rem" }}>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book.
				</Text>
				<br />
				<StatusBar status="pending" modal />
				<br />
				<h3>Added Comments</h3>
				<CommentSection />
			</Modal>
		</>
	);
};

export default ProgressModal;
