import React, { useState } from "react";
import { Button, Drawer } from "antd";
import CreateEvent from "../Events/CreateEvent";

export default props => {
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const handleEventAdd = () => {
		setIsDrawerVisible(false);
		props.onAddEvent();
	};
	return (
		<div style={{ marginBottom: 12 }}>
			<Button onClick={() => setIsDrawerVisible(true)}>
				Create Event
			</Button>
			<Drawer
				title="Create Event"
				placement="right"
				closable={true}
				width="40%"
				destroyOnClose={true}
				onClose={() => setIsDrawerVisible(false)}
				visible={isDrawerVisible}
			>
				<CreateEvent onAddEvent={handleEventAdd} />
			</Drawer>
		</div>
	);
};
