import React, { useState, useEffect } from "react";
import PersonCard from "../Groups/PersonCard";
import ProgressModal from "./ProgressModal";
import StatusBar from "./StatusBar";
import CommentSection from "./CommentSection";
import { Row, Col, Button, Typography, Popconfirm } from "antd";
import { useHistory } from "react-router-dom";
import {
	deleteTaskService,
	getRole,
	getTaskAssignee
} from "../../utils/services";
import { _notification } from "../../utils/_helpers";
const { Text } = Typography;

const Task = () => {
	const [showProgressModal, setShowProgressModal] = useState(false);
	const [id, setId] = useState("");
	const history = useHistory();
	const { data } = history.location.state;
	const [userData] = useState(getRole());
	const [assigneeData, setAssigneeData] = useState({});
	const [refresh, setRefresh] = useState(false);

	let info;

	const handleShow = id => {
		setId(id);
		setShowProgressModal(!showProgressModal);
	};

	const getData = id => {
		let details;
		details = {
			...data.taskAssigneeData.filter(assignee => assignee._id === id),
			title: data.title,
			description: data.description
		};

		return details;
	};

	const handleDelete = async id => {
		try {
			const res = await deleteTaskService(id);
			if (!res.error && res.message === "success") {
				history.goBack();
				_notification("success", "Success", "Successfully Deleted!");
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	info = data.taskAssigneeData.filter(
		assignee => assignee.userData[0]._id === userData.id
	)[0];

	useEffect(() => {
		info &&
			(async () => {
				try {
					const res = await getTaskAssignee(info._id);
					if (!res.error && res.message === "success") {
						setAssigneeData(res.data);
					}
				} catch (err) {
					console.log(err);
				}
			})();
		//eslint-disable-next-line
	}, [refresh]);

	return (
		<>
			<Row
				style={{
					justifyContent: "space-between",
					textTransform: "capitalize"
				}}
			>
				<h2>{data.title}</h2>
				{(userData.role === "lead" ||
					data.headIds.includes(userData.id)) && (
					<div>
						<Popconfirm
							okText="Yes"
							cancelText="No"
							title="Are you sure about this ?"
							onConfirm={() => handleDelete(data._id)}
						>
							<Button style={{ marginRight: "1em" }}>
								Delete
							</Button>
						</Popconfirm>

						<Button>Edit</Button>
					</div>
				)}
			</Row>
			{
				<Text code style={{ display: "flex", fontSize: "1.1rem" }}>
					{data.description}
				</Text>
			}
			<br />
			{(userData.role === "lead" ||
				data.headIds.includes(userData.id)) && (
				<>
					<h3>Assigned To :</h3>
					<Row gutter={[16, 16]}>
						{data.taskAssigneeData.map(assignee => (
							<Col
								xs={12}
								sm={12}
								md={8}
								lg={6}
								xl={4}
								key={assignee._id}
							>
								<PersonCard
									member={assignee.userData[0]}
									handleSelect={() =>
										handleShow(assignee._id)
									}
								/>
							</Col>
						))}
					</Row>
				</>
			)}
			{!data.headIds.includes(userData.id) && (
				<>
					<br />
					<StatusBar
						status={assigneeData.status}
						data={assigneeData}
						refresh={refresh}
						setRefresh={setRefresh}
					/>
					<br />
					<h3>Added Comments</h3>
					<CommentSection details={info} />
				</>
			)}
			<ProgressModal
				visible={showProgressModal}
				handleShow={handleShow}
				data={getData(id)}
				destroy={true}
			/>
		</>
	);
};

export default Task;
