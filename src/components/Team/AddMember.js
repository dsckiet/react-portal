import React, { useState } from "react";
import { Form, Button, Input, Select } from "antd";
import { getRole } from "../../utils/services";
import "./style.css";
import { addUserService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";

const { Option } = Select;

const AddMember = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [role, setRole] = useState(null);
	const [designation, setDesignation] = useState(null);
	const userData = getRole();
	const [form] = Form.useForm();

	const handleSubmit = async values => {
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
	};

	return (
		<Form onFinish={handleSubmit} layout="vertical" form={form}>
			<Form.Item
				label="Name"
				required
				name="name"
				rules={[
					{
						required: true,
						message: "Please enter the name"
					}
				]}
			>
				<Input
					type="text"
					placeholder="User Full Name"
					onChange={e => setName(e.target.value)}
				/>
			</Form.Item>

			<Form.Item
				label="Email"
				required
				name="email"
				rules={[
					{
						type: "email",
						required: true,
						message: "Please enter the email"
					}
				]}
			>
				<Input
					type="text"
					placeholder="User Email"
					onChange={e => setEmail(e.target.value)}
				/>
			</Form.Item>

			<Form.Item
				label="Role"
				required
				name="role"
				rules={[
					{
						required: true,
						message: "Please select the role"
					}
				]}
			>
				<Select
					onChange={value => setRole(value)}
					placeholder="Select user role"
				>
					<Option
						value="core"
						disabled={userData.role !== "core" ? false : true}
					>
						Core
					</Option>
					<Option value="member">Member</Option>
					<Option value="lead" disabled>
						Lead
					</Option>
				</Select>
			</Form.Item>

			<Form.Item
				label="Designation"
				required
				name="designation"
				rules={[
					{
						required: true,
						message: "Please enter the Designation"
					}
				]}
			>
				<Input
					type="text"
					placeholder="User Designation"
					onChange={e => setDesignation(e.target.value)}
				/>
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

export default AddMember;
