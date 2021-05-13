import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "../Layout/PageTitle";
import MemberInfoCard from "./MemberInfoCard";
import { Row, Col, Button } from "antd";
import TaskInfoCard from "./TaskInfoCard";
const ManageTasks = () => {
	const data = [
		{
			name: "Mayank Shakya",
			image:
				"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg",
			role: "Lead",
			type: "head"
		},
		{
			name: "Mayank Shakya",
			image:
				"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg",
			role: "Lead"
		}
	];
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
					{data.map(memberInfo => (
						<MemberInfoCard data={memberInfo} />
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
						{taskData.map(task => (
							<Col span={8}>
								<Link to="/task">
									<TaskInfoCard data={task} />
								</Link>
							</Col>
						))}
					</Row>

					<h3 style={{ paddingBottom: "16px" }}>Assigned Tasks</h3>
					<Row gutter={[4, 4]}>
						{taskData.map(task => (
							<Col span={8}>
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
