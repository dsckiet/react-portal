import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Tabs } from "antd";
import PersonCard from "./PersonCard";
import "./styles.css";
import { addGroupService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";

const CreateGroup = ({ members, setShow, setRefreshGroups, refreshGroups }) => {
	const [activeTab, setActiveTab] = useState("head");
	const [form] = Form.useForm();
	const { TabPane } = Tabs;
	const [selectedMembers, setSelectedMembers] = useState([]);
	const [selectedHeads, setSelectedHeads] = useState([]);

	const handleSelect = id => {
		if (activeTab === "head") {
			if (selectedHeads.includes(id)) {
				setSelectedHeads(selectedHeads.filter(head => head !== id));
			}
			if (!selectedHeads.includes(id) && !selectedMembers.includes(id)) {
				setSelectedHeads([...selectedHeads, id]);
			}
		}
		if (activeTab === "member") {
			if (selectedMembers.includes(id)) {
				setSelectedMembers(
					selectedMembers.filter(member => member !== id)
				);
			}
			if (!selectedMembers.includes(id) && !selectedHeads.includes(id)) {
				setSelectedMembers([...selectedMembers, id]);
			}
		}
	};

	const handleFinish = async val => {
		let groupData = {
			name: val.name,
			members: selectedMembers,
			heads: selectedHeads
		};
		try {
			const { message, error } = await addGroupService(groupData);
			if (!error && message === "success") {
				_notification(
					"success",
					"Success",
					"Group created successfully!"
				);
			}
			setRefreshGroups(!refreshGroups);
			setShow(false);
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	const handleTabChange = key => {
		setActiveTab(key);
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

				<Form.Item label="Select" name="select">
					<Tabs
						defaultActiveKey="head"
						type="tabs"
						onChange={key => {
							handleTabChange(key);
						}}
					>
						<TabPane tab="Heads" key="head" />
						<TabPane tab="Members" key="member" />
					</Tabs>
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
									<PersonCard
										member={member}
										selectedHeads={selectedHeads}
										selectedMembers={selectedMembers}
										handleSelect={handleSelect}
									/>
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
