import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGroupsService, getUsersService } from "../../utils/services";
import PageTitle from "../Layout/PageTitle";
import CreateGroup from "./CreateGroup";
import { Row, Col, Button, Drawer } from "antd";
import GroupInfoCard from "./GroupInfoCard";

const ManageGroups = ({ data }) => {
	//const [groups, setGroups] = useState(null);
	const [membersData, setMembersData] = useState(null);
	const [show, setShow] = useState(false);
	const groupInfo = [
		{
			groupName: "Web Frontend"
		},
		{
			groupName: "Web Backend"
		}
	];

	useEffect(() => {
		(async () => {
			try {
				let params = {
					sortBy: "name"
				};
				const members = await getUsersService(params);
				console.log(members, "hhhh");
				if (!members.error && members.message === "success") {
					console.log(members);
					setMembersData(members.data);
				}
				const res = await getGroupsService();
				if (!res.error && res.message === "success") {
					//setGroups(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<>
			<PageTitle title="Groups" bgColor="#DB4437" />
			<Row style={{ justifyContent: "space-between" }}>
				<h3>Your Groups</h3>
				<Button
					onClick={() => {
						setShow(!show);
					}}
				>
					Create Group
				</Button>
			</Row>
			<Row gutter={[16, 16]}>
				{groupInfo.map(info => (
					<Col lg={6}>
						<Link to="/mytasks">
							<GroupInfoCard data={info} />
						</Link>
					</Col>
				))}
			</Row>

			<Drawer
				title="Create A New Group"
				placement="right"
				closable={true}
				width={"100%"}
				destroyOnClose={true}
				onClose={() => setShow(false)}
				visible={show}
			>
				<CreateGroup members={membersData} />
			</Drawer>
		</>
	);
};

export default ManageGroups;
