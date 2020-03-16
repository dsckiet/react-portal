import React from "react";
import { PageHeader } from "antd";
import "./style.css";

const PageTitle = props => {
	return (
		<PageHeader
			style={{
				padding: "8px 16px",
				background: "#0F9D58",
				color: "#fff!important",
				marginBottom: 16,
				borderRadius: 4,
				borderBottom: "1px solid rgb(235, 237, 240)"
			}}
			title={props.title}
		/>
	);
};

export default PageTitle;
