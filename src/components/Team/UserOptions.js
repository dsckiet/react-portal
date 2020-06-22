import React, { useState } from "react";
import { Button, Drawer, Menu, Dropdown, Row, Icon, Col } from "antd";
import AddMember from "./AddMember";
import { getRole } from "./../../utils/services";
import styled from "styled-components";
import UpdateProfile from "./UpdateProfile";

const DropdownContainer = styled.div`
	margin-right: 5px;
	margin-top: 5px;
	float: right;
`;

const UserName = styled.p`
	font-size: 18px;
	font-weight: 700;
`;

const UserOptions = props => {
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const [profileDrawer, setProfileDrawer] = useState(false);
	const [userData] = useState(getRole());
	const handleUserAdd = () => {
		setIsDrawerVisible(false);
		props.onAddMember();
	};

	const handleUpdateUser = () => {
		setProfileDrawer(false);
	};

	const menu = (
		<Menu>
			<Menu.Item key="1" onClick={() => setProfileDrawer(true)}>
				<Icon type="user" />
				Update Profile
			</Menu.Item>
			<Menu.Item key="2">
				<Icon type="edit" />
				Reset Password
			</Menu.Item>
		</Menu>
	);
	return (
		<>
			<div style={{ marginBottom: 12 }}>
				<Row justify="space-between">
					<Col span={12}>
						{userData.role === "lead" ||
						userData.role === "core" ? (
							<Button onClick={() => setIsDrawerVisible(true)}>
								Add Member
							</Button>
						) : null}
					</Col>
					<Col span={12}>
						<DropdownContainer>
							<Dropdown overlay={menu} placement="bottomCenter">
								<UserName>{userData.name}</UserName>
							</Dropdown>
						</DropdownContainer>
					</Col>
				</Row>

				<Drawer
					title="Add New Member"
					placement="right"
					closable={true}
					width="40%"
					destroyOnClose={true}
					onClose={() => setIsDrawerVisible(false)}
					visible={isDrawerVisible}
				>
					<AddMember onAddMember={handleUserAdd} />
				</Drawer>
				<Drawer
					title="Update Profile"
					placement="right"
					closable={true}
					width="30%"
					destroyOnClose={true}
					onClose={() => setProfileDrawer(false)}
					visible={profileDrawer}
				>
					<UpdateProfile
						uid={userData.id}
						onUpdateUser={handleUpdateUser}
					/>
				</Drawer>
			</div>
		</>
	);
};

export default UserOptions;
