import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
	getGroupsService,
	getUsersService,
	getRole
} from "../../utils/services";
import PageTitle from "../Layout/PageTitle";
import CreateGroup from "./CreateGroup";
import { Row, Col, Button, Drawer, Tabs } from "antd";
import GroupInfoCard from "./GroupInfoCard";

const ManageGroups = () => {
	const { TabPane } = Tabs;
	const history = useHistory();
	const [groups, setGroups] = useState(null);
	const [userData] = useState(getRole());
	const [membersData, setMembersData] = useState(null);
	const [show, setShow] = useState(false);
	const [refreshGroups, setRefreshGroups] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				let params = {
					sortBy: "name"
				};
				const members = await getUsersService(params);
				if (!members.error && members.message === "success") {
					setMembersData(members.data);
				}
				const res = await getGroupsService(userData);
				if (!res.error && res.message === "success") {
					setGroups(res.data[0]);
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [userData, refreshGroups]);

	const operations = (
		<Button
			onClick={() => {
				setShow(!show);
			}}
		>
			Create Group
		</Button>
	);

	const colors = [
		{
			primary: "rgb(219,68,55)",
			secondary: "rgb(219,68,55,.1)",
			tertiary: "#fde3cf"
		},
		{
			primary: "rgb(15,157,88)",
			secondary: "rgb(15,157,88,.1)",
			tertiary: "#CFFDD6"
		},
		{
			primary: "rgb(244,180,0)",
			secondary: "rgb(244,180,0,.1)",
			tertiary: "#FDF6CF"
		},
		{
			primary: "rgb(66,133,244)",
			secondary: "rgb(66,133,244,.1)",
			tertiary: "#CFEAFD"
		}
	];

	const getInfoCardProps = info => {
		return {
			refreshGroups: refreshGroups,
			setRefreshGroups: setRefreshGroups,
			cardConfig: colors[Math.floor(Math.random() * 4)],
			memberDetails: { ...getMembers(info) },
			data: info,
			onClick: () =>
				history.push({
					pathname: `/tasks/${info._id}`,
					state: {
						memberDetails: getMembers(info),
						groupName: info.name
					}
				})
		};
	};

	const getMembers = info => {
		let heads = info.heads.map(head => {
			let data;
			membersData.forEach(member => {
				if (member._id === head) {
					data = member;
				}
			});
			return data;
		});

		let members = info.members.map(mem => {
			let data;
			membersData.forEach(member => {
				if (member._id === mem) {
					data = member;
				}
			});
			return data;
		});

		return { heads: heads, members: members, headIds: info.heads };
	};

	return (
		<>
			<PageTitle title="Groups" bgColor="#DB4437" />
			{userData?.role === "lead" ? (
				<>
					<Tabs
						defaultActiveKey="all"
						type="tabs"
						tabBarExtraContent={operations}
					>
						<TabPane tab="All Groups" key="all">
							<Row gutter={[16, 16]}>
								{groups &&
									groups[`All Groups`]?.map((info, idx) => (
										<Col lg={6} key={idx}>
											<GroupInfoCard
												{...getInfoCardProps(info)}
											/>
										</Col>
									))}
							</Row>
						</TabPane>
						<TabPane tab="My Groups" key="my">
							<>
								<>
									{groups &&
										groups[`Head Groups`].length !== 0 && (
											<Row>
												<h3>Head Groups</h3>
											</Row>
										)}
									<Row gutter={[16, 16]}>
										{groups &&
											groups[`Head Groups`]?.map(
												(info, idx) => (
													<Col lg={6} key={idx}>
														<GroupInfoCard
															{...getInfoCardProps(
																info
															)}
														/>
													</Col>
												)
											)}
									</Row>
								</>
								<>
									{groups &&
										groups[`Member Groups`].length !==
											0 && (
											<Row style={{ marginTop: "16px" }}>
												<h3>Member Groups</h3>
											</Row>
										)}

									<Row gutter={[16, 16]}>
										{groups &&
											groups[`Member Groups`]?.map(
												(info, idx) => (
													<Col lg={6} key={idx}>
														<GroupInfoCard
															{...getInfoCardProps(
																info
															)}
														/>
													</Col>
												)
											)}
									</Row>
								</>
							</>
						</TabPane>
					</Tabs>
				</>
			) : (
				<>
					<>
						{groups && groups[`Head Groups`].length !== 0 && (
							<Row>
								<h3>Head Groups</h3>
							</Row>
						)}
						<Row gutter={[16, 16]}>
							{groups &&
								groups[`Head Groups`]?.map((info, idx) => (
									<Col lg={6} key={idx}>
										<GroupInfoCard
											{...getInfoCardProps(info)}
										/>
									</Col>
								))}
						</Row>
					</>
					<>
						{groups && groups[`Member Groups`]?.length !== 0 && (
							<Row style={{ marginTop: "16px" }}>
								<h3>Member Groups</h3>
							</Row>
						)}
						<Row gutter={[16, 16]}>
							{groups &&
								groups[`Member Groups`]?.map((info, idx) => (
									<Col lg={6} key={idx}>
										<GroupInfoCard
											{...getInfoCardProps(info)}
										/>
									</Col>
								))}
						</Row>
					</>
				</>
			)}

			<Drawer
				title="Create A New Group"
				placement="right"
				closable={true}
				width={"100%"}
				destroyOnClose={true}
				onClose={() => setShow(false)}
				visible={show}
			>
				<CreateGroup
					members={membersData}
					setShow={setShow}
					setRefreshGroups={setRefreshGroups}
					refreshGroups={refreshGroups}
				/>
			</Drawer>
		</>
	);
};

export default ManageGroups;
