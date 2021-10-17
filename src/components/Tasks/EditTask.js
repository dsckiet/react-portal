import React from "react";
import { Row, Col, Form, Input, Button, DatePicker } from "antd";
import { _notification } from "../../utils/_helpers";
import { updateTaskService } from "../../utils/services";
import moment from "moment";

const EditTask = ({ data, setShow, refreshTasks, setRefreshTasks }) => {
	const [form] = Form.useForm();
	const { TextArea } = Input;

	const handleFinish = async val => {
		if (val.title !== data.title || val.description !== data.description) {
			let taskData = {
				title: val.title,
				description: val.description
				// /dueDate: "2021-10-11"
			};
			try {
				const { message, error } = await updateTaskService(
					data._id,
					taskData
				);
				if (!error && message === "success") {
					_notification(
						"success",
						"Success",
						"Task updated successfully!"
					);
				}
				//setRefreshTasks(!refreshTasks);
				setShow(false);
			} catch (err) {
				_notification("error", "Error", err.message);
			}
		}
	};

	const disabledDates = current => {
		return current < moment(new Date());
	};

	return (
		<>
			<Form layout="vertical" form={form} onFinish={handleFinish}>
				<Row gutter={16}>
					<Col xs={10} sm={24} md={12} lg={12}>
						<Form.Item label="Task Title" name="title">
							<Input
								type="text"
								placeholder="Task title"
								maxLength="20"
								defaultValue={data.title}
							/>
						</Form.Item>
					</Col>
					<Col xs={10} sm={24} md={12} lg={12}>
						<Form.Item label="Due Date for Task" name="dueDate">
							<DatePicker
								picker="week"
								style={{ width: "100%" }}
								format="YYYY-MM-DD"
								disabledDate={disabledDates}
							/>
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="Task Description" name="description">
					<TextArea
						defaultValue={data.description}
						type="text"
						placeholder="Task description"
						rows={4}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Save
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default EditTask;
