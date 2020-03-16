import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import {
	Table,
	Divider,
	Tag,
	Card,
	Icon,
	Drawer,
	Popconfirm,
	Form,
	Button,
	Input
} from "antd";
import "./style.css";
import { createEventService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
const { TextArea } = Input;

const CreateEvent = props => {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState(null);
	const [description, setDescription] = useState(null);
	const [venue, setVenue] = useState(null);

	const { getFieldDecorator } = props.form;

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);
	};

	return (
		<Form onSubmit={handleSubmit} layout="vertical">
			<Form.Item label="Event Title" required>
				{getFieldDecorator("title", {
					rules: [
						{
							type: "title",
							required: true,
							message: "Please input event title!"
						}
					]
				})(
					<Input
						type="text"
						placeholder="Event title"
						onChange={e => setTitle(e.target.value)}
					/>
				)}
			</Form.Item>
			<Form.Item label="Description">
				{getFieldDecorator("description", {
					rules: [
						{
							type: "text",
							message: "Please enter description!"
						}
					]
				})(
					<TextArea
						rows={4}
						placeholder="Enter event description"
						onChange={setDescription}
					/>
				)}
			</Form.Item>

			<Form.Item label="Event Venue" required>
				{getFieldDecorator("venue", {
					rules: [
						{
							type: "venue",
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

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
					loading={isLoading}
				>
					Log in
				</Button>

				{/* <Divider />
		<Link to="/signup">Create an account!</Link>
		<Link
			className="login-form-forgot"
			to="/forgot-password"
		>
			Forgot password?
		</Link> */}
			</Form.Item>
		</Form>
	);
};

const CreateEventForm = Form.create({ name: "event_form" })(CreateEvent);

export default CreateEventForm;
