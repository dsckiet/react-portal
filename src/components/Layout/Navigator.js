import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import routes from "../../utils/_routes";
import {
	Redirect,
	Route,
	Switch,
	BrowserRouter as Router,
	Link
} from "react-router-dom";
import logo from "../../utils/assets/images/logo-white.svg";

const { Content, Sider } = Layout;

const Dashboard = props => {
	const [isCollapsed] = useState(false);

	// useEffect(() => {
	//   if (
	//     !localStorage.getItem("token") ||
	//     localStorage.getItem("token") === "undefined"
	//   ) {
	//     props.history.push("/login");
	//   }
	// });

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
							{routes.map((route, idx) => (
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
							))}
							<Menu.Item
								key={"signout"}
								onClick={() => {
									localStorage.clear();
									props.history.push("/login");
								}}
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
		</>
	);
};

export default Dashboard;
