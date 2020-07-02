import React, { useState, useEffect } from "react";
import { Select, Input, Divider, TreeSelect } from "antd";
import { getEventsService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";

const { Option } = Select;
const { TreeNode } = TreeSelect;
const ParticipantsOptions = props => {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getEventsService();
				// const { upcomingEvents, previousEvents, runningEvents } = data;
				// setEvents([
				// 	...upcomingEvents,
				// 	...previousEvents,
				// 	...runningEvents
				// ]);
				setEvents(data);

				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	const handleChange = val => {
		props.onEventChange(val);
	};

	const handleQuery = val => {
		props.onQuery(val);
	};

	return (
		<div style={{ marginBottom: 12 }}>
			{/* <Select
				loading={isLoading}
				style={{ minWidth: 180 }}
				defaultValue="Select Event"
				onChange={handleChange}
				notFoundContent="Data Loading"
			>
				<Option value="">All</Option>
				{events
					? events.map(({ _id, title }) => (
							<Option key={_id} value={_id}>
								{title}
							</Option>
					  ))
					: null}
			</Select> */}
			<TreeSelect
				style={{ minWidth: 180 }}
				dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
				placeholder="Please select"
				onChange={handleChange}
				defaultValue="All"
			>
				<TreeNode value="All" title="All" />
				<TreeNode
					value="Upcoming"
					title="Upcoming Events"
					selectable={false}
				>
					{events.length !== 0
						? events["upcomingEvents"].map(({ _id, title }) => {
								return (
									<TreeNode
										key={_id}
										value={_id}
										title={title}
									/>
								);
						  })
						: null}
				</TreeNode>
				<TreeNode value="Past" title="Past Events" selectable={false}>
					{events.length !== 0
						? events["previousEvents"].map(({ _id, title }) => {
								return (
									<TreeNode
										key={_id}
										value={_id}
										title={title}
									/>
								);
						  })
						: null}
				</TreeNode>
				<TreeNode
					value="Running"
					title="Running Events"
					selectable={false}
				>
					{events.length !== 0
						? events["runningEvents"].map(({ _id, title }) => {
								return (
									<TreeNode
										key={_id}
										value={_id}
										title={title}
									/>
								);
						  })
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
			/>
		</div>
	);
};

export default ParticipantsOptions;
