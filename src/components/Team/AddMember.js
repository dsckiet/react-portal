import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select } from "antd";

import "./style.css";
import { addUserService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";

const { Option } = Select;

const AddMember = props => {
	const format = "h:mm a";

	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [role, setRole] = useState(null);
	const [designation, setDesignation] = useState(null);

	const { getFieldDecorator } = props.form;

	// useEffect(() => {
	// 	props.form.setFieldsValue({
	// 		role: "member"
	// 	});
	// }, []);

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);

		props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					let data = {
						name,
						email,
						role,
						designation
					};
					const res = await addUserService(data);
					if (res.message === "success") {
						_notification("success", "Success", "New Member Added");
						props.onAddMember();
					} else {
						_notification("error", "Error", res.message);
					}
					setIsLoading(false);
				} catch (err) {
					_notification("error", "Error", err.message);
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		});
	};

	return (
		<Form onSubmit={handleSubmit} layout="vertical">
			<Form.Item label="Name" required>
				{getFieldDecorator("name", {
					rules: [
						{
							required: true,
							message: "Please enter the name"
						}
					]
				})(
					<Input
						type="text"
						placeholder="User Full Name"
						onChange={e => setName(e.target.value)}
					/>
				)}
			</Form.Item>

			<Form.Item label="Email" required>
				{getFieldDecorator("email", {
					rules: [
						{
							type: "email",
							required: true,
							message: "Please enter the email"
						}
					]
				})(
					<Input
						type="text"
						placeholder="User Email"
						onChange={e => setEmail(e.target.value)}
					/>
				)}
			</Form.Item>

			<Form.Item label="Role" required>
				{getFieldDecorator("role", {
					rules: [
						{
							required: true,
							message: "Please select the role"
						}
					]
				})(
					<Select
						onChange={value => setRole(value)}
						placeholder="Select user role"
					>
						<Option value="core">Core</Option>
						<Option value="member">Member</Option>
						<Option value="lead" disabled>
							Lead
						</Option>
					</Select>
				)}
			</Form.Item>

			<Form.Item label="Designation" required>
				{getFieldDecorator("designation", {
					rules: [
						{
							required: true,
							message: "Please enter the Designation"
						}
					]
				})(
					<Input
						type="text"
						placeholder="User Designation"
						onChange={e => setDesignation(e.target.value)}
					/>
				)}
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
					loading={isLoading}
				>
					Add Member
				</Button>
			</Form.Item>
		</Form>
	);
};

const AddMemberForm = Form.create({ name: "event_form" })(AddMember);

export default AddMemberForm;
