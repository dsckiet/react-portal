import { notification } from "antd";

export const _notification = (type, title, description) => {
	return notification[type]({
		message: title,
		description
	});
};
