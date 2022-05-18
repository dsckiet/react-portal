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
	TreeSelect
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
	const [formData, setFormData] = useState(null);
	const [form] = Form.useForm();

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getEventsService();
				setEvents(data);
				console.log(data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	const uploadprops = {
		name: "file",
		action: "https://www.api.dsckiet.com/dev",
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
		action: "https://www.api.dsckiet.com/dev",
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

	const handlePreview = async values => {
		setIsLoading(true);

		try {
			const formDataa = new FormData();
			formDataa.append("name", values.name);
			formDataa.append("x", values.x);
			formDataa.append("y", values.y);
			formDataa.append("size", values.size);
			formDataa.append("red", values.red);
			formDataa.append("green", values.green);
			formDataa.append("blue", values.blue);
			formDataa.append("pdffile", values.pdffile.file.originFileObj);
			formDataa.append("fontfile", values.fontfile.file.originFileObj);

			await previewCertificateService(formDataa);
			setFormData(formDataa);
			setIsShown(true);
			setIsLoading(false);
		} catch (error) {
			_notification("error", "Error", error.message);
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		setIsSubmitBtnLoading(true);
		try {
			const res = await addCertificateService(formData, eventID);
			if (res.message === "success") {
				_notification("success", "Success", "Certificate Saved");
				setTimeout(() => {
					window.location.reload();
				}, 200);
			} else {
				_notification("error", "Error", res.message);
			}
			setIsSubmitBtnLoading(false);
		} catch (error) {
			_notification("error", "Error", error.message);
			setIsSubmitBtnLoading(false);
		}
	};

	const handleChange = value => {
		console.log(value);
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
						<Form
							onFinish={handlePreview}
							layout="vertical"
							form={form}
						>
							<Row>
								<Col
									span={12}
									style={{ height: "100% !important" }}
								>
									<Form.Item
										label="Upload Pdf"
										name="pdffile"
										rules={[
											{
												required: true,
												message:
													"Please select pdf file"
											}
										]}
									>
										<Upload {...uploadprops}>
											<p>Click to upload</p>
										</Upload>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										label="Name"
										name="name"
										rules={[
											{
												required: true,
												message: "Please input name!"
											}
										]}
									>
										<Input type="text" placeholder="Name" />
									</Form.Item>
									<Row gutter={24}>
										<Col span={12}>
											<Form.Item
												label="X-axis"
												name="x"
												rules={[
													{
														required: true,
														message:
															"Please input x-axis!"
													}
												]}
											>
												<Input
													type="number"
													placeholder="X"
												/>
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												label="Y-axis"
												name="y"
												rules={[
													{
														required: true,
														message:
															"Please input y-axis!"
													}
												]}
											>
												<Input
													type="number"
													placeholder="Y"
												/>
											</Form.Item>
										</Col>
									</Row>
									<Form.Item
										label="Font size"
										name="size"
										rules={[
											{
												required: true,
												message:
													"Please input font size!"
											}
										]}
									>
										<Input
											type="number"
											placeholder="Size"
										/>
									</Form.Item>
									<Row gutter={24}>
										<Col span={8}>
											<Form.Item
												label="Red"
												name="red"
												rules={[
													{
														required: true,
														message:
															"Please input red value of RGB"
													}
												]}
											>
												<Input
													type="number"
													placeholder="Red"
													min={0}
													max={255}
												/>
											</Form.Item>
										</Col>
										<Col span={8}>
											<Form.Item
												label="Green"
												name="green"
												rules={[
													{
														required: true,
														message:
															"Please input green value of RGB"
													}
												]}
											>
												<Input
													type="number"
													placeholder="Green"
													min={0}
													max={255}
												/>
											</Form.Item>
										</Col>
										<Col span={8}>
											<Form.Item
												label="Blue"
												name="blue"
												rules={[
													{
														required: true,
														message:
															"Please input blue value of RGB"
													}
												]}
											>
												<Input
													type="number"
													placeholder="Blue"
													min={0}
													max={255}
												/>
											</Form.Item>
										</Col>
									</Row>
									<Form.Item
										label="Upload Font"
										name="fontfile"
										rules={[
											{
												required: true,
												message:
													"Please select font file"
											}
										]}
									>
										<Upload
											// listType="ttf"
											{...fontprops}
										>
											<Button type="primary">
												<UploadOutlined />
												Upload
											</Button>
										</Upload>
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
											// onClick={handlePreview}
											htmlType="submit"
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
											onClick={handleSubmit}
											loading={isSubmitBtnLoading}
											className="login-form-button"
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

export default AddCertificate;
