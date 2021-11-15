import React, { useState, useEffect } from "react";
import { Select, Input, Divider, TreeSelect, Row, Col } from "antd";
import { getEventsService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import styled from "styled-components";

const { Option } = Select;
const { TreeNode } = TreeSelect;

const Container = styled.div`
	float: right;
`;
const ParticipantsOptions = props => {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [branch, setBranch] = useState();
	const [year, setYear] = useState();

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getEventsService();
				setEvents(data);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	const handleChange = val => {
		if (val === "All") {
			setBranch();
			setYear();
		}
		props.onEventChange(val);
	};

	const handleQuery = val => {
		props.onQuery(val);
	};

	const handleBranchChange = val => {
		setBranch(val);
		props.onBranchChange(val);
	};

	const handleYearChange = val => {
		setYear(val);
		props.onYearChange(val);
	};

	return (
		<div style={{ marginBottom: 12 }}>
			<Row justify="space-between">
				<Col span={12}>
					<TreeSelect
						style={{ minWidth: 180 }}
						dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
						placeholder="Please select"
						onChange={handleChange}
					>
						<TreeNode value="All" title="All" />
						<TreeNode
							value="Upcoming"
							title="Upcoming Events"
							selectable={false}
						>
							{events.length !== 0
								? events["upcomingEvents"].map(
										({ _id, title }) => {
											return (
												<TreeNode
													key={_id}
													value={_id}
													title={title}
												/>
											);
										}
								  )
								: null}
						</TreeNode>
						<TreeNode
							value="Past"
							title="Past Events"
							selectable={false}
						>
							{events.length !== 0
								? events["previousEvents"].map(
										({ _id, title }) => {
											return (
												<TreeNode
													key={_id}
													value={_id}
													title={title}
												/>
											);
										}
								  )
								: null}
						</TreeNode>
						<TreeNode
							value="Running"
							title="Running Events"
							selectable={false}
						>
							{events.length !== 0
								? events["runningEvents"].map(
										({ _id, title }) => {
											return (
												<TreeNode
													key={_id}
													value={_id}
													title={title}
												/>
											);
										}
								  )
								: null}
						</TreeNode>
					</TreeSelect>
					<Divider type="vertical" />
					<Input.Search
						type="text"
						style={{ width: 200 }}
						loading={isLoading}
						placeholder="Search"
						onSearch={value => handleQuery(value)}
						allowClear
					/>
				</Col>
				<Col span={12}>
					<Container>
						<Select
							placeholder="Branch"
							style={{ width: 100 }}
							onChange={handleBranchChange}
							value={branch}
							allowClear
						>
							<Option value="CSE">CSE</Option>
							<Option value="IT">IT</Option>
							<Option value="ME">ME</Option>
							<Option value="CO">CO</Option>
							<Option value="CSI">CSI</Option>
							<Option value="ECE">ECE</Option>
							<Option value="CI">CI</Option>
							<Option value="EN">EN</Option>
							<Option value="EI">EI</Option>
							<Option value="MCA">MCA</Option>
							<Option value="B.PHARMA">B.PHARMA</Option>
							<Option value="M.PHARMA">M.PHARMA</Option>
							<Option value="MBA">MBA</Option>
						</Select>
						<Divider type="vertical" />
						<Select
							placeholder="Year"
							style={{ width: 80 }}
							onChange={handleYearChange}
							value={year}
							allowClear
						>
							<Option value="1">1st</Option>
							<Option value="2">2nd</Option>
							<Option value="3">3rd</Option>
							<Option value="4">4th</Option>
						</Select>
					</Container>
				</Col>
			</Row>
		</div>
	);
};

export default ParticipantsOptions;
