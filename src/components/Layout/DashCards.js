import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import _routes from "../../utils/_routes";
import { getRole } from "./../../utils/services";

export const DashCards = () => {
	const [userData] = useState(getRole());
	return (
		<Row gutter={[16, 16]}>
			{_routes.map(route => {
				if (route.key === "dashboard") {
					return null;
				}
				if (
					(route.key === "participants" || route.key === "groups") &&
					userData.role === "member"
				) {
					return null;
				}
				return (
					<Col
						lg={12}
						xl={12}
						md={24}
						xs={24}
						sm={24}
						key={route.key}
					>
						<Link
							to={route.path}
							onClick={() => {
								localStorage.setItem("routeKey", route.key);
							}}
						>
							<Card
								hoverable
								className="content-clickable"
								bordered={false}
								style={{
									width: "100%",
									borderBottom: `16px solid ${route.color}`
								}}
							>
								<Row gutter={16}>
									<Col
										xl={18}
										lg={18}
										sm={18}
										md={16}
										xs={16}
									>
										<h2
											style={{
												fontWeight: 700,
												marginBottom: 0
											}}
										>
											{route.name}
										</h2>
										{route.description}
									</Col>
									<Col
										xl={6}
										lg={6}
										sm={6}
										md={8}
										xs={8}
										style={{
											justifyContent: "center",
											alignItems: "center",
											display: "flex"
										}}
									>
										<route.icon
											style={{
												color: route.color,
												fontSize: "48px"
											}}
										/>
										{/* <Icon
											style={iconStyle(route.color)}
											type={route.icon}
										/> */}
									</Col>
								</Row>
							</Card>
						</Link>
					</Col>
				);
			})}
		</Row>
	);
};
