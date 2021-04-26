import React from "react";
import { Row, Col } from "antd";
import PageTitle from "./PageTitle";
import "./style.css";
import { DashCards } from "./DashCards";
import Todos from "./Todos";

const Dashboard = () => (
	<>
		<div className="dashboard-section">
			<PageTitle title="Dashboard" bgColor="#0F9D58" />

			<div className="sub-components">
				<Row gutter={[16, 16]}>
					<Col span={18}>
						<DashCards />
					</Col>
					<Col span={6}>
						<Todos />
					</Col>
				</Row>
			</div>
		</div>
	</>
);

export default Dashboard;
