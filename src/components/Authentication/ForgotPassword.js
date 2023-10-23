import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button } from "antd";
import Icon from "@ant-design/icons";
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
			const data = {
				email: values.email
			};
			const res = await forgotPassService(data);

			if (res.error) {
				console.log(res);
				_notification("error", "Error", res.message);
				form.setFieldsValue({
					email: ""
				});
			} else if (res.message === "success") {
				_notification("success", "Success", "Mail Sent");
				form.setFieldsValue({
					email: ""
				});
			}
			setIsLoading(false);
		} catch (err) {
			form.setFieldsValue({
				email: ""
			});
			console.log(err);
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	return (
		<div style={{ height: "100vh", overflow: "hidden" }}>
			<img
				src={logo}
				width={320}
				height={160}
				className="vidgyor-logo"
				alt=""
			/>
			<Card title="Forgot Password" className="login-form-wrapper">
				<Form
					onFinish={handleSubmit}
					className="login-form"
					form={form}
				>
					<p style={{ textAlign: "center", fontWeight: "300" }}>
						We will send a mail to your email with reset password
						link
					</p>
					<Form.Item
						name="email"
						rules={[
							{
								type: "email",
								required: true,
								message: "Please input your email!"
							}
						]}
					>
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

export default ForgotPassword;
