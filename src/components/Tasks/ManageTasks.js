import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PageTitle from "../Layout/PageTitle";
import MemberInfoCard from "./MemberInfoCard";
import { Row, Col, Button, Drawer } from "antd";
import TaskInfoCard from "./TaskInfoCard";
import CreateTask from "./CreateTask";
import { getTaskService, getRole } from "../../utils/services";

const ManageTasks = props => {
	const { id } = props.match.params;
	const [userData] = useState(getRole());
	const history = useHistory();
	const { memberDetails } = history.location.state;
	const [show, setShow] = useState(false);
	const [refreshTasks, setRefreshTasks] = useState(false);
	const [taskData, setTaskData] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await getTaskService(id);
				if (!res.error && res.message === "success") {
					console.log(res, "res");
					setTaskData(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [id, refreshTasks]);

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={8}>
					<PageTitle title="Group Name" bgColor="#DB4437" />
					{memberDetails.heads.map((memberInfo, idx) => (
						<MemberInfoCard
							key={idx}
							data={{ ...memberInfo, type: "head" }}
						/>
					))}
					{memberDetails.members.map((memberInfo, idx) => (
						<MemberInfoCard data={memberInfo} key={idx} />
					))}
				</Col>
				<Col span={16}>
					<PageTitle title="Manage Tasks" bgColor="#0F9D58" />
					<Row
						style={{
							justifyContent: "space-between",
							marginBottom: "16px"
						}}
					>
						<h3>Created Tasks</h3>

						{(userData.role === "lead" ||
							memberDetails.headIds.includes(userData.id)) && (
							<Button onClick={() => setShow(true)}>
								Create Task
							</Button>
						)}
					</Row>
					<Row gutter={[4, 4]} style={{ marginBottom: "24px" }}>
						{taskData.map((task, id) => (
							<Col span={8} key={id}>
								<TaskInfoCard
									setRefreshTasks={setRefreshTasks}
									refreshTasks={refreshTasks}
									data={{ ...task, ...memberDetails }}
									onClick={() =>
										history.push({
											pathname: `/task/${task._id}`
										})
									}
									userData={userData}
								/>
							</Col>
						))}
					</Row>
				</Col>
			</Row>

			<Drawer
				title="Create A New Task"
				placement="right"
				closable={true}
				width={"100%"}
				destroyOnClose={true}
				onClose={() => setShow(false)}
				visible={show}
			>
				<CreateTask
					members={memberDetails.members}
					setShow={setShow}
					setRefreshTasks={setRefreshTasks}
					refreshTasks={refreshTasks}
					groupId={id}
				/>
			</Drawer>
		</>
	);
};

export default ManageTasks;
