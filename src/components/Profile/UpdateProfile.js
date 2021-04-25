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
	Divider,
	Modal,
	Select
} from "antd";
import styled from "styled-components";
import { getUserService, updateUserService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import moment from "moment";
import { useHistory } from "react-router-dom";

const UploadContainer = styled.div`
	align-content: center !important;
`;

const Wrapper = styled.div`
	padding: 10px 20px;
`;
const Head = styled.div`
	padding-bottom: 20px;
	font-size: 16px;
`;

const NoButton = styled(Button)`
	background-color: #ffffff !important;
	color: #1890ff !important;
	border: 2px solid #1890ff !important;
`;

const { Option } = Select;
const { TextArea } = Input;

const UpdateProfile = props => {
	const [user, setUser] = useState(null);
	const [show, setShow] = useState(false);
	const [load, setLoad] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);
	const [fileList, setFileList] = useState(null);
	const { getFieldDecorator } = props.form;
	const history = useHistory();

	const handleSignOut = state => {
		setLoad(true);
		localStorage.clear();
		setTimeout(() => {
			history.push("/login");
		}, 1500);
	};

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
				message.error("Image must smaller than 5MB!");
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
				const id = props.userData.id;
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
	}, [props.userData.id]);

	useEffect(() => {
		if (user) {
			let {
				image,
				name,
				email,
				branch,
				year,
				contact,
				designation,
				dob,
				bio,
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
				dob: dob ? moment(dob, "YYYY-MM-DD") : "",
				bio,
				image,
				name,
				email,
				branch,
				year,
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
					if (values.dob && values.dob !== "") {
						formData.append("dob", values.dob.format("YYYY-MM-DD"));
					}

					if (
						props.userData.role !== "member" &&
						values.designation
					) {
						formData.append("designation", values.designation);
					}
					if (values.image.file) {
						formData.append(
							"image",
							values.image.file.originFileObj
						);
					} else {
						formData.append("image", values.image);
					}

					if (values.contact !== undefined && values.contact !== "") {
						formData.append("contact", values.contact);
					}
					if (values.github !== undefined && values.github !== "") {
						formData.append("github", values.github);
					}
					if (values.branch !== undefined && values.branch !== "") {
						formData.append("branch", values.branch);
					}
					if (values.year !== undefined && values.year !== "") {
						formData.append("year", values.year);
					}
					if (values.bio !== undefined && values.bio !== "") {
						formData.append("bio", values.bio);
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

						if (
							user.name === values.name &&
							user.email === values.email
						) {
							props.onUpdateUser();
							props.Refresh();
						} else {
							setShow(true);
						}
					} else {
						_notification("error", "Error", res.message);
					}
					setIsLoading(false);
				} catch (err) {
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
							})(
								<Input
									type="text"
									placeholder="Name"
									disabled
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
									disabled
								/>
							)}
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label="Branch" required>
							{getFieldDecorator(
								"branch",
								{}
							)(
								<Select placeholder="Select Branch">
									<Option value="CS">CS</Option>
									<Option value="CO">CO</Option>
									<Option value="IT">IT</Option>
									<Option value="CSI">CSI</Option>
									<Option value="EC">EC</Option>
									<Option value="ME">ME</Option>
									<Option value="EN">EN</Option>
									<Option value="CE">CE</Option>
									<Option value="MCA">MCA</Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Year" required>
							{getFieldDecorator(
								"year",
								{}
							)(
								<Select placeholder="Select Year">
									<Option value="1">1</Option>
									<Option value="2">2</Option>
									<Option value="3">3</Option>
									<Option value="4">4</Option>
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>

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
					})(
						<Input
							type="text"
							placeholder="Designation"
							disabled={
								props.userData.role !== "lead" ? true : false
							}
						/>
					)}
				</Form.Item>

				<Form.Item label="Date of Birth" name="date-picker">
					{getFieldDecorator(
						"dob",
						{}
					)(
						<DatePicker
							style={{ width: "100%" }}
							format="YYYY-MM-DD"
						/>
					)}
				</Form.Item>

				<Form.Item label="Bio">
					{getFieldDecorator(
						"bio",
						{}
					)(<TextArea rows={4} type="text" placeholder="Bio" />)}
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
			<Modal
				visible={show}
				footer={null}
				closable={false}
				onCancel={() => handleSignOut(true)}
			>
				<Wrapper
					style={{
						display: "flex",
						alignItems: "center",
						textAlign: "center",
						flexDirection: "column"
					}}
				>
					<Head>
						<Row>
							<Col>
								You will be signed out for safety reasons !{" "}
								<br />
								Try logging in later
							</Col>
						</Row>
					</Head>
					<Row>
						<Col xs={6}>
							<NoButton
								loading={load}
								type="primary"
								onClick={() => handleSignOut(true)}
							>
								Ok
							</NoButton>
						</Col>
					</Row>
				</Wrapper>
			</Modal>
		</Skeleton>
	);
};

const UpdateProfileForm = Form.create({ name: "profile_form" })(UpdateProfile);

export default UpdateProfileForm;
