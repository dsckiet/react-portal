import React, { useState, useEffect } from "react";
import { Layout, Menu, Icon, Modal, Row, Col, Button } from "antd";
import routes from "../../utils/_routes";
import { getRole } from "../../utils/services";
import { Switch, Link, Redirect } from "react-router-dom";
import logo from "../../utils/assets/images/logo-white.svg";
import logoCollapse from "../../utils/assets/images/logo_collapse.svg";
import { IoIosArrowRoundBack } from "react-icons/io";
import styled from "styled-components";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import EventList from "../Events/EventsList";
import ParticipantsList from "../Participants/ParticipantsList";
import TeamList from "../Team/TeamList";
import Profile from "../Profile/Profile";

const { Content, Sider } = Layout;

const Navigator = props => {
	const [isCollapsed, setIsCollapsed] = useState(false);
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

	useEffect(() => {
		console.log("1st mount pe ni har mount pe khelenge");
	});

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
			<Layout>
				<Sider
					// width={200}
					// style={{
					// 	overflow: "auto",
					// 	height: "100vh",
					// 	position: "fixed",
					// 	left: 0
					// }}
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
							onClick={() => setIsCollapsed(!isCollapsed)}
							src={isCollapsed ? logoCollapse : logo}
							//hidden={isCollapsed}
							width={`${isCollapsed ? "84" : "160"}`}
							style={{ padding: "12px 24px", cursor: "pointer" }}
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
						</Menu.Item>
						<Menu.Item
							key={"collapse"}
							onClick={() => setIsCollapsed(!isCollapsed)}
						>
							{/* <BiArrowToLeft /> */}
							<Icon type={isCollapsed ? "right" : "left"} />
							<span>Collapse</span>
						</Menu.Item>
					</Menu>
				</Sider>

				<Layout
				// style={{
				// 	minHeight: "100vh",
				// 	marginLeft: `${isCollapsed ? "80px" : "200px"}`
				// }}
				>
					<Content
						style={{
							margin: 12,
							padding: 20,
							background: "#f9f9f9",
							minHeight: "280"
						}}
					>
						<Switch>
							<PrivateRoute
								exact
								path="/"
								component={Dashboard}
								data={Creds}
							/>
							<PrivateRoute
								exact
								path="/events"
								component={EventList}
								data={Creds}
							/>
							<PrivateRoute
								exact
								path="/participants"
								component={ParticipantsList}
								data={Creds}
							/>
							<PrivateRoute
								exact
								path="/team"
								component={TeamList}
								data={Creds}
							/>
							<PrivateRoute
								exact
								path="/profile"
								component={Profile}
								data={Creds}
							/>

							<Redirect from="/dashboard" to="/" />
						</Switch>
					</Content>
				</Layout>
			</Layout>

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

export default Navigator;
