import React from "react";
import { Link, useHistory } from "react-router-dom";
import PageTitle from "../Layout/PageTitle";
import MemberInfoCard from "./MemberInfoCard";
import { Row, Col, Button } from "antd";
import TaskInfoCard from "./TaskInfoCard";
const ManageTasks = props => {
	//const { id } = props.match.params;
	const history = useHistory();
	const { memberDetails } = history.location.state;

	const taskData = [
		{
			taskName: "Task 1",
			dueDate: "10/20/3030"
		},
		{
			taskName: "Task 2",
			dueDate: "10/20/3030"
		},
		{
			taskName: "Task 3",
			dueDate: "10/20/3030"
		}
	];
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

						<Button>Create Task</Button>
					</Row>
					<Row gutter={[4, 4]} style={{ marginBottom: "24px" }}>
						{taskData.map((task, id) => (
							<Col span={8} key={id}>
								<Link to="/task">
									<TaskInfoCard data={task} />
								</Link>
							</Col>
						))}
					</Row>

					<h3 style={{ paddingBottom: "16px" }}>Assigned Tasks</h3>
					<Row gutter={[4, 4]}>
						{taskData.map((task, id) => (
							<Col span={8} key={id}>
								<Link to="/task">
									<TaskInfoCard data={task} />
								</Link>
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default ManageTasks;
