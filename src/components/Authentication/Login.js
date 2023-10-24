import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Card } from "antd";
import Icon from "@ant-design/icons";
import logo from "../../utils/assets/images/logo-black.svg";
import "./style.css";
import { _notification } from "../../utils/_helpers";
import { loginService } from "../../utils/services";
import { DispatchContext } from "../../contexts/userContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Forgot = styled.div`
	float: right;
	font-weight: 300;
`;

const Login = props => {
	const [isLoading, setIsLoading] = useState(false);
	const Dispatch = useContext(DispatchContext);
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
				email: values.email,
				password: values.password
			};
			const res = await loginService(data);

			if (res.error) {
				_notification("error", "Error", res.message);
				form.setFieldsValue({
					password: ""
				});
			} else if (res.res.message === "success") {
				Dispatch({
					type: "IN",
					token: res.token
				});
				_notification("success", "Success", "Logged In");
				form.setFieldsValue({
					email: "",
					password: ""
				});
				setTimeout(() => {
					props.history.push("/");
				}, 200);
			}
			setIsLoading(false);
		} catch (err) {
			form.setFieldsValue({
				password: ""
			});
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	return (
		<div style={{ height: "100vh", overflow: "hidden" }}>
			<img
				src={logo}
				width={200}
				height={47.23}
				className="vidgyor-logo"
				alt=""
			/>
			<Card title="Log in to your account" className="login-form-wrapper">
				<Form
					form={form}
					onFinish={handleSubmit}
					className="login-form"
				>
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
									type="user"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="email"
							placeholder="Email"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your Password!"
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
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							loading={isLoading}
						>
							Log in
						</Button>
					</Form.Item>
					<Forgot>
						<Link to="/forgot">Forgot Password</Link>
					</Forgot>
				</Form>
			</Card>
			<p style={{ textAlign: "center", marginTop: 12 }}>
				Don't have an account? Contact your lead
			</p>
		</div>
	);
};

export default Login;
