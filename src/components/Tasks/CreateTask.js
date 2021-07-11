import React, { useState } from "react";
import { Row, Col, Form, Input, Button, DatePicker } from "antd";
import PersonCard from "../Groups/PersonCard";
import { _notification } from "../../utils/_helpers";
import { addTaskService } from "../../utils/services";
import moment from "moment";

const CreateTask = ({
	members,
	setShow,
	refreshTasks,
	setRefreshTasks,
	groupId
}) => {
	const [form] = Form.useForm();
	const { TextArea } = Input;
	const [selectedMembers, setSelectedMembers] = useState([]);

	const handleSelect = id => {
		if (selectedMembers.includes(id)) {
			setSelectedMembers(selectedMembers.filter(member => member !== id));
		} else {
			setSelectedMembers([...selectedMembers, id]);
		}
	};

	const handleFinish = async val => {
		let taskData = {
			title: val.title,
			assignees: selectedMembers,
			description: val.description ? val.description : " ",
			dueDate: "2021-10-31"
		};
		try {
			const { message, error } = await addTaskService(groupId, taskData);
			if (!error && message === "success") {
				_notification(
					"success",
					"Success",
					"Task created successfully!"
				);
			}
			setRefreshTasks(!refreshTasks);
			setShow(false);
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	const disabledDatesForDob = current => {
		return current < moment(new Date());
	};

	return (
		<>
			<Form layout="vertical" form={form} onFinish={handleFinish}>
				<Row gutter={16}>
					<Col xs={10} sm={24} md={12} lg={12}>
						<Form.Item
							label="Task Title"
							required
							name="title"
							rules={[
								{
									required: true,
									message: "Task title cannot be empty !"
								}
							]}
						>
							<Input
								type="text"
								placeholder="Task title"
								maxLength="20"
							/>
						</Form.Item>
					</Col>
					<Col xs={10} sm={24} md={12} lg={12}>
						<Form.Item
							label="Due Date for Task"
							name="dueDate"
							rules={[
								{
									required: true,
									message: "Please input due Date!"
								}
							]}
						>
							<DatePicker
								picker="week"
								style={{ width: "100%" }}
								format="YYYY-MM-DD"
								disabledDate={disabledDatesForDob}
							/>
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="Task Description" name="description">
					<TextArea
						type="text"
						placeholder="Task description"
						rows={4}
					/>
				</Form.Item>

				<Form.Item label="Select" name="select">
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
										selectedMembers={selectedMembers}
										handleSelect={handleSelect}
										selectedHeads={[]}
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
						Create Task
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default CreateTask;
