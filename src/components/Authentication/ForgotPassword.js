import React, { useState, useEffect } from "react";
import { Card, Form, Input, Icon, Button } from "antd";
import logo from "../../utils/assets/images/logo-black.svg";
import "./style.css";
import { _notification } from "./../../utils/_helpers";
import { forgotPassService } from "../../utils/services";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Forgot = styled.div`
	float: right;
	font-weight: 300;
`;

const ForgotPassword = props => {
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
					const data = {
						email: values.email
					};
					const res = await forgotPassService(data);

					if (res.error) {
						console.log(res);
						_notification("error", "Error", res.message);
						props.form.setFieldsValue({
							email: ""
						});
					} else if (res.message === "success") {
						_notification("success", "Success", "Mail Sent");
						props.form.setFieldsValue({
							email: ""
						});
					}
					setIsLoading(false);
				} catch (err) {
					props.form.setFieldsValue({
						email: ""
					});
					console.log(err);
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
			<Card title="Forgot Password" className="login-form-wrapper">
				<Form onSubmit={handleSubmit} className="login-form">
					<p style={{ textAlign: "center", fontWeight: "300" }}>
						We will send a mail to your email with reset password
						link
					</p>
					<Form.Item>
						{getFieldDecorator("email", {
							rules: [
								{
									type: "email",
									required: true,
									message: "Please input your email!"
								}
							]
						})(
							<Input
								prefix={
									<Icon
										type="mail"
										style={{ color: "rgba(0,0,0,.25)" }}
									/>
								}
								type="email"
								placeholder="Email"
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
					<Forgot>
						<Link to="/login">Log In</Link>
					</Forgot>
				</Form>
			</Card>
		</div>
	);
};

const ForgotPasswordForm = Form.create({ name: "forgot_form" })(ForgotPassword);

export default ForgotPasswordForm;
