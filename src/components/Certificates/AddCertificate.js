import React, { useState } from "react";
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
	Icon
} from "antd";
import styled from "styled-components";
import { _notification } from "./../../utils/_helpers";

const Heading = styled.div`
	font-size: 20px;
	font-weight: bold;
`;

const CustomizeCard = styled(Card)`
	width: 100%;
	padding-left: 8px;
	padding-right: 8px;
`;

const AddCertificate = props => {
	const [isLoading, setIsLoading] = useState(false);
	const { getFieldDecorator } = props.form;
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
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
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
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		}
	};

	const handlePreview = e => {
		e.preventDefault();
		setIsLoading(true);
		props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					// const formData = new FormData();
					console.log(values);
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

	return (
		<>
			<PageTitle title="Certificate" bgColor="#F4B400" />

			<Row justify="center">
				<Col span={12}>
					<CustomizeCard bordered={false}>
						<Heading>
							Preview Certificate
							<Divider style={{ marginTop: "10px" }} />
						</Heading>
						<Form layout="vertical">
							<Row>
								<Col span={12}>
									<Form.Item label="Upload">
										{getFieldDecorator(
											"pdffile",
											{}
										)(
											<>
												<Upload {...uploadprops}>
													<p>Click to upload</p>
												</Upload>
											</>
										)}
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label="Name">
										{getFieldDecorator(
											"name",
											{}
										)(
											<Input
												type="text"
												placeholder="Name"
											/>
										)}
									</Form.Item>
									<Row gutter={24}>
										<Col span={12}>
											<Form.Item label="X-axis">
												{getFieldDecorator(
													"x",
													{}
												)(
													<Input
														type="number"
														placeholder="X"
													/>
												)}
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item label="Y-axis">
												{getFieldDecorator(
													"y",
													{}
												)(
													<Input
														type="number"
														placeholder="Y"
													/>
												)}
											</Form.Item>
										</Col>
									</Row>
									<Form.Item label="Font size">
										{getFieldDecorator(
											"size",
											{}
										)(
											<Input
												type="number"
												placeholder="Size"
											/>
										)}
									</Form.Item>
									<Row gutter={24}>
										<Col span={8}>
											<Form.Item label="Red">
												{getFieldDecorator(
													"red",
													{}
												)(
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
												{getFieldDecorator(
													"green",
													{}
												)(
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
												{getFieldDecorator(
													"blue",
													{}
												)(
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
										{getFieldDecorator(
											"fontfile",
											{}
										)(
											<>
												<Upload {...fontprops}>
													<Button type="primary">
														<Icon type="upload" />
														Click to upload
													</Button>
												</Upload>
											</>
										)}
									</Form.Item>
									<div
										style={{
											float: "right",
											width: "100%"
										}}
									>
										<Button
											loading={isLoading}
											style={{
												width: "100%"
											}}
											onClick={handlePreview}
										>
											Preview
										</Button>
									</div>
								</Col>
							</Row>
						</Form>
					</CustomizeCard>
				</Col>
			</Row>
		</>
	);
};

const AddCertificateForm = Form.create({ name: "certificate_form" })(
	AddCertificate
);

export default AddCertificateForm;
