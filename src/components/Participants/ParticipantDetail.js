import React, { useEffect, useState } from "react";
import { Skeleton, Timeline, Card, Avatar, Tag } from "antd";
import { PhoneOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { getParticipantsDetailService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import moment from "moment";

const ParticipantsDetails = props => {
	const [info, setInfo] = useState(null);
	const [eventsData, setEventsData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [attendance, setAttendance] = useState(null);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const params = { pid: props.participantId };
				const { data } = await getParticipantsDetailService(params);

				setInfo(data.profileData);
				setEventsData(data.events);
				attendanceCalc(data.events);
				// let date = [];

				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const attendanceCalc = events => {
		if (events) {
			events.forEach(event => {
				let start = new Date(event.details.startDate);
				let end = new Date(event.details.endDate);
				let data = [];
				let dayAttend = [];
				dayAttend = event.attendance.daysAttended.map(d => {
					return d.split("T")[0];
				});

				let status;
				for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
					if (
						dayAttend.includes(
							moment(new Date(d)).format("YYYY-MM-DD")
						)
					) {
						status = "Present";
					} else if (
						!dayAttend.includes(
							moment(new Date(d)).format("YYYY-MM-DD")
						) &&
						moment(new Date(d)).format("YYYY-MM-DD") <
							moment(Date.now()).format("YYYY-MM-DD")
					) {
						status = "Absent";
					} else if (
						!dayAttend.includes(
							moment(new Date(d)).format("YYYY-MM-DD")
						)
					) {
						status = "Pending";
					}
					data.push({
						status,
						date: moment(new Date(d)).format("YYYY-MM-DD")
					});
				}
				event.attendance.dayWiseAttendance = data;
			});
			setEventsData(events);
		}
	};

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
									<PhoneOutlined /> {info.phone}{" "}
									<InfoCircleOutlined /> {info.branch},{" "}
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
									<span style={{ fontWeight: "700" }}>
										{event.details.title}
									</span>{" "}
									<Tag>{event.status.toUpperCase()}</Tag>
									<Tag
										color={
											event.isRsvpAccepted
												? "green"
												: "red"
										}
									>
										{event.isRsvpAccepted
											? "RSVP: Accepted"
											: "RSVP: Not Accepted"}
									</Tag>
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
								<p style={{ fontWeight: "600" }}>Attendance</p>
								<div style={{ display: "flex" }}>
									{event.attendance.dayWiseAttendance &&
										event.attendance.dayWiseAttendance.map(
											(attendance, id) => {
												return (
													<Tag
														key={id}
														color={
															attendance.status ===
															"Pending"
																? "#108ee9"
																: attendance.status ===
																  "Present"
																? "#87d068"
																: "#f50"
														}
													>
														{moment(
															attendance.date
														).format("DD/MM/YYYY")}
														- {attendance.status}
													</Tag>
												);
											}
										)}
								</div>
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
