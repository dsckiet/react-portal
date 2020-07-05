import React, { useState, useEffect } from "react";
import PageTitle from "./../Layout/PageTitle";
import {
	Row,
	Col,
	Form,
	Upload,
	message,
	Card,
	Divider,
	Input,
	Button,
	Icon,
	TreeSelect
} from "antd";
import styled from "styled-components";
import { _notification } from "./../../utils/_helpers";
import {
	previewCertificateService,
	getEventsService,
	addCertificateService
} from "../../utils/services";

const Heading = styled.div`
	font-size: 20px;
	font-weight: bold;
`;

const CustomizeCard = styled(Card)`
	width: 100%;
	padding-left: 8px;
	padding-right: 8px;
`;

const CustomButton = styled(Button)`
	background-color: #f4b400 !important;
`;

const Wrapper = styled.div`
	margin-right: auto !important;
	margin-left: auto !important;
`;

const { TreeNode } = TreeSelect;

const AddCertificate = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);
	const [eventID, setEventId] = useState(null);
	const [isShown, setIsShown] = useState(false);
	const [events, setEvents] = useState([]);
	const { getFieldDecorator } = props.form;

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getEventsService();
				setEvents(data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	const uploadprops = {
		name: "file",
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
		headers: {
			authorization: "authorization-text"
		},
		// beforeUpload(file) {
		// 	const isJpgOrPng =
		// 		file.type === "image/jpeg" || file.type === "image/png";
		// 	if (!isJpgOrPng) {
		// 		message.error("You can only upload JPG/PNG file!");
		// 	}
		// 	console.log(file);
		// 	const isLt2M = file.size / 1024 / 1024 < 5;
		// 	if (!isLt2M) {
		// 		message.error("Image must smaller than 2MB!");
		// 	}
		// 	return isJpgOrPng && isLt2M;
		// },
		onChange(info) {
			if (info.file.status === "uploading") {
			}
			if (info.file.status === "done") {
				console.log(info.file, info.fileList);

				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				console.log(info.file, info.fileList);

				message.error(`${info.file.name} file upload failed.`);
			}
		}
	};

	const fontprops = {
		name: "file",
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
		headers: {
			authorization: "authorization-text"
		},
		onChange(info) {
			if (info.file.status !== "uploading") {
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				console.log(info.file, info.fileList);

				message.error(`${info.file.name} file upload failed.`);
			}
		}
	};

	const handlePreview = e => {
		e.preventDefault();
		setIsLoading(true);
		props.form.validateFields((err, values) => {
			if (!err) {
				try {
					console.log(values);
					const formData = new FormData();
					formData.append("name", values.name);
					formData.append("x", values.x);
					formData.append("y", values.y);
					formData.append("size", values.size);
					formData.append("red", values.red);
					formData.append("green", values.green);
					formData.append("blue", values.blue);
					formData.append(
						"pdffile",
						values.pdffile.file.originFileObj
					);
					formData.append(
						"fontfile",
						values.fontfile.file.originFileObj
					);

					previewCertificateService(formData);
					setIsShown(true);
					setIsLoading(false);
				} catch (error) {
					_notification("error", "Error", error.message);
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		setIsSubmitBtnLoading(true);
		props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					const formData = new FormData();
					formData.append("name", values.name);
					formData.append("x", values.x);
					formData.append("y", values.y);
					formData.append("size", values.size);
					formData.append("red", values.red);
					formData.append("green", values.green);
					formData.append("blue", values.blue);
					formData.append(
						"pdffile",
						values.pdffile.file.originFileObj
					);
					formData.append(
						"fontfile",
						values.fontfile.file.originFileObj
					);
					console.log(values);

					const res = await addCertificateService(formData, eventID);
					if (res.message === "success") {
						_notification("success", "Success", "Profile Updated");
						props.onUpdateUser();
					} else {
						_notification("error", "Error", res.message);
					}
					setIsSubmitBtnLoading(false);
				} catch (error) {
					_notification("error", "Error", error.message);
					setIsSubmitBtnLoading(false);
				}
			} else {
				setIsSubmitBtnLoading(false);
			}
		});
	};

	const handleChange = value => {
		setEventId(value);
	};

	return (
		<>
			<PageTitle title="Certificate" bgColor="#F4B400" />

			<Wrapper>
				<Col span={12}>
					<CustomizeCard bordered={false}>
						<Heading>
							Preview Certificate
							<Divider style={{ marginTop: "10px" }} />
						</Heading>
						<Form onSubmit={handleSubmit} layout="vertical">
							<Row>
								<Col
									span={12}
									style={{ height: "100% !important" }}
								>
									<Form.Item label="Upload Pdf">
										{getFieldDecorator("pdffile", {
											rules: [
												{
													required: true,
													message:
														"Please select pdf file"
												}
											]
										})(
											<Upload {...uploadprops}>
												<p>Click to upload</p>
											</Upload>
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="Name">
										{getFieldDecorator("name", {
											rules: [
												{
													required: true,
													message:
														"Please input name!"
												}
											]
										})(
											<Input
												type="text"
												placeholder="Name"
											/>
										)}
									</Form.Item>
									<Row gutter={24}>
										<Col span={12}>
											<Form.Item label="X-axis">
												{getFieldDecorator("x", {
													rules: [
														{
															required: true,
															message:
																"Please input x-axis!"
														}
													]
												})(
													<Input
														type="number"
														placeholder="X"
													/>
												)}
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item label="Y-axis">
												{getFieldDecorator("y", {
													rules: [
														{
															required: true,
															message:
																"Please input y-axis!"
														}
													]
												})(
													<Input
														type="number"
														placeholder="Y"
													/>
												)}
											</Form.Item>
										</Col>
									</Row>
									<Form.Item label="Font size">
										{getFieldDecorator("size", {
											rules: [
												{
													required: true,
													message:
														"Please input font size!"
												}
											]
										})(
											<Input
												type="number"
												placeholder="Size"
											/>
										)}
									</Form.Item>
									<Row gutter={24}>
										<Col span={8}>
											<Form.Item label="Red">
												{getFieldDecorator("red", {
													rules: [
														{
															required: true,
															message:
																"Please input red value of RGB"
														}
													]
												})(
													<Input
														type="number"
														placeholder="Red"
														min={0}
														max={255}
													/>
												)}
											</Form.Item>
										</Col>
										<Col span={8}>
											<Form.Item label="Green">
												{getFieldDecorator("green", {
													rules: [
														{
															required: true,
															message:
																"Please input green value of RGB"
														}
													]
												})(
													<Input
														type="number"
														placeholder="Green"
														min={0}
														max={255}
													/>
												)}
											</Form.Item>
										</Col>
										<Col span={8}>
											<Form.Item label="Blue">
												{getFieldDecorator("blue", {
													rules: [
														{
															required: true,
															message:
																"Please input blue value of RGB"
														}
													]
												})(
													<Input
														type="number"
														placeholder="Blue"
														min={0}
														max={255}
													/>
												)}
											</Form.Item>
										</Col>
									</Row>
									<Form.Item label="Upload Font">
										{getFieldDecorator("fontfile", {
											rules: [
												{
													required: true,
													message:
														"Please select font file"
												}
											]
										})(
											<Upload
												// listType="ttf"
												{...fontprops}
											>
												<Button type="primary">
													<Icon type="upload" />
													Upload
												</Button>
											</Upload>
										)}
									</Form.Item>
									<div
										style={{
											float: "right",
											width: "100%",
											marginBottom: "40px"
										}}
									>
										<CustomButton
											loading={isLoading}
											style={{
												width: "100%"
											}}
											onClick={handlePreview}
										>
											Preview
										</CustomButton>
									</div>
								</Col>
							</Row>
							{isShown ? (
								<>
									<Row>
										<Col span={12}>
											<div
												style={{ marginBottom: "20px" }}
											>
												<TreeSelect
													style={{ minWidth: 180 }}
													dropdownStyle={{
														maxHeight: 400,
														overflow: "auto"
													}}
													placeholder="Please select events"
													onChange={handleChange}
												>
													<TreeNode
														value="Upcoming"
														title="Upcoming Events"
														selectable={false}
													>
														{events.length !== 0
															? events[
																	"upcomingEvents"
															  ].map(
																	({
																		_id,
																		title
																	}) => {
																		return (
																			<TreeNode
																				key={
																					_id
																				}
																				value={
																					_id
																				}
																				title={
																					title
																				}
																			/>
																		);
																	}
															  )
															: null}
													</TreeNode>
													<TreeNode
														value="Past"
														title="Past Events"
														selectable={false}
													>
														{events.length !== 0
															? events[
																	"previousEvents"
															  ].map(
																	({
																		_id,
																		title
																	}) => {
																		return (
																			<TreeNode
																				key={
																					_id
																				}
																				value={
																					_id
																				}
																				title={
																					title
																				}
																			/>
																		);
																	}
															  )
															: null}
													</TreeNode>
													<TreeNode
														value="Running"
														title="Running Events"
														selectable={false}
													>
														{events.length !== 0
															? events[
																	"runningEvents"
															  ].map(
																	({
																		_id,
																		title
																	}) => {
																		return (
																			<TreeNode
																				key={
																					_id
																				}
																				value={
																					_id
																				}
																				title={
																					title
																				}
																			/>
																		);
																	}
															  )
															: null}
													</TreeNode>
												</TreeSelect>
											</div>
										</Col>
									</Row>
									<Form.Item>
										<Button
											type="primary"
											htmlType="submit"
											className="login-form-button"
											loading={isSubmitBtnLoading}
										>
											Add Certificate
										</Button>
									</Form.Item>
								</>
							) : null}
						</Form>
					</CustomizeCard>
				</Col>
			</Wrapper>
		</>
	);
};

const AddCertificateForm = Form.create({ name: "certificate_form" })(
	AddCertificate
);

export default AddCertificateForm;
