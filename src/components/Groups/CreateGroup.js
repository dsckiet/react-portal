import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Card } from "antd";
import styled from "styled-components";
import { HiBadgeCheck, HiCheckCircle } from "react-icons/hi";
import "./styles.css";

const CreateGroup = ({ members }) => {
	const [form] = Form.useForm();
	const { Meta } = Card;
	const [selectedMembers, setSelectedMembers] = useState([]);
	//let selectedMembers = [];

	const Image = styled.img`
		width: 80px;
		height: 80px;
		margin-top: 25px;
		border-radius: 50%;
		padding: 2px;
		border: 2px solid #d5d5d5;
		position: relative;
		background-color: #ffffff;
	`;

	const handleSelectMember = id => {
		if (selectedMembers.includes(id)) {
			//selectedMembers.filter(member => member !== id);
			setSelectedMembers(selectedMembers.filter(member => member !== id));
		}
		if (!selectedMembers.includes(id)) {
			//selectedMembers.push(id);
			setSelectedMembers([...selectedMembers, id]);
		}
	};

	const handleFinish = () => {
		document.write(selectedMembers);
	};
	return (
		<>
			<Form onFinish={handleFinish} layout="vertical" form={form}>
				<Form.Item
					label="Group Name"
					required
					name="name"
					rules={[
						{
							required: true,
							message: "Group name cannot be empty !"
						}
					]}
				>
					<Input type="text" placeholder="Group name" />
				</Form.Item>

				<Form.Item label="Select members" required name="members">
					<Row gutter={[16, 16]}>
						{members &&
							members.map(member => (
								<Col
									xs={12}
									sm={8}
									md={6}
									lg={4}
									xl={3}
									key={member._id}
								>
									<Card
										onClick={() =>
											handleSelectMember(member._id)
										}
										hoverable
										rounded
										bordered={false}
										style={{
											display: "flex",
											justifyContent: "center",
											textAlign: "center",
											backgroundColor: `${
												member.role === "lead"
													? "rgb(219,68,55,.1)"
													: member.role === "core"
													? "	rgb(66, 133, 244,.1)"
													: "rgb(244,180,0,.1)"
											}`,
											height: "100%"
										}}
									>
										<div
											style={{
												backgroundColor: `${
													member.role === "lead"
														? "#DB4437"
														: member.role === "core"
														? "#4285F4"
														: "#F4B400"
												}`,
												position: "absolute",
												height: "38%",
												top: 0,
												left: 0,
												width: "100%"
											}}
										/>

										<div
											className={
												selectedMembers.length !== 0 &&
												selectedMembers.includes(
													member._id
												)
													? "selected"
													: "onHover"
											}
										>
											<div>
												{selectedMembers.length !== 0 &&
												selectedMembers.includes(
													member._id
												) ? (
													<HiBadgeCheck
														style={{
															height: "80px",
															width: "80px"
														}}
													/>
												) : (
													<HiCheckCircle
														style={{
															height: "80px",
															width: "80px"
														}}
													/>
												)}
											</div>
											<h2>
												{selectedMembers.length !== 0 &&
												selectedMembers.includes(
													member._id
												)
													? "Selected !"
													: "Select"}
											</h2>
										</div>

										<Image src={member.image} alt="" />
										<Meta
											style={{
												paddingTop: "20px",
												paddingBottom: "10px"
											}}
											title={member.name}
											description={member.designation}
										/>
									</Card>
								</Col>
							))}
					</Row>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Create group
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default CreateGroup;
