import React, { useState, useEffect } from "react";
import { Button, Drawer, Row, Col } from "antd";
import AddMember from "./AddMember";
import { getRole } from "./../../utils/services";
//import UpdateProfile from "./UpdateProfile";

const UserOptions = props => {
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const [userData] = useState(getRole());
	const [isMobile, setIsMobile] = useState(false);
	const handleUserAdd = () => {
		setIsDrawerVisible(false);
		props.onAddMember();
	};

	useEffect(() => {
		if (window.innerWidth <= 568) {
			setIsMobile(true);
		}
	}, []);

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
				</Row>

				<Drawer
					title="Add New Member"
					placement="right"
					closable={true}
					width={isMobile ? "80%" : "40%"}
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
