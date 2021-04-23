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
	const handleEdit = async e => {
		e.preventDefault();
		if (data !== "") {
			try {
				const res = await editTodo(todo._id, { title: data });
				if (!res.error && res.message === "success") {
					setRefresh(!refresh);
					handleVisible(!visible);
					setData(null);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		setData(todo ? todo.title : null);
	}, [todo]);

	return (
		<>
			<Modal
				visible={visible}
				footer={null}
				closable={false}
				onCancel={() => handleVisible(!visible)}
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
								setData(e.target.value);
							}}
							onPressEnter={handleEdit}
						/>
					</Row>
					<Row style={{ paddingTop: "20px" }}>
						<SaveButton
							type="primary"
							htmlType="submit"
							onClick={handleEdit}
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
