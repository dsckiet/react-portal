import React, { useState } from "react";
import { Button, Drawer, Row, Col } from "antd";
import AddMember from "./AddMember";
import { getRole } from "./../../utils/services";
import styled from "styled-components";
//import UpdateProfile from "./UpdateProfile";

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
	const [userData] = useState(getRole());
	const handleUserAdd = () => {
		setIsDrawerVisible(false);
		props.onAddMember();
	};

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
							<UserName>{userData.name}</UserName>
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
			</div>
		</>
	);
};

export default UserOptions;
