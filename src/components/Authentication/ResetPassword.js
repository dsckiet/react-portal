import React, { useState, useEffect } from "react";
import logo from "../../utils/assets/images/logo-black.svg";
import { Card, Form, Input, Icon, Button } from "antd";
import { _notification } from "./../../utils/_helpers";
import { resetPassService } from "../../utils/services";

const ResetPassword = props => {
	const [isLoading, setIsLoading] = useState(false);
	const { getFieldDecorator } = props.form;

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("token"));
		if (token) {
			if (token.token !== "") {
				props.history.push("/");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);

		props.form.validateFields(async (err, values) => {
			if (!err) {
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
						props.form.setFieldsValue({
							password: "",
							rePassword: ""
						});
					} else if (res.message === "success") {
						_notification("success", "Success", "Password changed");
						props.history.push("/login");
					}
					setIsLoading(false);
				} catch (err) {
					props.form.setFieldsValue({
						rePassword: ""
					});
					_notification("error", "Error", err.message);
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		});
	};

	return (
		<div style={{ height: "100vh", overflow: "hidden" }}>
			<img src={logo} width={160} className="vidgyor-logo" alt="" />
			<Card title="Reset Password" className="login-form-wrapper">
				<Form onSubmit={handleSubmit} className="login-form">
					<p style={{ textAlign: "center", fontWeight: "300" }}>
						Enter new password
					</p>
					<Form.Item>
						{getFieldDecorator("password", {
							rules: [
								{
									required: true,
									message: "Please input your password!"
								}
							]
						})(
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
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("rePassword", {
							rules: [
								{
									required: true,
									message: "Please input your password!"
								}
							]
						})(
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
						)}
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
const ResetPasswordForm = Form.create({ name: "reset_form" })(ResetPassword);

export default ResetPasswordForm;
