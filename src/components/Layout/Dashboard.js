import React, { useState } from "react";
import { Row, Col } from "antd";
import PageTitle from "./PageTitle";
import "./style.css";
import { DashCards } from "./DashCards";
import EditTodoModal from "./EditTodoModal";
import ToDo from "./ToDo";

const Dashboard = props => {
	const [refresh, setRefresh] = useState(false);
	const [edit, setEdit] = useState(null);
	const [visible, setVisible] = useState(false);

	return (
		<>
			<div className="dashboard-section">
				<PageTitle title="Dashboard" bgColor="#0F9D58" />

				<div className="sub-components">
					<Row gutter={[16, 16]}>
						<Col xs={24} sm={24} xl={16} lg={16} md={12}>
							<DashCards />
						</Col>
						<Col xs={24} sm={24} lg={8} xl={8} md={12}>
							<ToDo
								refresh={refresh}
								setRefresh={setRefresh}
								setVisible={setVisible}
								setEdit={setEdit}
							/>
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
