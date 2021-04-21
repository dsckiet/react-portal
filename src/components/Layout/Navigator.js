import React, { useState } from "react";
import { Layout, Menu, Icon, Modal, Row, Col, Button } from "antd";
import routes from "../../utils/_routes";
import { getRole } from "../../utils/services";
import {
	Redirect,
	Route,
	Switch,
	BrowserRouter as Router,
	Link
} from "react-router-dom";
import logo from "../../utils/assets/images/logo-white.svg";
import { IoIosArrowRoundBack } from "react-icons/io";
import styled from "styled-components";

const { Content, Sider } = Layout;

const Dashboard = props => {
	const [isCollapsed] = useState(false);
	const [visible, setVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const Creds = getRole();

	const handleSignOut = state => {
		if (state) {
			setIsLoading(true);
			setTimeout(() => {
				localStorage.clear();
				props.history.push("/login");
			}, 1000);
		} else {
			setVisible(state);
		}
	};

	const Wrapper = styled.div`
		padding: 10px 20px;
	`;
	const Head = styled.div`
		padding-bottom: 20px;
		font-size: 16px;
	`;

	const NoButton = styled(Button)`
		background-color: #ffffff !important;
		color: #1890ff !important;
		border: 2px solid #1890ff !important;
	`;

	// useEffect(() => {
	// 	if (
	// 		!localStorage.getItem("token") ||
	// 		localStorage.getItem("token") === "undefined"
	// 	) {
	// 		props.history.push("/login");
	// 	}
	// }, [history]);

	return (
		<>
			<Router>
				<Layout>
					<Sider
						theme="dark"
						trigger={null}
						collapsible
						collapsed={isCollapsed}
					>
						<div className="logo">
							{/* <Icon
								className="trigger"
								type={isCollapsed ? "menu-unfold" : "menu-fold"}
								onClick={() => setIsCollapsed(!isCollapsed)}
							/> */}
							<img
								src={logo}
								hidden={isCollapsed}
								width="160"
								style={{ padding: "12px 24px" }}
								alt=""
							/>
						</div>
						<hr style={{ margin: 0, padding: 0 }} />
						<Menu
							theme="dark"
							height="100%"
							mode="inline"
							defaultSelectedKeys={"dashboard"}
						>
							{routes.map((route, idx) => {
								if (
									Creds.role === "member" &&
									route.key === "participants"
								) {
									return null;
								} else {
									return (
										<Menu.Item
											key={route.key}
											onClick={() => {
												localStorage.setItem(
													"routeKey",
													route.key
												);
											}}
										>
											<Icon type={route.icon} />
											<span>{route.name}</span>
											<Link to={route.path} />
										</Menu.Item>
									);
								}
							})}
							<Menu.Item
								key={"signout"}
								onClick={() => setVisible(true)}
							>
								<Icon type="lock" />
								<span>Sign Out</span>
								{/* <Link to={route.path} /> */}
							</Menu.Item>
						</Menu>
					</Sider>

					<Layout>
						<Content
							style={{
								margin: 12,
								padding: 20,
								background: "#f9f9f9",
								minHeight: "280"
							}}
						>
							<Switch>
								{routes.map((route, idx) => {
									return route.component ? (
										<Route
											key={idx}
											path={route.path}
											exact={route.exact}
											render={props => (
												<route.component {...props} />
											)}
										/>
									) : null;
								})}
								<Redirect from="/dashboard" to="/" />
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</Router>

			<Modal
				visible={visible}
				footer={null}
				closable={false}
				onCancel={() => handleSignOut(false)}
			>
				<IoIosArrowRoundBack
					onClick={() => handleSignOut(false)}
					style={{ fontSize: "28px", cursor: "pointer" }}
				/>

				<Wrapper>
					<Head>
						<Row>
							<Col xs={5}></Col>
							<Col>Do you really want to sign out ?</Col>
							<Col xs={5}></Col>
						</Row>
					</Head>
					<Row>
						<Col xs={5}></Col>
						<Col xs={6} style={{ paddingLeft: "8px" }}>
							<NoButton
								type="primary"
								onClick={() => handleSignOut(false)}
							>
								No
							</NoButton>
						</Col>
						<Col
							xs={7}
							style={{
								display: "flex",
								justifyContent: "flex-end"
							}}
						>
							<Button
								type="primary"
								loading={isLoading}
								onClick={() => handleSignOut(true)}
							>
								Yes
							</Button>
						</Col>
						<Col xs={5}></Col>
					</Row>
				</Wrapper>
			</Modal>
		</>
	);
};

export default Dashboard;
