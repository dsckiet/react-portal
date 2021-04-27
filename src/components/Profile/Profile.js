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
import "./style.css";

const Profile = () => {
	const [showSkeleton, setShowSkeleton] = useState(false);
	const Creds = getRole();
	const [user, setUser] = useState(null);
	const [profileDrawer, setProfileDrawer] = useState(false);
	const [passwordDrawer, setPasswordDrawer] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const Image = styled.img`
		width: 120px;
		border-radius: 50%;
		padding: 4px;
		border: 2px solid #d5d5d5;
		transition: 0.2s all ease-out;
		&:hover {
			transition: 0.2s all ease-in;
			border: 4px solid #4285f4;
		}
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
				<>
					<Row gutter={16}>
						<Col xs={0} sm={0} md={4} lg={6}></Col>
						<Col
							xs={24}
							sm={24}
							md={8}
							lg={6}
							className="profile-image-container"
						>
							<Image
								src={
									user && user.image
										? user.image
										: "https://avatars.dicebear.com/v2/identicon/16042.svg"
								}
								alt="Profilepic"
							/>
						</Col>

						<Col xs={24} sm={24} md={9} lg={6}>
							<Row className="name center-align-row">
								{user && user.name
									? user.name
									: "Not Available"}
							</Row>
							<Row className="center-align-row tag">
								<Tag
									color={
										user && user.role === "lead"
											? "red"
											: user && user.role === "core"
											? "geekblue"
											: "orange"
									}
									style={{
										textTransform: "capitalize",
										fontSize: "14px",
										textAlign: "center"
									}}
								>
									{user && user.role ? user.role : "member"}
								</Tag>
							</Row>
							<Row className="branch center-align-row">
								<Col xs={0} sm={3} md={0}></Col>
								<Col
									xs={3}
									sm={2}
									md={4}
									lg={3}
									className="icon"
								>
									<FaUserGraduate />
								</Col>
								<Col
									xs={5}
									sm={3}
									md={6}
									lg={6}
									className="text"
								>
									{user && user.branch ? user.branch : "N/A"}
								</Col>
								<Col
									xs={3}
									sm={2}
									md={4}
									lg={3}
									className="icon"
								>
									<AiFillCalendar />
								</Col>
								<Col
									xs={5}
									sm={5}
									md={6}
									lg={6}
									className="text"
								>
									{user && user.year ? user.year : "N/A"}
								</Col>
								<Col xs={0} sm={0}></Col>
							</Row>
						</Col>
						<Col xs={0} sm={0} md={3} lg={6}></Col>
					</Row>
					<Divider style={{ color: "rgba(0,0,0,.25)" }}>
						Personal Information
					</Divider>
					<Row>
						<Col xs={0} sm={0} md={2} lg={6}></Col>
						<Col xs={24} sm={12} md={10} lg={6}>
							<Row
								style={{ justifyContent: "center" }}
								className="contact-container"
							>
								<Col
									xs={6}
									sm={6}
									md={6}
									lg={8}
									className="logos"
								>
									<AiFillPhone style={{ fontSize: "26px" }} />
								</Col>
								<Col
									xs={10}
									sm={10}
									md={12}
									lg={16}
									className="info"
								>
									{user && user.contact
										? user.contact
										: "Not Provided"}
								</Col>
							</Row>
						</Col>
						<Col xs={24} sm={12} md={10} lg={6}>
							<Row
								style={{
									justifyContent: "center"
								}}
								className="dob-container"
							>
								<Col xs={6} sm={6} lg={8} className="logos">
									<FaBirthdayCake
										style={{ fontSize: "24px" }}
									/>
								</Col>
								<Col xs={10} sm={12} lg={12} className="info">
									{user && user.dob
										? user.dob.split("T")[0]
										: "Not Provided"}
								</Col>
							</Row>
						</Col>
						<Col xs={0} sm={0} md={2} lg={6}></Col>
					</Row>
					<Divider style={{ color: "rgba(0,0,0,.25)" }}>
						Contact Information
					</Divider>
					<Row className="social-links-container">
						{user ? (
							<>
								{user.linkedin ? (
									<Col xs={4} sm={4} md={3} lg={2}>
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
									<Col xs={4} sm={4} md={3} lg={2}>
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

								<Col xs={4} sm={4} md={3} lg={2}>
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
									<Col xs={4} sm={4} md={3} lg={2}>
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
									<Col xs={4} sm={4} md={3} lg={2}>
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
					</Row>
					<Divider
						style={{
							color: "rgba(0,0,0,.25)"
						}}
					>
						Bio
					</Divider>
					<Row
						style={{
							justifyContent: "center",
							textAlign: "center"
						}}
					>
						<Col sm={0} md={4} lg={6}></Col>
						<Col sm={24} md={16} lg={12}>
							{user && user.bio ? user.bio : "No Bio Available"}
						</Col>
						<Col sm={0} md={4} lg={6}></Col>
					</Row>
					<Divider style={{ color: "rgba(0,0,0,.25)" }}>
						Update Details
					</Divider>
					<Row>
						<Col sm={0} md={4} lg={6}></Col>
						<Col
							xs={24}
							sm={12}
							md={8}
							lg={6}
							className="button-container"
						>
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

						<Col
							xs={24}
							sm={12}
							md={8}
							lg={6}
							className="button-container"
						>
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
						<Col sm={0} md={4} lg={6}></Col>
					</Row>
				</>
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
