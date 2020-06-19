import React, { useState } from "react";
import {
	Form,
	Button,
	Input,
	DatePicker,
	TimePicker,
	Row,
	Checkbox,
	Col,
	Skeleton,
	message,
	Upload,
	Icon
} from "antd";
import "./style.css";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const UpdateProfile = props => {
	const [event, setEvent] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState(null);
	const [description, setDescription] = useState(null);
	const [image, setImage] = useState(null);
	const [venue, setVenue] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [isRegistrationRequired, setIsRegReqd] = useState(null);
	const [isRegistrationOpened, setIsRegOpen] = useState(null);
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
			getBase64(
				info.file.originFileObj,
				imageUrl => {
					setImage(imageUrl);
					setLoading(true);
				}
				// this.setState({
				//   imageUrl,
				//   loading: false,
				// }),
			);
		}
	};

	const uploadButton = (
		<div>
			{loading ? <Icon type="loading" /> : <Icon type="plus" />}
			<div className="ant-upload-text">Upload</div>
		</div>
	);
	return (
		<Skeleton loading={showSkeleton} active>
			<Form layout="vertical">
				<Form.Item label="Event Title" required>
					{getFieldDecorator("title", {
						rules: [
							{
								required: true,
								message: "Please input event title!"
							}
						]
					})(
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
					)}
				</Form.Item>
				<Form.Item label="Description" required>
					{getFieldDecorator("description", {
						rules: [
							{
								require: true,
								message: "Please enter description!"
							}
						]
					})(
						<TextArea
							rows={4}
							placeholder="Enter event description"
							onChange={e => setDescription(e.target.value)}
						/>
					)}
				</Form.Item>

				{event ? (
					<img
						width="100%"
						style={{ borderRadius: 4, marginBottom: 8 }}
						src={event.image}
						alt={event.name}
					/>
				) : null}

				{/* <Form.Item label="Update Picture" required>
					<Upload {...uploadprops} listType="picture">
						<Button>
							<Icon type="upload" /> Click to Upload
						</Button>
					</Upload>
				</Form.Item> */}

				<Form.Item label="Event Venue" required>
					{getFieldDecorator("venue", {
						rules: [
							{
								required: true,
								message: "Please input event venue!"
							}
						]
					})(
						<Input
							type="text"
							placeholder="Event venue"
							onChange={e => setVenue(e.target.value)}
						/>
					)}
				</Form.Item>

				<Form.Item label="Event Dates" required>
					{getFieldDecorator("dates", {
						rules: [
							{
								required: true,
								message: "Please select event dates!"
							}
						]
					})(
						<RangePicker
							style={{ width: "100%" }}
							// disabledDate={disabledDate}
							format="YYYY-MM-DD"
							// onChange={onDateRangeChange}
						/>
					)}
				</Form.Item>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label="Start Time" required>
							{getFieldDecorator("startTime", {
								rules: [
									{
										required: true,
										message: "Please select event timings!"
									}
								]
							})(
								<TimePicker
									use12Hours
									format="h:mm a"
									// onChange={onSTChange}
									style={{ width: "100%" }}
								/>
							)}
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="End Time" required>
							{getFieldDecorator("endTime", {
								rules: [
									{
										required: true,
										message: "Please select event timings!"
									}
								]
							})(
								<TimePicker
									use12Hours
									format="h:mm a"
									// onChange={onETChange}
									style={{ width: "100%" }}
								/>
							)}
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item>
							{getFieldDecorator(
								"isRegistrationRequired",
								{}
							)(
								<Checkbox
									checked={isRegistrationRequired}
									onChange={e =>
										setIsRegReqd(e.target.checked)
									}
								>
									Is Registration Required?
								</Checkbox>
							)}
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							hidden={
								isRegistrationRequired === false ? true : false
							}
						>
							{getFieldDecorator(
								"isRegistrationOpened",
								{}
							)(
								<Checkbox
									checked={isRegistrationOpened}
									onChange={e =>
										setIsRegOpen(e.target.checked)
									}
								>
									Is Registration Open?
								</Checkbox>
							)}
						</Form.Item>
					</Col>
				</Row>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						loading={isLoading}
					>
						Modify Event Details
					</Button>
				</Form.Item>
			</Form>
		</Skeleton>
	);
};

const UpdateProfileForm = Form.create({ name: "profile_form" })(UpdateProfile);

export default UpdateProfileForm;
