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
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);
	const [fileList, setFileList] = useState(null);
	const { getFieldDecorator } = props.form;
	const uploadprops = {
		name: "avatar",
		listType: "picture-card",
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
			console.log(file);
			const isLt2M = file.size / 1024 / 1024 < 5;
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
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
			setFileList(info.fileList);
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

			if (dob) {
				dob = dob.split("T")[0];
			}
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

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);

		props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					const formData = new FormData();
					formData.append("name", values.name);
					formData.append("email", values.email);
					formData.append("designation", values.designation);
					formData.append("dob", values.dob.format("YYYY-MM-DD"));
					if (values.image.file) {
						formData.append(
							"image",
							values.image.file.originFileObj
						);
					} else {
						formData.append("image", values.image);
					}
					if (
						values.password !== undefined &&
						values.password !== ""
					) {
						formData.append("password", values.password);
					}
					if (values.contact !== undefined && values.contact !== "") {
						formData.append("contact", values.contact);
					}
					if (values.github !== undefined && values.github !== "") {
						formData.append("github", values.github);
					}
					if (
						values.linkedin !== undefined &&
						values.linkedin !== ""
					) {
						formData.append("linkedin", values.linkedin);
					}
					if (values.twitter !== undefined && values.twitter !== "") {
						formData.append("twitter", values.twitter);
					}
					if (
						values.portfolio !== undefined &&
						values.portfolio !== ""
					) {
						formData.append("portfolio", values.portfolio);
					}

					const res = await updateUserService(formData);
					if (res.message === "success") {
						_notification("success", "Success", "Profile Updated");
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
						{getFieldDecorator(
							"image",
							{}
						)(
							<>
								<Upload
									fileList={fileList}
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
											<Icon type="plus" />
											<div className="ant-upload-text">
												Upload
											</div>
										</div>
									)}
								</Upload>
								<small>
									Photo should be in square dimension
								</small>
							</>
						)}
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
										required: true,
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

				<Form.Item label="Password">
					{getFieldDecorator(
						"password",
						{}
					)(
						<Input.Password
							type="password"
							placeholder="Password"
						/>
					)}
				</Form.Item>

				<Form.Item label="Contact">
					{getFieldDecorator(
						"contact",
						{}
					)(<Input type="number" placeholder="Contact" />)}
				</Form.Item>

				<Form.Item label="Designation">
					{getFieldDecorator("designation", {
						rules: [
							{
								required: true,
								message: "Please input Designation"
							}
						]
					})(<Input type="text" placeholder="Designation" />)}
				</Form.Item>

				<Form.Item label="Date of Birth" name="date-picker">
					{getFieldDecorator("dob", {
						rules: [
							{
								type: "object"
							}
						]
					})(
						<DatePicker
							style={{ width: "100%" }}
							format="YYYY-MM-DD"
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
