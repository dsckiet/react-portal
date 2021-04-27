import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Divider, Tag, Skeleton } from "antd";
import styled from "styled-components";
import { MdEmail } from "react-icons/md";
import {
	FaTwitterSquare,
	FaGithubSquare,
	FaBirthdayCake,
	FaUserGraduate
} from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { AiFillLinkedin, AiFillPhone, AiFillCalendar } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getUserService } from "../../utils/services";
import { _notification } from "./../../utils/_helpers";
import moment from "moment";

// const Months = [
// 	"Jan",
// 	"Feb",
// 	"Mar",
// 	"April",
// 	"May",
// 	"June",
// 	"July",
// 	"Aug",
// 	"Sep",
// 	"Oct",
// 	"Nov",
// 	"Dec"
// ];

const ImageContainer = styled.div`
	align-items: center;
`;

const Image = styled.img`
	width: 70%;
	border-radius: 50%;
	padding: 4px;
	border: 2px solid #d5d5d5;
	transition: 0.2s all ease-out;
	&:hover {
		transition: 0.2s all ease-in;
		border: 4px solid #4285f4;
	}
`;

const NameContainer = styled.div`
	padding-top: 10px;
`;

const Name = styled.div`
	font-size: 23px;
	font-weight: 700;
`;

const Branch = styled.div`
	padding-top: 10px;
	font-size: 16px;
`;

const Designation = styled(Col)`
	margin-top: 7px;
	font-size: 16px;
	font-weight: 400;
`;

const Logo = styled.div`
	text-align: center;
`;

const Info = styled.p`
	font-size: 16px;
	margin-top: 2px;
`;

const LogoStyle = styled.span`
	font-size: 28px;
	color: #595959;
	&:hover {
		transition: 0.2s all ease-in;

		color: #4285f4;
	}
`;

const Wrapper = styled.div`
	padding: 10px 24px;
`;

const UserProfile = ({ visible, openProfile, uid }) => {
	const [user, setUser] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);

	useEffect(() => {
		(async () => {
			setShowSkeleton(true);
			try {
				if (uid) {
					const res = await getUserService(uid);
					console.log(res);
					if (res.message === "success") {
						console.log(res.data);
						setUser(res.data);
						setShowSkeleton(false);
					} else {
						_notification("warning", "Error", res.message);
					}
				}
			} catch (err) {
				_notification("error", "Error", err.message);
			}
		})();
	}, [uid]);

	return (
		<div>
			<Modal
				visible={visible}
				footer={null}
				closable={false}
				onCancel={() => openProfile(false)}
			>
				<IoIosArrowRoundBack
					onClick={() => openProfile(false)}
					style={{ fontSize: "28px", cursor: "pointer" }}
				/>
				<Skeleton loading={showSkeleton} active>
					{user ? (
						<Wrapper>
							<Row gutter={16}>
								<Col span={10}>
									<ImageContainer>
										<Image
											src={user.image}
											alt="Profilepic"
										/>
									</ImageContainer>
								</Col>
								<Col span={14}>
									<NameContainer>
										<Name>
											{user.name} <br />
											<Row style={{ paddingTop: "10px" }}>
												<Col span={12}>
													<Tag
														color={
															user.role === "lead"
																? "red"
																: user.role ===
																  "core"
																? "geekblue"
																: "orange"
														}
														style={{
															marginBottom: "5px",
															textTransform:
																"capitalize",
															fontSize: "14px",
															width: "75%",
															textAlign: "center"
														}}
													>
														{user.role}
													</Tag>
												</Col>
												<Designation span="12">
													{user.designation}
												</Designation>
											</Row>
										</Name>
										<Branch>
											<Row gutter={12}>
												<Col
													span={2}
													style={{
														paddingTop: "2px"
													}}
												>
													<FaUserGraduate />
												</Col>
												<Col span={6}>
													{user.branch
														? user.branch
														: "N/A"}
												</Col>
												<Col
													span={3}
													style={{
														marginTop: "2px"
													}}
												>
													<AiFillCalendar />
												</Col>
												<Col>
													{user.year
														? user.year
														: "N/A"}
												</Col>
											</Row>
										</Branch>
									</NameContainer>
								</Col>
							</Row>
							<Divider style={{ color: "rgba(0,0,0,.25)" }}>
								Personal Information
							</Divider>
							<Row>
								<Col span={12}>
									<Row>
										<Col span={6}>
											<Logo>
												<AiFillPhone
													style={{ fontSize: "26px" }}
												/>
											</Logo>
										</Col>
										<Col span={218}>
											<Info>
												{user.contact
													? user.contact
													: "Not Provided"}
											</Info>
										</Col>
									</Row>
								</Col>
								<Col span={12}>
									<Row>
										<Col span={6}>
											<Logo>
												<FaBirthdayCake
													style={{ fontSize: "24px" }}
												/>
											</Logo>
										</Col>
										<Col span={18}>
											<Info>
												{user.dob
													? user.dob.split("T")[0]
													: "Not Provided"}
											</Info>
										</Col>
									</Row>
								</Col>
							</Row>
							<Divider style={{ color: "rgba(0,0,0,.25)" }}>
								Contact Me
							</Divider>
							<Row
								style={{
									textAlign: "center",
									marginRight: "auto !important",
									marginLeft: "auto !important",
									justifyContent: "center",
									display: "flex"
								}}
							>
								<Col span={2}></Col>
								{user.linkedin ? (
									<Col span={4}>
										<a
											href={user.linkedin}
											target="_blank"
											rel="noopener noreferrer"
										>
											<LogoStyle>
												<AiFillLinkedin />
											</LogoStyle>
										</a>
									</Col>
								) : null}
								{user.twitter ? (
									<Col span={4}>
										<a
											href={user.twitter}
											target="_blank"
											rel="noopener noreferrer"
										>
											<LogoStyle>
												<FaTwitterSquare />
											</LogoStyle>
										</a>
									</Col>
								) : null}

								<Col span={4}>
									<a
										href={`mailto:${user.email}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<LogoStyle>
											<MdEmail />
										</LogoStyle>
									</a>
								</Col>

								{user.portfolio ? (
									<Col span={4}>
										<a
											href={user.portfolio}
											target="_blank"
											rel="noopener noreferrer"
										>
											<LogoStyle>
												<FiLink />
											</LogoStyle>
										</a>
									</Col>
								) : null}

								{user.github ? (
									<Col span={4}>
										<a
											href={user.github}
											target="_blank"
											rel="noopener noreferrer"
										>
											<LogoStyle>
												<FaGithubSquare />
											</LogoStyle>
										</a>
									</Col>
								) : null}

								<Col span={2}></Col>
							</Row>
							<Row
								style={{
									float: "right",
									paddingBottom: "10px"
								}}
							>
								<span style={{ paddingRight: "10px" }}>
									Last active
								</span>

								<Tag color="green">
									{user.lastActiveAt
										? moment(user.lastActiveAt).format(
												"DD MMM YYYY hh:mm"
										  )
										: "never"}
								</Tag>
							</Row>
						</Wrapper>
					) : null}
				</Skeleton>
			</Modal>
		</div>
	);
};

export default UserProfile;
