import React, { useState } from "react";
import { Button, Drawer } from "antd";
import AddMember from "./AddMember";

export default props => {
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const handleUserAdd = () => {
		setIsDrawerVisible(false);
		props.onAddMember();
	};
	return (
		<div style={{ marginBottom: 12 }}>
			<Button onClick={() => setIsDrawerVisible(true)}>Add Member</Button>
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
