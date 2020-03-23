import React, { useState, useEffect } from "react";
import { Select, Input, Divider } from "antd";
import { getEventsService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";

const { Option } = Select;
export default props => {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getEventsService();
				const { upcomingEvents, previousEvents, runningEvents } = data;
				setEvents([
					...upcomingEvents,
					...previousEvents,
					...runningEvents
				]);

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
			<Select
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
			</Select>
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
