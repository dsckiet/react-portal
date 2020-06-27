import React from "react";
import { Modal } from "antd";

const UserProfile = ({ visible, openProfile, uid }) => {
	return (
		<div>
			<Modal
				centered
				visible={visible}
				footer={null}
				closable={false}
				onCancel={() => openProfile(false)}
			>
				{uid}
			</Modal>
		</div>
	);
};

export default UserProfile;
