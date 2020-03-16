import { notification } from "antd";

export default (type, title, description) => {
	return notification[type]({
		message: title,
		description
	});
};
