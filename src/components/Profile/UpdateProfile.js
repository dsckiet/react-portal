import React, { useState, useEffect } from "react";
import {
	Form,
	Button,
	Input,
	DatePicker,
	Row,
	Col,
	Skeleton,
	//message,
	Upload,
	Divider,
	Modal,
	Select
} from "antd";
import ImgCrop from "antd-img-crop";
import Icon from "@ant-design/icons";
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

const githubUrlPrefix = "https://github.com/";
const twitterUrlPrefix = "https://twitter.com/";
const linkedinUrlPrefix = "https://linkedin.com/in/";

const UpdateProfile = props => {
	const [user, setUser] = useState(null);
	const [show, setShow] = useState(false);
	const [load, setLoad] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [showNotif, setShowNotif] = useState(false);

	const history = useHistory();
	const [form] = Form.useForm();

	useEffect(() => {
		if (showNotif) {
			_notification(
				"success",
				"Success",
				"File saved, Save changes before exit !"
			);
		}
	}, [showNotif]);

	const onChange = ({ fileList: newFileList }) => {
		console.log(newFileList);
		if (newFileList.length !== 0) {
			const isJpgOrPng =
				(newFileList &&
					newFileList.length !== 0 &&
					newFileList[0].type === "image/jpeg") ||
				(newFileList &&
					newFileList.length !== 0 &&
					newFileList[0].type === "image/png");
			const isLt2M =
				newFileList &&
				newFileList.length !== 0 &&
				newFileList[0].size / 1024 / 1024 < 2;
			if (isJpgOrPng && isLt2M) {
				setFileList(newFileList);
				if (!showNotif) {
					setShowNotif(true);
				}
			}
			if (!isLt2M) {
				_notification("error", "Error", "Size should be less than 2MB");
			}
			if (!isJpgOrPng) {
				_notification("error", "Error", "Invalid file format");
			}
		} else {
			setFileList([]);
			setShowNotif(false);
		}
	};

	const onPreview = async file => {
		let src = file.url;
		if (!src) {
			src = await new Promise(resolve => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	};

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
		action: "https://www.api.dsckiet.com/dev",
		headers: {
			authorization: "authorization-text"
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

			form.setFieldsValue({
				dob: dob ? moment(dob, "YYYY-MM-DD") : "",
				bio,
				image,
				name,
				email,
				branch,
				year: year ? moment(year, "YYYY") : "",
				designation,
				contact,
				github: github ? github.replace(githubUrlPrefix, "") : "",
				twitter: twitter ? twitter.replace(twitterUrlPrefix, "") : "",
				linkedin: linkedin
					? linkedin.replace(linkedinUrlPrefix, "")
					: "",
				portfolio
			});
			setShowSkeleton(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	// const getBase64 = (img, callback) => {
	// 	const reader = new FileReader();
	// 	reader.addEventListener("load", () => callback(reader.result));
	// 	reader.readAsDataURL(img);
	// };

	const handleSubmit = async values => {
		console.log(values, "submit info");
		try {
			const formData = new FormData();
			formData.append("name", values.name);
			formData.append("email", values.email);
			if (values.dob && values.dob !== "") {
				formData.append("dob", values.dob.format("YYYY-MM-DD"));
			}

			if (props.userData.role !== "member" && values.designation) {
				formData.append("designation", values.designation);
			}
			if (fileList.length !== 0) {
				formData.append("image", fileList[0].originFileObj);
			} else {
				formData.append("image", values.image);
			}
			if (values.contact !== undefined && values.contact !== "") {
				formData.append("contact", values.contact);
			}
			if (values.github !== undefined && values.github !== "") {
				formData.append("github", `${githubUrlPrefix}${values.github}`);
			}
			if (values.branch !== undefined && values.branch !== "") {
				formData.append("branch", values.branch);
			}
			if (values.year !== undefined && values.year !== "") {
				formData.append("year", new Date(values.year).getFullYear());
			}
			if (values.bio !== undefined && values.bio !== "") {
				formData.append("bio", values.bio);
			}
			if (values.linkedin !== undefined && values.linkedin !== "") {
				formData.append(
					"linkedin",
					`${linkedinUrlPrefix}${values.linkedin}`
				);
			}
			if (values.twitter !== undefined && values.twitter !== "") {
				formData.append(
					"twitter",
					`${twitterUrlPrefix}${values.twitter}`
				);
			}
			if (values.portfolio !== undefined && values.portfolio !== "") {
				formData.append("portfolio", values.portfolio);
			}

			const res = await updateUserService(formData);
			if (res.message === "success") {
				_notification("success", "Success", "Profile Updated");
				setShowNotif(false);
				if (user.name === values.name && user.email === values.email) {
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
	};

	// const disabledDatesForYear = current => {
	// 	return (
	// 		current < moment(new Date().getFullYear() - 4, "YYYY") ||
	// 		current > moment(new Date().getFullYear() + 4, "YYYY")
	// 	);
	// };

	// const disabledDatesForDob = current => {
	// 	return (
	// 		current < moment(new Date().getFullYear() - 26, "YYYY") ||
	// 		current > moment(new Date().getFullYear() - 16, "YYYY")
	// 	);
	// };

	return (
		<Skeleton loading={showSkeleton} active>
			<Form onFinish={handleSubmit} layout="vertical" form={form}>
				<UploadContainer>
					<Form.Item name="image">
						<>
							<ImgCrop rotate>
								<Upload
									{...uploadprops}
									fileList={fileList}
									onChange={onChange}
									onPreview={onPreview}
								>
									{fileList.length === 0 ? (
										image ? (
											<div style={{ padding: "8px 8px" }}>
												<img
													src={image}
													alt="avatar"
													style={{ width: "100%" }}
												/>
											</div>
										) : (
											<div className="ant-upload-text">
												+ Upload
											</div>
										)
									) : null}
								</Upload>
							</ImgCrop>
							<small>Photo should be in square dimension</small>
						</>
					</Form.Item>
				</UploadContainer>

				<Divider style={{ color: "rgba(0,0,0,.25)" }}>
					Personal Information
				</Divider>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Name"
							required
							name="name"
							rules={[
								{
									required: true,
									message: "Please enter your name!"
								}
							]}
						>
							<Input type="text" placeholder="Name" disabled />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Email"
							required
							name="email"
							rules={[
								{
									required: true,
									message: "Please input email!"
								}
							]}
						>
							<Input type="text" placeholder="Email" disabled />
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label="Branch" required name="branch">
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
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Year of Graduation"
							required
							name="year"
						>
							<DatePicker
								picker="year"
								//disabledDate={disabledDatesForYear}
							/>
						</Form.Item>
					</Col>
				</Row>

				<Form.Item
					label="Contact"
					name="contact"
					rules={[
						{
							required: true,
							message: "Please input contact"
						},
						{
							pattern: /(^[6-9]{1}[0-9]{9}$)/,
							message: "Please input valid contact"
						}
					]}
				>
					<Input
						type="number"
						placeholder="Contact"
						stringMode={true}
					/>
				</Form.Item>

				<Form.Item
					label="Designation"
					name="designation"
					rules={[
						{
							required: true,
							message: "Please input Designation"
						}
					]}
				>
					<Input
						type="text"
						placeholder="Designation"
						disabled={props.userData.role !== "lead" ? true : false}
					/>
				</Form.Item>

				<Form.Item
					label="Date of Birth"
					name="dob"
					rules={[
						{
							required: true,
							message: "Please input date of birth"
						}
					]}
				>
					<DatePicker
						style={{ width: "100%" }}
						format="YYYY-MM-DD"
						//disabledDate={disabledDatesForDob}
					/>
				</Form.Item>

				<Form.Item label="Bio" name="bio">
					<TextArea rows={4} type="text" placeholder="Bio" />
				</Form.Item>

				<Divider style={{ color: "rgba(0,0,0,.25)" }}>
					Profile Links
				</Divider>

				<Form.Item
					label="Github"
					name="github"
					rules={[
						{
							pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
							message: "Please input valid handle"
						}
					]}
				>
					<Input
						prefix={
							<Icon
								type="github"
								style={{ color: "rgba(0,0,0,.25)" }}
							/>
						}
						addonBefore={githubUrlPrefix}
					/>
				</Form.Item>

				<Form.Item
					label="Twitter"
					name="twitter"
					rules={[
						{
							pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
							message: "Please input valid handle"
						}
					]}
				>
					<Input
						prefix={
							<Icon
								type="twitter"
								style={{ color: "rgba(0,0,0,.25)" }}
							/>
						}
						addonBefore={twitterUrlPrefix}
					/>
				</Form.Item>

				<Form.Item
					label="LinkedIn"
					name="linkedin"
					rules={[
						{
							pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
							message: "Please input valid handle"
						}
					]}
				>
					<Input
						prefix={
							<Icon
								type="linkedin"
								style={{ color: "rgba(0,0,0,.25)" }}
							/>
						}
						addonBefore={linkedinUrlPrefix}
					/>
				</Form.Item>

				<Form.Item
					label="Portfolio"
					name="portfolio"
					rules={[
						{
							// eslint-disable-next-line no-useless-escape
							pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/,
							message: "Please input valid portfolio url"
						}
					]}
				>
					<Input
						prefix={
							<Icon
								type="link"
								style={{ color: "rgba(0,0,0,.25)" }}
							/>
						}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						loading={isLoading}
					>
						Save Details
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

export default UpdateProfile;
