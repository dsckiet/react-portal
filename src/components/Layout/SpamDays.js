import React, { useState, useEffect } from "react";
import { Card, Table } from "antd";
import { FaBirthdayCake } from "react-icons/fa";
import { getUsersService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name"
	},
	{
		title: "Left",
		dataIndex: "daysLeft",
		key: "daysLeft",
		render: daysLeft => `${daysLeft} days`
	},
	{
		title: "DOB",
		dataIndex: "dob",
		key: "dob",
		render: dob => `${dob.split("T")[0]}`
	}
];

const SpamDays = () => {
	let today = new Date();
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState([]);

	const getBday = obj => {
		let days;
		if (obj.dob) {
			let bday = new Date(obj.dob.split("T")[0]);
			let bdayThisYear = new Date(
				today.getFullYear(),
				bday.getMonth(),
				bday.getDate() + 1
			);
			if (today.getTime() > bdayThisYear.getTime()) {
				bdayThisYear.setFullYear(today.getFullYear() + 1);
			}
			let diff = bdayThisYear.getTime() - today.getTime();
			days = Math.round(diff / 8.64e7);
		}

		if (days <= 30) {
			return { ...obj, daysLeft: days };
		}
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			let arr = [];
			try {
				let params = {
					sortBy: "name"
				};
				const { data } = await getUsersService(params);

				data.forEach(d => {
					if (getBday(d)) arr.push(getBday(d));
				});

				setUsers(arr);

				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Card style={{ marginTop: "16px" }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between"
					}}
				>
					<h2 style={{ fontWeight: 700 }}>Spam Days</h2>
					<span>
						<FaBirthdayCake
							style={{ height: "2em", width: "auto" }}
						/>
					</span>
				</div>
				<hr />
				<Table
					loading={isLoading}
					dataSource={users}
					columns={columns}
					pagination={false}
				/>
			</Card>
		</>
	);
};

export default SpamDays;
