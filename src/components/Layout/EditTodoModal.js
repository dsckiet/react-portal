import React, { useState, useEffect } from "react";
import { Row, Button, Modal, Input } from "antd";
import styled from "styled-components";
import { IoIosArrowRoundBack } from "react-icons/io";
import { editTodo } from "../../utils/services";
const Wrapper = styled.div`
	padding: 10px 20px;
`;
const Head = styled.div`
	padding-bottom: 20px;
	font-size: 16px;
`;

const SaveButton = styled(Button)`
	background-color: #ffffff !important;
	color: #1890ff !important;
	border: 2px solid #1890ff !important;
`;

const EditTodoModal = ({
	visible,
	handleVisible,
	todo,
	refresh,
	setRefresh
}) => {
	const [data, setData] = useState(null);
	const [isTodoInputValid, setIsTodoInputValid] = useState(true);

	const handleOnClose = () => {
		setIsTodoInputValid(true);
		handleVisible(!visible);
	};

	const handleOnChangeTodo = data => {
		if (data && !data) {
			if (!isTodoInputValid) setIsTodoInputValid(true);
			setData("");
			return;
		}
		if (data.length < 7 && isTodoInputValid) setIsTodoInputValid(false);
		if (data.length >= 7 && !isTodoInputValid) setIsTodoInputValid(true);
		setData(data);
	};

	const handleEditTodo = async data => {
		if (!data || data.length < 7) return;
		try {
			const res = await editTodo(todo._id, { title: data });
			if (!res.error && res.message === "success") {
				handleVisible(!visible);
				setRefresh(!refresh);
				setData(null);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		setData(todo ? todo.title : null);
	}, [todo, visible]);

	return (
		<>
			<Modal
				visible={visible}
				footer={null}
				closable={true}
				onCancel={() => handleOnClose()}
				destroyOnClose={true}
			>
				<IoIosArrowRoundBack
					onClick={() => handleVisible(!visible)}
					style={{ fontSize: "28px", cursor: "pointer" }}
				/>

				<Wrapper
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<Head>
						<Row>Edit your ToDo</Row>
					</Head>
					<Row>
						<Input
							placeholder="Type your To Do"
							allowClear
							value={data}
							onChange={e => {
								handleOnChangeTodo(e.target.value);
							}}
							onPressEnter={e => handleEditTodo(e.target.value)}
							style={
								!isTodoInputValid ? { borderColor: "red" } : {}
							}
						/>
					</Row>
					<Row style={{ paddingTop: "20px" }}>
						<SaveButton
							type="primary"
							htmlType="submit"
							onClick={e => handleEditTodo(data)}
						>
							Save
						</SaveButton>
					</Row>
				</Wrapper>
			</Modal>
		</>
	);
};

export default EditTodoModal;
