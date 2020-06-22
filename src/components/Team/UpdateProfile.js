import React, { useState, useEffect } from "react";
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
	Divider
} from "antd";
import styled from "styled-components";
import "./style.css";
import { getUserService, updateUserService } from "../../utils/services";
import { _notification } from "./../../utils/_helpers";
import moment from "moment";

const UploadContainer = styled.div`
	align-content: center !important;
`;

const UpdateProfile = props => {
	const [user, setUser] = useState(null);
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
	const [imageLink, setImageLink] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);
	const { getFieldDecorator } = props.form;
	const { loading, setLoading } = useState(false);
	const uploadprops = {
		name: "avatar",
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
		headers: {
			authorization: "authorization-text"
		},
		beforeUpload(file) {
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
		},
		onChange(info) {
			if (info.file.status === "uploading") {
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
				getBase64(info.file.originFileObj, imageUrl => {
					setImage(imageUrl);
				});
				setImageLink(info.file.originFileObj);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		}
	};

	useEffect(() => {
		(async () => {
			setShowSkeleton(true);
			try {
				const id = props.uid;
				const res = await getUserService(id);
				if (res.message === "success") {
					setUser(res.data);
				} else {
					_notification("warning", "Error", res.message);
				}
			} catch (err) {
				_notification("error", "Error", err.message);
			}
		})();
	}, [props.uid]);

	useEffect(() => {
		if (user) {
			let {
				image,
				name,
				email,
				contact,
				designation,
				dob,
				github,
				linkedin,
				twitter,
				portfolio
			} = user;

			dob = dob.split("T")[0];

			setName(name);
			setEmail(email);
			setContact(contact);
			setDesignation(designation);
			setDOB(dob);
			setGithub(github);
			setTwitter(twitter);
			setLinkedIn(linkedin);
			setPortfolio(portfolio);
			setImage(image);

			props.form.setFieldsValue({
				dob: moment(dob, "YYYY-MM-DD"),
				image,
				name,
				email,
				designation,
				contact,
				github,
				twitter,
				linkedin,
				portfolio
			});
			setShowSkeleton(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	const onDateChange = (date, dateString) => {
		setDOB(dateString);
	};

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);

		props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					const formData = new FormData();
					if (imageLink !== null) {
						formData.append("image", imageLink);
					}
					formData.append("name", name);
					formData.append("email", email);
					formData.append("password", password);
					formData.append("contact", contact);
					formData.append("designation", designation);
					formData.append("dob", dob);
					formData.append("github", github);
					formData.append("linkedin", linkedin);
					formData.append("twitter", twitter);
					formData.append("portfolio", portfolio);

					const res = await updateUserService(formData);
					if (res.message === "success") {
						_notification("success", "Success", "Event Updated");
						props.onUpdateUser();
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
		<Skeleton loading={showSkeleton} active>
			<Form onSubmit={handleSubmit} layout="vertical">
				<UploadContainer>
					<Form.Item>
						<Upload
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							{...uploadprops}
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
							})(
								<Input
									type="text"
									placeholder="Name"
									onChange={e => setName(e.target.value)}
								/>
							)}
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
							})(
								<Input
									type="text"
									placeholder="Email"
									onChange={e => setEmail(e.target.value)}
								/>
							)}
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="Password">
					{getFieldDecorator(
						"password",
						{}
					)(
						<Input.Password
							type="password"
							placeholder="Password"
							onChange={e => setPassword(e.target.value)}
						/>
					)}
				</Form.Item>

				<Form.Item label="Contact">
					{getFieldDecorator(
						"contact",
						{}
					)(
						<Input
							type="number"
							placeholder="Contact"
							onChange={e => setContact(e.target.value)}
						/>
					)}
				</Form.Item>

				<Form.Item label="Designation">
					{getFieldDecorator("designation", {
						rules: [
							{
								required: true,
								message: "Please input Designation"
							}
						]
					})(
						<Input
							type="text"
							placeholder="Designation"
							onChange={e => setDesignation(e.target.value)}
						/>
					)}
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
							onChange={onDateChange}
						/>
					)}
				</Form.Item>

				<Divider style={{ color: "rgba(0,0,0,.25)" }}>
					Social Handles
				</Divider>

				<Form.Item label="Github">
					{getFieldDecorator(
						"github",
						{}
					)(
						<Input
							prefix={
								<Icon
									type="github"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="text"
							onChange={e => setGithub(e.target.value)}
						/>
					)}
				</Form.Item>

				<Form.Item label="Twitter">
					{getFieldDecorator(
						"twitter",
						{}
					)(
						<Input
							prefix={
								<Icon
									type="twitter"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="text"
							onChange={e => setTwitter(e.target.value)}
						/>
					)}
				</Form.Item>

				<Form.Item label="LinkedIn">
					{getFieldDecorator(
						"linkedin",
						{}
					)(
						<Input
							prefix={
								<Icon
									type="linkedin"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="text"
							onChange={e => setLinkedIn(e.target.value)}
						/>
					)}
				</Form.Item>

				<Form.Item label="Portfolio">
					{getFieldDecorator(
						"portfolio",
						{}
					)(
						<Input
							prefix={
								<Icon
									type="link"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="text"
							onChange={e => setPortfolio(e.target.value)}
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
