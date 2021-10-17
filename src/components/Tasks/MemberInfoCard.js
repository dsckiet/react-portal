import React from "react";
import { Card, Avatar, Row, Col, Tag } from "antd";
import { FaCrown } from "react-icons/fa";

const MemberInfoCard = ({ data }) => {
	return (
		<>
			<Card style={{ marginBottom: "4px" }}>
				<Row
					style={{
						alignItems: "center"
						//justifyContent: "space-between"
						//margin: "-10px"
					}}
				>
					<Col span={4}>
						<Avatar
							src={data.image}
							style={{ marginLeft: "8px" }}
						/>
					</Col>
					<Col
						span={data.type === "head" ? 14 : 16}
						style={{ fontSize: "14px" }}
					>
						{data.name}
					</Col>
					{data.type === "head" ? (
						<Col span={2}>
							<FaCrown />
						</Col>
					) : null}

					<Col>
						<Tag color="red">{data.role}</Tag>
					</Col>
				</Row>
			</Card>
		</>
	);
};

export default MemberInfoCard;
