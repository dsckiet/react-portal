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
	Skeleton,
	Upload,
	message,
	InputNumber
} from "antd";
import Icon from "@ant-design/icons";
import moment from "moment";

import "./style.css";
import { getEventService, updateEventService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const UpdateEvent = props => {
	const format = "h:mm a";
	const [event, setEvent] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showSkeleton, setShowSkeleton] = useState(false);
	const [fileList, setFileList] = useState(null);
	const [form] = Form.useForm();
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
	useEffect(() => {
		(async () => {
			setShowSkeleton(true);
			try {
				const id = props.eventId;
				const res = await getEventService(id);
				if (res.message === "success") {
					setEvent(res.data);
					setShowSkeleton(false);
				} else {
					_notification("warning", "Error", res.message);
				}
			} catch (err) {
				_notification("error", "Error", err.message);
			}
		})();
	}, [props.eventId]);

	useEffect(() => {
		if (event) {
			let {
				startDate,
				endDate,
				time,
				title,
				description,
				isRegistrationOpened,
				isRegistrationRequired,
				venue,
				maxRegister,
				image
			} = event;

			startDate = startDate.split("T")[0];
			endDate = endDate.split("T")[0];

			form.setFieldsValue({
				startTime: moment(time.split(" to ")[0], format),
				endTime: moment(time.split(" to ")[1], format),
				dates: [
					moment(startDate, "YYYY-MM-DD"),
					moment(endDate, "YYYY-MM-DD")
				],
				title,
				description,
				isRegistrationOpened,
				isRegistrationRequired,
				venue,
				maxRegister,
				image
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [event]);

	function disabledDate(current) {
		// Can not select days before today and today
		return current && current < moment().endOf("day");
	}

	const handleSubmit = async values => {
		setIsLoading(true);
		if (form.getFieldValue("isRegistrationRequired") === false) {
			form.setFieldsValue({ isRegistrationOpened: false });
		}
		try {
			let xtime =
				values.startTime.format("h:mm a") +
				" to " +
				values.endTime.format("h:mm a");

			const formData = new FormData();
			if (values.image.file) {
				formData.append("image", values.image.file.originFileObj);
			} else {
				formData.append("image", values.image);
			}
			formData.append("title", values.title);
			formData.append("description", values.description);
			formData.append("startDate", values.dates[0].format("YYYY-MM-DD"));
			formData.append("endDate", values.dates[1].format("YYYY-MM-DD"));
			formData.append("time", xtime);
			formData.append("venue", values.venue);
			formData.append(
				"isRegistrationRequired",
				values.isRegistrationRequired
			);
			formData.append(
				"isRegistrationOpened",
				values.isRegistrationOpened
			);
			formData.append("maxRegister", values.maxRegister);

			let params = props.eventId;
			console.log(formData, "yeh h final");

			const res = await updateEventService(formData, params);
			if (res.message === "success") {
				_notification("success", "Success", "Event Updated");
				props.onUpdateEvent();
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
		<Skeleton loading={showSkeleton} active>
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
							require: true,
							message: "Please enter description!"
						}
					]}
				>
					<TextArea rows={4} placeholder="Enter event description" />
				</Form.Item>

				{event ? (
					<img
						width="100%"
						style={{ borderRadius: 4, marginBottom: 8 }}
						src={event.image}
						alt={event.name}
					/>
				) : null}

				<Form.Item
					label="Update Picture"
					required
					name="image"
					rules={[
						{
							required: true,
							message: "Please select!"
						}
					]}
				>
					<Upload
						{...uploadprops}
						fileList={fileList}
						listType="picture"
					>
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
						disabledDate={disabledDate}
						format="YYYY-MM-DD"
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
						<Form.Item name="isRegistrationRequired">
							<Checkbox
								checked={form.getFieldValue(
									"isRegistrationRequired"
								)}
							>
								Is Registration Required?
							</Checkbox>
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							name="isRegistrationOpened"
							hidden={
								form.getFieldValue("isRegistrationRequired") ===
								false
									? true
									: false
							}
						>
							<Checkbox
								checked={form.getFieldValue(
									"isRegistrationOpened"
								)}
							>
								Is Registration Open?
							</Checkbox>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item
					label="Max Registerations"
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
						Modify Event Details
					</Button>
				</Form.Item>
			</Form>
		</Skeleton>
	);
};

//const UpdateEventForm = Form.create({ name: "event_form" })(UpdateEvent);

export default UpdateEvent;
