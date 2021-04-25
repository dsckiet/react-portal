import React, { useState, useEffect } from "react";
import PageTitle from "../Layout/PageTitle";
import { getUserService } from "../../utils/services";
import { _notification } from "./../../utils/_helpers";
import { getRole } from "../../utils/services";
import { Skeleton, Row, Col, Tag, Divider, Button } from "antd";
import styled from "styled-components";
import {
	FaTwitterSquare,
	FaGithubSquare,
	FaBirthdayCake,
	FaUserGraduate
} from "react-icons/fa";
import { AiFillLinkedin, AiFillPhone, AiFillCalendar } from "react-icons/ai";
import { FiLink } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import UpdateOptions from "./UpdateOptions";

const Profile = () => {
	const [showSkeleton, setShowSkeleton] = useState(false);
	const Creds = getRole();
	const [user, setUser] = useState(null);
	const [profileDrawer, setProfileDrawer] = useState(false);
	const [passwordDrawer, setPasswordDrawer] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const NameContainer = styled.div`
		padding-top: 20px;
	`;

	const Name = styled.div`
		font-size: 23px;
		font-weight: 700;
	`;

	const Branch = styled.div`
		padding-top: 10px;
	`;

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

	const handleUpdateUser = () => {
		setProfileDrawer(false);
	};

	const Refresh = () => {
		setRefresh(!refresh);
	};

	const handleUpdatePassword = () => {
		setPasswordDrawer(false);
	};

	useEffect(() => {
		(async () => {
			setShowSkeleton(true);
			try {
				if (true) {
					const res = await getUserService(Creds.id);
					if (res.message === "success") {
						setUser(res.data);
						setShowSkeleton(false);
					} else {
						_notification("warning", "Error", res.message);
					}
				}
			} catch (err) {
				_notification("error", "Error", err.message);
				setShowSkeleton(false);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	return (
		<>
			<PageTitle title="Profile" bgColor="#DB4437" />
			<Skeleton loading={showSkeleton} active>
				<Row>
					<Col span={24}>
						<>
							<Row gutter={16}>
								<Col span={5}>
									<ImageContainer>
										<Image
											src={
												user && user.image
													? user.image
													: "https://avatars.dicebear.com/v2/identicon/16042.svg"
											}
											alt="Profilepic"
										/>
									</ImageContainer>
								</Col>
								<Col span={0}></Col>
								<Col span={14}>
									<NameContainer>
										<Name>
											{user && user.name
												? user.name
												: "Not Available"}
											<br />
											<Tag
												color={
													user && user.role === "lead"
														? "red"
														: user &&
														  user.role === "core"
														? "geekblue"
														: "orange"
												}
												style={{
													marginTop: "5px",
													marginBottom: "5px",
													textTransform: "capitalize",
													fontSize: "14px",
													width: "20%",
													textAlign: "center"
												}}
											>
												{user && user.role
													? user.role
													: "member"}
											</Tag>
											<br />
										</Name>
										<Branch>
											<Row gutter={12}>
												<Col
													xl={2}
													lg={3}
													md={4}
													sm={5}
													xs={6}
													style={{
														paddingTop: "2px"
													}}
												>
													<FaUserGraduate />
												</Col>
												<Col
													xl={4}
													lg={5}
													md={6}
													sm={7}
													xs={8}
												>
													{user && user.branch
														? user.branch
														: "N/A"}
												</Col>
												<Col
													xl={2}
													lg={3}
													md={4}
													sm={5}
													xs={6}
													style={{
														paddingTop: "2px"
													}}
												>
													<AiFillCalendar />
												</Col>
												<Col>
													{user && user.year
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
												{user && user.contact
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
												{user && user.dob
													? user.dob.split("T")[0]
													: "Not Provided"}
											</Info>
										</Col>
									</Row>
								</Col>
							</Row>
							<Divider style={{ color: "rgba(0,0,0,.25)" }}>
								Contact Information
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

								{user ? (
									<>
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
									</>
								) : null}

								<Col span={2}></Col>
							</Row>
							<Divider style={{ color: "rgba(0,0,0,.25)" }}>
								Bio
							</Divider>
							<Row>
								{user && user.bio
									? user.bio
									: "No Bio Available"}
							</Row>
							<Divider style={{ color: "rgba(0,0,0,.25)" }}>
								Update Details
							</Divider>
							<Row>
								<Col span={8}>
									<Button
										type="primary"
										className="login-form-button"
										onClick={() => {
											setProfileDrawer(true);
										}}
									>
										Update Details
									</Button>
								</Col>
								<Col span={8}></Col>
								<Col span={8}>
									<Button
										type="primary"
										className="login-form-button"
										onClick={() => {
											setPasswordDrawer(true);
										}}
									>
										Change Password
									</Button>
								</Col>
							</Row>
						</>
					</Col>
				</Row>
				<UpdateOptions
					profileDrawer={profileDrawer}
					setProfileDrawer={setProfileDrawer}
					userData={Creds}
					handleUpdateUser={handleUpdateUser}
					Refresh={Refresh}
				/>
				<UpdateOptions
					passwordDrawer={passwordDrawer}
					setPasswordDrawer={setPasswordDrawer}
					userData={Creds}
					handleUpdatePassword={handleUpdatePassword}
				/>
			</Skeleton>
		</>
	);
};

export default Profile;
