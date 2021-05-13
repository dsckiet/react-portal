import React from "react";
import { Comment, Avatar } from "antd";
import { GoReply } from "react-icons/go";

const CommentSection = () => {
	return (
		<>
			<Comment
				actions={[
					<span
						key="comment-nested-reply-to"
						style={{
							display: "flex",
							alignItems: "center"
						}}
					>
						<GoReply style={{ marginRight: ".25rem" }} />
						Reply{" "}
					</span>
				]}
				author={<>Mayank Shakya</>}
				avatar={
					<Avatar
						src="https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg"
						alt="Mayank Shakya"
					/>
				}
				content={
					<p>
						Tej kaam kro bhut dheere chal rha sab. Portal may tak
						khtk krna h :)
					</p>
				}
			>
				<Comment
					actions={[]}
					author={<>Mayank Shakya</>}
					avatar={
						<Avatar
							src="https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg"
							alt="Mayank Shakya"
						/>
					}
					content={
						<p>
							Tej kaam kro bhut dheere chal rha sab. Portal may
							tak khtk krna h :)
						</p>
					}
				></Comment>
			</Comment>
			<Comment
				actions={[
					<span
						key="comment-nested-reply-to"
						style={{
							display: "flex",
							alignItems: "center"
						}}
					>
						<GoReply style={{ marginRight: ".25rem" }} />
						Reply{" "}
					</span>
				]}
				author={<>Mayank Shakya</>}
				avatar={
					<Avatar
						src="https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg"
						alt="Mayank Shakya"
					/>
				}
				content={
					<p>
						Tej kaam kro bhut dheere chal rha sab. Portal may tak
						khtk krna h :)
					</p>
				}
			></Comment>
		</>
	);
};

export default CommentSection;
