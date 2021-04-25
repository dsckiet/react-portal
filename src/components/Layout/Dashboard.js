import React, { useEffect, useState } from "react";
import {
	Row,
	Col,
	Card,
	Icon,
	Checkbox,
	Input,
	Button,
	Tooltip,
	Popconfirm
} from "antd";
import PageTitle from "./PageTitle";
import "./style.css";
import { DashCards } from "./DashCards";
import {
	getTodo,
	addTodo,
	updateTodo,
	deleteTodo,
	deleteAllTodo
} from "../../utils/services";
import { _notification } from "./../../utils/_helpers";
import EditTodoModal from "./EditTodoModal";

const Dashboard = props => {
	const [todo, setTodo] = useState("");
	const [refresh, setRefresh] = useState(false);
	const [todos, setTodos] = useState(null);
	const [edit, setEdit] = useState(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const res = await getTodo();
				if (!res.error && res.message === "success") {
					setTodos(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		})();
		if (todos) {
			localStorage.setItem("todos", JSON.stringify(todos));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	const handleAddTodo = async val => {
		if (val !== "") {
			// if (edit && edit.edit) {
			// 	try {
			// 		const res = await editTodo(edit.id, { title: val });
			// 		if (!res.error && res.message === "success") {
			// 			setEdit(null);
			// 			setRefresh(!refresh);
			// 		}
			// 	} catch (err) {
			// 		console.log(err);
			// 	}
			// } else {
			try {
				const res = await addTodo({ title: val });
				if (!res.error && res.message === "success") {
					setRefresh(!refresh);
				}
			} catch (err) {
				console.log(err);
			}
		}
		setTodo("");
	};

	const handleTodoCompletion = async todo => {
		try {
			const res = await updateTodo(todo._id, {
				status: todo.status === "pending" ? "complete" : "pending"
			});
			if (!res.error && res.message === "success") {
				setRefresh(!refresh);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteTodo = async todo => {
		try {
			const res = await deleteTodo(todo._id);
			if (!res.error && res.message === "success") {
				setRefresh(!refresh);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteAllTodo = async () => {
		try {
			const res = await deleteAllTodo();
			if (!res.error && res.message === "success") {
				setRefresh(!refresh);
				_notification(
					"success",
					"ToDo Deleted",
					"All ToDo were successfully deleted"
				);
			}
		} catch (err) {
			_notification("error", "Error", err.message);
		}
	};

	return (
		<>
			<div className="dashboard-section">
				<PageTitle title="Dashboard" bgColor="#0F9D58" />

				<div className="sub-components">
					<Row gutter={[16, 16]}>
						<Col span={18}>
							<DashCards />
						</Col>
						<Col span={6}>
							<Card>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between"
									}}
								>
									<h2 style={{ fontWeight: 700 }}>Todo</h2>
									<span>
										<Popconfirm
											title="Do you want to delete all Todo ?"
											onConfirm={handleDeleteAllTodo}
											okText="Yes"
											cancelText="No"
											disabled={
												todos && todos.length === 0
													? true
													: false
											}
										>
											<Tooltip title="Delete All">
												<Button
													danger
													disabled={
														todos &&
														todos.length === 0
															? true
															: false
													}
												>
													<Icon
														type="delete"
														style={{
															color: "#ffffff",
															cursor: "pointer"
														}}
													/>
												</Button>
											</Tooltip>
										</Popconfirm>
									</span>
								</div>
								<hr />
								<div>
									{todos && todos.length > 0
										? todos.map(todo => (
												<>
													<Row
														key={todo._id}
														style={
															todo.status !==
															"pending"
																? {
																		display:
																			"flex",
																		flexDirection:
																			"row",
																		overflowWrap:
																			"anywhere",
																		alignItems:
																			"center",
																		margin:
																			"5px 0px",
																		padding:
																			"2px 5px",
																		borderRadius:
																			"4px",
																		border:
																			"1px solid rgb(24,144,255,0.3)",
																		backgroundColor:
																			"rgb(24,144,255,0.05)"
																  }
																: {
																		display:
																			"flex",
																		flexDirection:
																			"row",
																		overflowWrap:
																			"anywhere",
																		alignItems:
																			"center",
																		margin:
																			"5px 0px",
																		padding:
																			"2px 5px",
																		borderRadius:
																			"4px",
																		border:
																			"1px solid rgb(191,191,191,.3)",
																		backgroundColor:
																			"rgb(191,191,191,.05)"
																  }
														}
													>
														<Col span={20}>
															<Checkbox
																style={{
																	display:
																		"flex",
																	flexDirection:
																		"row",
																	overflowWrap:
																		"anywhere",
																	alignItems:
																		"center",
																	paddingTop:
																		"3px"
																}}
																checked={
																	todo.status ===
																	"complete"
																		? true
																		: false
																}
																onChange={() =>
																	handleTodoCompletion(
																		todo
																	)
																}
															>
																<span
																	style={
																		todo.status ===
																		"complete"
																			? {
																					textDecoration:
																						"line-through"
																			  }
																			: {}
																	}
																>
																	{todo.title}
																</span>
															</Checkbox>
														</Col>
														<Col span={2}>
															<Icon
																type="edit"
																onClick={() => {
																	setVisible(
																		true
																	);
																	setEdit(
																		todo
																	);
																}}
																style={{
																	color:
																		"#F4B400",
																	float:
																		"right",
																	cursor:
																		"pointer"
																}}
															/>
														</Col>
														<Col span={2}>
															<Popconfirm
																title="Do you want to delete this Todo ?"
																onConfirm={() =>
																	handleDeleteTodo(
																		todo
																	)
																}
																okText="Yes"
																cancelText="No"
															>
																<Icon
																	type="delete"
																	style={{
																		color:
																			"#DB4437",
																		float:
																			"right",
																		cursor:
																			"pointer"
																	}}
																/>
															</Popconfirm>
														</Col>
													</Row>
												</>
										  ))
										: "No Todo"}
								</div>

								<div
									style={{
										backgroundColor: "#F4B400",
										padding: 2,
										marginBottom: 8,
										marginTop: 16
									}}
								></div>
								<Row justify="space-between">
									<Col>
										<Input
											maxLength="72"
											placeholder="Type your To Do"
											allowClear
											value={todo}
											onChange={e =>
												setTodo(e.target.value)
											}
											onPressEnter={e =>
												handleAddTodo(e.target.value)
											}
										/>
									</Col>
								</Row>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
			<EditTodoModal
				visible={visible}
				handleVisible={setVisible}
				todo={edit}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
		</>
	);
};

export default Dashboard;
