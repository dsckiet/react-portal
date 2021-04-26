import React from "react";
import { Drawer } from "antd";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const UpdateOptions = ({
	profileDrawer,
	setProfileDrawer,
	userData,
	handleUpdateUser,
	handleUpdatePassword,
	passwordDrawer,
	setPasswordDrawer,
	Refresh
}) => {
	return (
		<>
			<div>
				<Drawer
					title="Update Profile"
					placement="right"
					closable={true}
					width={window.innerWidth < 420 ? "70%" : "35%"}
					destroyOnClose={true}
					onClose={() => setProfileDrawer(false)}
					visible={profileDrawer}
				>
					<UpdateProfile
						userData={userData}
						onUpdateUser={handleUpdateUser}
						Refresh={Refresh}
					/>
				</Drawer>
				<Drawer
					title="Change Password"
					placement="right"
					closable={true}
					width={window.innerWidth < 420 ? "70%" : "35%"}
					destroyOnClose={true}
					onClose={() => setPasswordDrawer(false)}
					visible={passwordDrawer}
				>
					<UpdatePassword
						userData={userData}
						onUpdatePassword={handleUpdatePassword}
					/>
				</Drawer>
			</div>
		</>
	);
};

export default UpdateOptions;
