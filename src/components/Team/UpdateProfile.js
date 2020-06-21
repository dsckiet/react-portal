import React, { useState } from "react";
import {
	Form,
	Button,
	Input,
	DatePicker,
	Row,
	Col,
	Skeleton,
	message,
	Upload,
	Icon,
	Select,
	Divider
} from "antd";
import styled from "styled-components";
import "./style.css";
const { Option } = Select;

const UploadContainer = styled.div`
	align-content: center !important;
`;

const UpdateProfile = props => {
	const [name, setName] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [image, setImage] = useState(null);
	const [contact, setContact] = useState(null);
	const [designation, setDesignation] = useState(null);
	const [github, setGithub] = useState(null);
	const [linkedin, setLinkedIn] = useState(null);
	const [twitter, setTwitter] = useState(null);
	const [portfolio, setPortfolio] = useState(null);
	const [dob, setDOB] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);
	const { getFieldDecorator } = props.form;
	const { loading, setLoading } = useState(false);
	// const uploadprops = {
	// 	name: "file",
	// 	action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	// 	headers: {
	// 		authorization: "authorization-text"
	// 	},
	// 	onChange(info) {
	// 		if (info.file.status !== "uploading") {
	// 			console.log(info.file, info.fileList);
	// 		}
	// 		if (info.file.status === "done") {
	// 			setImage(info.file.originFileObj);
	// 			message.success(`${info.file.name} file uploaded successfully`);
	// 		} else if (info.file.status === "error") {
	// 			message.error(`${info.file.name} file upload failed.`);
	// 		}
	// 	}
	// };
	function getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	function beforeUpload(file) {
		const isJpgOrPng =
			file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Image must smaller than 2MB!");
		}
		return isJpgOrPng && isLt2M;
	}

	const handleChange = info => {
		if (info.file.status === "uploading") {
			// console.log(info);
			// setLoading(true);
		}
		if (info.file.status === "done") {
			console.log(info);
			setImage(info.file.originFileObj);
			// setLoading(false);
			message.success(`${info.file.name} file uploaded successfully`);
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl => {
				setImage(imageUrl);
			});
		}
	};

	return (
		<Skeleton loading={showSkeleton} active>
			<Form layout="vertical">
				<UploadContainer>
					<Form.Item>
						<Upload
							name="avatar"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							beforeUpload={beforeUpload}
							onChange={handleChange}
						>
							{image ? (
								<img
									src={image}
									alt="avatar"
									style={{ width: "100%" }}
								/>
							) : (
								<div>
									{loading ? (
										<Icon type="loading" />
									) : (
										<Icon type="plus" />
									)}
									<div className="ant-upload-text">
										Upload
									</div>
								</div>
							)}
						</Upload>
					</Form.Item>
				</UploadContainer>

				<Divider style={{ color: "rgba(0,0,0,.25)" }}>
					Personal Information
				</Divider>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label="Name" required>
							{getFieldDecorator("name", {
								rules: [
									{
										require: true,
										message: "Please enter your name!"
									}
								]
							})(<Input type="text" placeholder="Name" />)}
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Email" required>
							{getFieldDecorator("email", {
								rules: [
									{
										required: true,
										message: "Please input email!"
									}
								]
							})(<Input type="text" placeholder="Email" />)}
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="Password" required>
					{getFieldDecorator("password", {
						rules: [
							{
								required: true,
								message: "Please input password!"
							}
						]
					})(
						<Input.Password
							type="password"
							placeholder="Password"
						/>
					)}
				</Form.Item>

				<Form.Item label="Contact" required>
					{getFieldDecorator(
						"contact",
						{}
					)(<Input type="number" placeholder="Contact" />)}
				</Form.Item>

				<Form.Item label="Designation" required>
					{getFieldDecorator("designation", {
						rules: [
							{
								required: true,
								message: "Please input Designation"
							}
						]
					})(<Input type="text" placeholder="Designation" />)}
				</Form.Item>

				<Form.Item label="Date of Birth">
					{getFieldDecorator(
						"dob",
						{}
					)(
						<DatePicker
							style={{ width: "100%" }}
							// disabledDate={disabledDate}
							format="YYYY-MM-DD"
						/>
					)}
				</Form.Item>

				<Divider style={{ color: "rgba(0,0,0,.25)" }}>
					Social Handles
				</Divider>

				<Form.Item label="Github">
					{getFieldDecorator("github", {
						rules: [
							{
								message: "Please input github handle"
							}
						]
					})(
						<Input
							prefix={
								<Icon
									type="github"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="text"
						/>
					)}
				</Form.Item>

				<Form.Item label="Twitter">
					{getFieldDecorator("twitter", {
						rules: [
							{
								message: "Please input twitter handle"
							}
						]
					})(
						<Input
							prefix={
								<Icon
									type="twitter"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="text"
						/>
					)}
				</Form.Item>

				<Form.Item label="LinkedIn">
					{getFieldDecorator("linkedin", {
						rules: [
							{
								message: "Please input linkedin handle"
							}
						]
					})(
						<Input
							prefix={
								<Icon
									type="linkedin"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="text"
						/>
					)}
				</Form.Item>

				<Form.Item label="Portfolio">
					{getFieldDecorator("portfolio", {
						rules: [
							{
								message: "Please input portfolio handle"
							}
						]
					})(
						<Input
							prefix={
								<Icon
									type="link"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="text"
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
						Update Details
					</Button>
				</Form.Item>
			</Form>
		</Skeleton>
	);
};

const UpdateProfileForm = Form.create({ name: "profile_form" })(UpdateProfile);

export default UpdateProfileForm;
