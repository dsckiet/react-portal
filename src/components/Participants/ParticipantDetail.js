import React, { useEffect, useState } from "react";
import { Skeleton, Timeline, Card, Avatar, Icon, Tag } from "antd";
import { getParticipantsDetailService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";

const ParticipantsDetails = props => {
	const [info, setInfo] = useState(null);
	const [eventsData, setEventsData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const params = { pid: props.participantId };
				const { data } = await getParticipantsDetailService(params);
				setInfo(data.profileData);
				setEventsData(data.events);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					{eventsData.length !== 0 ? (
						eventsData.map((event, id) => (
							<Timeline.Item
								key={id}
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
					) : (
						<div>Not regeistered in any Event</div>
					)}
				</Timeline>
			</Skeleton>
		</>
	);
};

export default ParticipantsDetails;
