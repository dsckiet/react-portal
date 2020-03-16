import React from "react";
import { Row, Col, Card, Icon } from "antd";
import { Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import "./style.css";

export default ({ props }) => {
	const iconStyle = {
		fontSize: "20px",
		paddingRight: 8
	};
	return (
		<>
			<div className="dashboard-section">
				<PageTitle title="Dashboard" />
				<div className="sub-components">
					<Row gutter={[16, 16]}>
						<Col span={6}>
							<Link to="/events">
								<Card
									className="content-clickable"
									bordered={false}
									style={{ width: "100%" }}
								>
									<h2
										style={{
											fontWeight: 700,
											marginBottom: 0
										}}
									>
										<Icon
											style={iconStyle}
											type="calendar"
										/>{" "}
										Events
									</h2>
								</Card>
							</Link>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};
