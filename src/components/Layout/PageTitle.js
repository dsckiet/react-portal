import React from "react";
import { PageHeader } from "antd";
import "./style.css";

const PageTitle = props => {
	return (
		<PageHeader
			style={{
				padding: "8px 16px",
				background: props.bgColor,
				color: "#fff!important",
				marginBottom: 16,
				borderRadius: 4,
				borderBottom: "1px solid rgb(235, 237, 240)",
				textTransform: "capitalize"
			}}
			title={props.title}
		/>
	);
};

export default PageTitle;
