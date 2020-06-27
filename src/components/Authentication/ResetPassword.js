import React, { useState } from "react";
import logo from "../../utils/assets/images/logo-black.svg";
import { Card, Form, Input, Icon, Button } from "antd";

const ResetPassword = props => {
	const [isLoading, setIsLoading] = useState(false);
	const { getFieldDecorator } = props.form;

	return (
		<div style={{ height: "100vh", overflow: "hidden" }}>
			<img src={logo} width={160} className="vidgyor-logo" alt="" />
			<Card title="Reset Password" className="login-form-wrapper">
				<Form className="login-form">
					<p style={{ textAlign: "center", fontWeight: "300" }}>
						Enter new password
					</p>
					<Form.Item>
						{getFieldDecorator("password", {
							rules: [
								{
									type: "password",
									required: true,
									message: "Please input your password!"
								}
							]
						})(
							<Input
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
