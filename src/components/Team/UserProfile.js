import React from "react";
import { Modal, Row, Col, Divider, Tag } from "antd";
import styled from "styled-components";
import profilePic from "../../utils/assets/images/mayank_shakya.jpg";
import { MdEmail } from "react-icons/md";
import {
	FaTwitterSquare,
	FaGithubSquare,
	FaBirthdayCake
} from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { AiFillLinkedin, AiFillPhone } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";

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
	padding-top: 30px;
`;

const Name = styled.p`
	font-size: 23px;
	font-weight: 700;
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
	&:hover {
		transition: 0.2s all ease-in;

		color: #4285f4;
	}
`;

const Wrapper = styled.div`
	padding: 10px 24px;
`;

const UserProfile = ({ visible, openProfile, uid }) => {
	return (
		<div>
			<Modal
				visible={visible}
				footer={null}
				closable={false}
				onCancel={() => openProfile(false)}
			>
				<IoIosArrowRoundBack style={{ fontSize: "28px" }} />
				<Wrapper>
					<Row gutter={16}>
						<Col span={10}>
							<ImageContainer>
								<Image
									loading="lazy"
									src={profilePic}
									alt="Profilepic"
								/>
							</ImageContainer>
						</Col>
						<Col span={14}>
							<NameContainer>
								<Name>
									Mayank Shakya <br />
									<Tag color="lime">Developer</Tag> <br />
								</Name>
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
									<Info>9695414203</Info>
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
									<Info>28 July 1999</Info>
								</Col>
							</Row>
						</Col>
					</Row>
					<Divider style={{ color: "rgba(0,0,0,.25)" }}>
						Contact Me
					</Divider>
					<Row style={{ textAlign: "center" }}>
						<Col span={2}></Col>
						<Col span={4}>
							<LogoStyle>
								<AiFillLinkedin />
							</LogoStyle>
						</Col>
						<Col span={4}>
							<LogoStyle>
								<FaTwitterSquare />
							</LogoStyle>
						</Col>
						<Col span={4}>
							<LogoStyle>
								<MdEmail />
							</LogoStyle>
						</Col>
						<Col span={4}>
							<LogoStyle>
								<FiLink />
							</LogoStyle>
						</Col>
						<Col span={4}>
							<LogoStyle>
								<FaGithubSquare />
							</LogoStyle>
						</Col>
						<Col span={2}></Col>
					</Row>
				</Wrapper>
			</Modal>
		</div>
	);
};

export default UserProfile;
