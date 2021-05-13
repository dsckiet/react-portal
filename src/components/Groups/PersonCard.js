import React from "react";
import { Card } from "antd";
import { HiBadgeCheck, HiCheckCircle } from "react-icons/hi";
import styled from "styled-components";

const Image = styled.img`
	width: 80px;
	height: 80px;
	margin-top: 25px;
	border-radius: 50%;
	padding: 2px;
	border: 2px solid #d5d5d5;
	position: relative;
	background-color: #ffffff;
`;

const PersonCard = ({
	member,
	selectedMembers,
	handleSelect,
	selectedHeads
}) => {
	const { Meta } = Card;

	return (
		<>
			<Card
				onClick={() => handleSelect && handleSelect(member._id)}
				hoverable
				rounded
				bordered={false}
				style={{
					display: "flex",
					justifyContent: "center",
					textAlign: "center",
					backgroundColor: `${
						member.role === "lead"
							? "rgb(219,68,55,.1)"
							: member.role === "core"
							? "	rgb(66, 133, 244,.1)"
							: "rgb(244,180,0,.1)"
					}`,
					height: "100%"
				}}
			>
				<div
					style={{
						backgroundColor: `${
							member.role === "lead"
								? "#DB4437"
								: member.role === "core"
								? "#4285F4"
								: "#F4B400"
						}`,
						position: "absolute",
						height: "38%",
						top: 0,
						left: 0,
						width: "100%"
					}}
				/>

				<div
					className={
						selectedHeads && selectedHeads.includes(member._id)
							? "selected head"
							: selectedMembers &&
							  selectedMembers.includes(member._id)
							? "selected member"
							: "onHover"
					}
				>
					<div>
						{(selectedMembers &&
							selectedMembers.includes(member._id)) ||
						(selectedMembers &&
							selectedHeads.includes(member._id)) ? (
							<HiBadgeCheck
								style={{
									height: "80px",
									width: "80px"
								}}
							/>
						) : (
							<HiCheckCircle
								style={{
									height: "80px",
									width: "80px"
								}}
							/>
						)}
					</div>
					<h2>
						{(selectedMembers &&
							selectedHeads.includes(member._id)) ||
						(selectedMembers &&
							selectedMembers.includes(member._id))
							? "Selected !"
							: "Select"}
					</h2>
				</div>

				<Image src={member.image} alt="" />
				<Meta
					style={{
						paddingTop: "20px",
						paddingBottom: "10px"
					}}
					title={member.name}
					description={member.designation}
				/>
			</Card>
		</>
	);
};

export default PersonCard;
