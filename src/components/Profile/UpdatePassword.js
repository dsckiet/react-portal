import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { updateUserService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";

const UpdateProfile = props => {
	const [isLoading, setIsLoading] = useState(false);
	//const [isDisable, setIsDisable] = useState(true);
	const { getFieldDecorator } = props.form;

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);

		props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					const formData = new FormData();
					if (
						values.oldPassword &&
						values.newPassword &&
						values.confirmPassword &&
						values.newPassword === values.confirmPassword
					) {
						console.log(values.newPassword);
						formData.append("password", values.confirmPassword);
						const res = await updateUserService(formData);
						if (res.message === "success") {
							_notification(
								"success",
								"Success",
								"Password Changed"
							);
							props.onUpdatePassword();
						} else {
							_notification("error", "Error", res.message);
						}
					} else {
						_notification(
							"error",
							"Error",
							"Fill up the Details !"
						);
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
		<Form onSubmit={handleSubmit} layout="vertical">
			<Form.Item label="Old Password" required>
				{getFieldDecorator("oldPassword", {
					rules: [
						{
							required: true,
							message: "Please enter current password!"
						}
					]
				})(<Input.Password type="password" placeholder="Password" />)}
			</Form.Item>

			<Form.Item label="New Password" required>
				{getFieldDecorator("newPassword", {
					rules: [
						{
							required: true,
							message: "Please enter new password!"
						}
					]
				})(
					<Input.Password
						type="password"
						placeholder="New password"
					/>
				)}
			</Form.Item>

			<Form.Item label="Confirm Password" required>
				{getFieldDecorator("confirmPassword", {
					rules: [
						{
							required: true,
							message: "Please Re enter password!"
						}
					]
				})(
					<Input.Password
						type="password"
						placeholder="Re-enter password"
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
					Change Password
				</Button>
			</Form.Item>
		</Form>
	);
};

const UpdateProfileForm = Form.create({ name: "profile_form" })(UpdateProfile);

export default UpdateProfileForm;
