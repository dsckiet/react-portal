import React, { useEffect, useState } from "react";
import {
	Form,
	Button,
	Input,
	DatePicker,
	TimePicker,
	Row,
	Checkbox,
	Col,
	Upload,
	message,
	InputNumber
} from "antd";
import Icon from "@ant-design/icons";
import moment from "moment";
import "./style.css";
import { addEventService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CreateEvent = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [fileList, setFileList] = useState(null);
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			maxRegister: 1
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const uploadprops = {
		name: "file",
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
		headers: {
			authorization: "authorization-text"
		},
		onChange(info) {
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
			setFileList(info.fileList);
		}
	};

	function disabledDate(current) {
		// Can not select days before today and today
		return current && current < moment().endOf("day");
	}

	const handleSubmit = async values => {
		if (values.isRegistrationRequired === false) {
			values.isRegistrationOpened = false;
		}

		try {
			let xtime =
				values.startTime.format("h:mm a") +
				" to " +
				values.endTime.format("h:mm a");
			const formData = new FormData();
			formData.append("image", values.image.file.originFileObj);
			formData.append("title", values.title);
			formData.append("description", values.description);
			formData.append("time", xtime);
			formData.append("venue", values.venue);
			formData.append("maxRegister", values.maxRegister);
			formData.append("startDate", values.dates[0].format("YYYY-MM-DD"));
			formData.append("endDate", values.dates[1].format("YYYY-MM-DD"));
			if (values.isRegistrationRequired === undefined) {
				formData.append("isRegistrationRequired", false);
			} else {
				formData.append(
					"isRegistrationRequired",
					values.isRegistrationRequired
				);
			}
			if (values.isRegistrationOpened === undefined) {
				formData.append("isRegistrationOpened", false);
			} else {
				formData.append(
					"isRegistrationOpened",
					values.isRegistrationOpened
				);
			}
			const res = await addEventService(formData);
			if (res.message === "success") {
				_notification("success", "Success", "Event Added");
				props.onAddEvent();
			} else {
				_notification("error", "Error", res.message);
			}
			setIsLoading(false);
		} catch (err) {
			_notification("error", "Error", err.message);
			setIsLoading(false);
		}
	};

	return (
		<Form onFinish={handleSubmit} layout="vertical" form={form}>
			<Form.Item
				label="Event Title"
				required
				name="title"
				rules={[
					{
						required: true,
						message: "Please input event title!"
					}
				]}
			>
				<Input type="text" placeholder="Event title" />
			</Form.Item>
			<Form.Item
				label="Description"
				required
				name="description"
				rules={[
					{
						required: true,
						message: "Please enter description!"
					}
				]}
			>
				<TextArea rows={4} placeholder="Enter event description" />
			</Form.Item>
			<Form.Item
				label="Upload Picture"
				required
				name="image"
				rules={[
					{
						required: true,
						message: "Please select image!"
					}
				]}
			>
				<Upload {...uploadprops} fileList={fileList} listType="picture">
					<Button>
						<Icon type="upload" /> Click to Upload
					</Button>
				</Upload>
			</Form.Item>

			<Form.Item
				label="Event Venue"
				required
				name="venue"
				rules={[
					{
						required: true,
						message: "Please input event venue!"
					}
				]}
			>
				<Input type="text" placeholder="Event venue" />
			</Form.Item>

			<Form.Item
				label="Event Dates"
				required
				name="dates"
				rules={[
					{
						required: true,
						message: "Please select event dates!"
					}
				]}
			>
				<RangePicker
					style={{ width: "100%" }}
					// disabledDate={disabledDate}
				/>
			</Form.Item>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						label="Start Time"
						required
						name="startTime"
						rules={[
							{
								required: true,
								message: "Please select event timings!"
							}
						]}
					>
						<TimePicker
							use12Hours
							format="h:mm a"
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label="End Time"
						required
						name="endTime"
						rules={[
							{
								required: true,
								message: "Please select event timings!"
							}
						]}
					>
						<TimePicker
							use12Hours
							format="h:mm a"
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						valuePropName="checked"
						name="isRegistrationRequired"
					>
						<Checkbox>Is Registration Required?</Checkbox>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Checkbox.Group>
						<Form.Item
							name="isRegistrationCompleted"
							valuePropName="checked"
						>
							<Checkbox>Is Registration Open?</Checkbox>
						</Form.Item>
					</Checkbox.Group>
				</Col>
			</Row>

			<Form.Item
				label="Max Registration"
				name="maxRegister"
				rules={[
					{
						required: true,
						message: "Please enter maximum registrations."
					}
				]}
			>
				<InputNumber min={1} />
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
					loading={isLoading}
				>
					Add Event
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateEvent;
