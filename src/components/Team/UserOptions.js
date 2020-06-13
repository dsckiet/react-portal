import React, { useState } from "react";
import { Button, Drawer } from "antd";
import AddMember from "./AddMember";
import { getRole } from "./../../utils/services";

export default props => {
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const [userData] = useState(getRole());
	const handleUserAdd = () => {
		setIsDrawerVisible(false);
		props.onAddMember();
	};
	return (
		<div style={{ marginBottom: 12 }}>
			{userData.role === "lead" || userData.role === "core" ? (
				<Button onClick={() => setIsDrawerVisible(true)}>
					Add Member
				</Button>
			) : null}
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
	);
};
