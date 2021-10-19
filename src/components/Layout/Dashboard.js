import React from "react";
import { Row, Col } from "antd";
import PageTitle from "./PageTitle";
import "./style.css";
import { DashCards } from "./DashCards";
import Todos from "./Todos";
import SpamDays from "./SpamDays";

const Dashboard = () => (
	<>
		<div className="dashboard-section">
			<PageTitle title="Dashboard" bgColor="#0F9D58" />

			<div className="sub-components">
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={24} xl={16} lg={16} md={12}>
						<DashCards />
					</Col>
					<Col
						xs={24}
						sm={24}
						lg={8}
						xl={8}
						md={12}
						gutter={[16, 16]}
					>
						<Todos />
						<SpamDays />
					</Col>
				</Row>
			</div>
		</div>
	</>
);

export default Dashboard;
