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
import { previewCertificateService } from "../../utils/services";

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
						<Form onSubmit={handlePreview} layout="vertical">
							<Row>
								<Col span={12}>
									<Form.Item label="Upload">
										{getFieldDecorator("pdffile", {
											rules: [
												{
													required: true,
													message:
														"Please select pdf file"
												}
											]
										})(
											<Upload
												listType="pdf"
												{...uploadprops}
											>
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
												listType="ttf"
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
											width: "100%"
										}}
									>
										<CustomButton
											loading={isLoading}
											style={{
												width: "100%"
											}}
											htmlType="submit"
										>
											Preview
										</CustomButton>
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
