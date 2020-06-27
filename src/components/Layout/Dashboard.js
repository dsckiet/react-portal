import React, { useEffect, useState } from "react";
import { Row, Col, Card, Icon, Checkbox, Input } from "antd";

import PageTitle from "./PageTitle";
import "./style.css";
import { DashCards } from "./DashCards";

export default props => {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState(
		localStorage.getItem("todos")
			? JSON.parse(localStorage.getItem("todos"))
			: []
	);

	useEffect(() => {
		if (todos) {
			localStorage.setItem("todos", JSON.stringify(todos));
		}
	}, [todos]);

	const handleAddTodo = val => {
		let el = { value: val, isChecked: false };
		setTodos([...todos, el]);
		setTodo("");
	};

	const handleCheckChange = todo => {
		let el = { value: todo.value, isChecked: !todo.isChecked };
		let temptodo = todos.filter(td => td.value !== todo.value);
		setTodos([...temptodo, el]);
	};

	const deleteTodo = todo => {
		let temptodo = todos.filter(td => td.value !== todo.value);
		setTodos([...temptodo]);
	};

	return (
		<>
			<div className="dashboard-section">
				<PageTitle title="Dashboard" />
				<div className="sub-components">
					<Row gutter={[16, 16]}>
						<Col span={18}>
							<DashCards />
						</Col>
						<Col span={6}>
							<Card>
								<h2 style={{ fontWeight: 700 }}>Todo</h2>
								<hr />
								{todos.length > 0
									? todos.map((todo, idx) => (
											<h3 key={idx}>
												<Checkbox
													checked={todo.isChecked}
													onChange={() =>
														handleCheckChange(todo)
													}
												>
													<span
														style={
															todo.isChecked
																? {
																		textDecoration:
																			"line-through"
																  }
																: {}
														}
													>
														{todo.value}
													</span>
												</Checkbox>
												<Icon
													type="delete"
													onClick={() =>
														deleteTodo(todo)
													}
													style={{
														color: "#DB4437",
														float: "right",
														cursor: "pointer"
													}}
												/>
											</h3>
									  ))
									: "No Todo"}

								<div
									style={{
										backgroundColor: "#F4B400",
										padding: 2,
										marginBottom: 8,
										marginTop: 16
									}}
								></div>

								<Input
									placeholder="Type your To Do"
									allowClear
									value={todo}
									onChange={e => setTodo(e.target.value)}
									onPressEnter={e =>
										handleAddTodo(e.target.value)
									}
								/>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};
