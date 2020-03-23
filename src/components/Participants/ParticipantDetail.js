import React, { useEffect, useState } from "react";
import { Skeleton, Timeline, Card, Avatar, Icon, Tag } from "antd";
import { getParticipantsDetailService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";

export default props => {
	const [info, setInfo] = useState(null);
	const [eventsData, setEventsData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const params = { participantId: props.participantId };
				const { data } = await getParticipantsDetailService(params);
				setInfo(data.profileData);
				setEventsData(data.events);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	return (
		<>
			<Skeleton avatar loading={isLoading} active>
				{info ? (
					<Card loading={isLoading}>
						<Card.Meta
							avatar={
								<Avatar src="https://avatars.dicebear.com/v2/identicon/12324.svg" />
							}
							title={`${info.name} (${info.email})`}
							description={
								<>
									<Icon type="phone" /> {info.phone}{" "}
									<Icon type="info" /> {info.branch},
									{info.year}
								</>
							}
						/>
					</Card>
				) : null}
				<br />
				<br />
				<h3>Events Information</h3>
				<br />
				<Timeline>
					{eventsData
						? eventsData.map(event => (
								<Timeline.Item
									color={
										event.status === "not attended"
											? "red"
											: "green"
									}
								>
									<p>
										{event.details.title}{" "}
										<Tag>{event.status.toUpperCase()}</Tag>
									</p>
									<p>{event.details.description}</p>
									<p>
										{new Date(
											event.details.startDate
										).toDateString()}{" "}
										to{" "}
										{new Date(
											event.details.endDate
										).toDateString()}{" "}
										({event.details.venue})
									</p>
								</Timeline.Item>
						  ))
						: null}
				</Timeline>
			</Skeleton>
		</>
	);
};
