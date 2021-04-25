import React, { useState, useEffect } from "react";
import logo from "../../utils/assets/images/logo-black.svg";
import { Card, Form, Input, Button } from "antd";
import Icon from "@ant-design/icons";
import { _notification } from "./../../utils/_helpers";
import { resetPassService } from "../../utils/services";

const ResetPassword = props => {
	const [isLoading, setIsLoading] = useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("token"));
		if (token) {
			if (token.token !== "") {
				props.history.push("/");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async values => {
		try {
			if (values.password !== values.rePassword) {
				throw new Error("Password not match");
			}
			const data = {
				token: props.match.params.token,
				id: props.match.params.id,
				pwd: values.password
			};
			const res = await resetPassService(data);
			if (res.error) {
				console.log(res);
				_notification("error", "Error", res.message);
				form.setFieldsValue({
					password: "",
					rePassword: ""
				});
			} else if (res.message === "success") {
				_notification("success", "Success", "Password changed");
				props.history.push("/login");
			}
			setIsLoading(false);
		} catch (err) {
			form.setFieldsValue({
				rePassword: ""
			});
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	return (
		<div style={{ height: "100vh", overflow: "hidden" }}>
			<img src={logo} width={160} className="vidgyor-logo" alt="" />
			<Card title="Reset Password" className="login-form-wrapper">
				<Form
					onFinish={handleSubmit}
					className="login-form"
					form={form}
				>
					<p style={{ textAlign: "center", fontWeight: "300" }}>
						Enter new password
					</p>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!"
							}
						]}
					>
						<Input.Password
							prefix={
								<Icon
									type="lock"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="password"
							placeholder="New Password"
						/>
					</Form.Item>
					<Form.Item
						name="rePassword"
						rules={[
							{
								required: true,
								message: "Please input your password!"
							}
						]}
					>
						<Input.Password
							prefix={
								<Icon
									type="lock"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="password"
							placeholder="Confirm New Password"
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							loading={isLoading}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default ResetPassword;
