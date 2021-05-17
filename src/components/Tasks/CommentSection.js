import React, { useState } from "react";
import { Comment, Avatar, Form, Input, Button, Row, Col } from "antd";
import { GoReply } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import "./style.css";
const { TextArea } = Input;

const CommentSection = () => {
	const [count, setCount] = useState(4);
	const [replyingTo, setReplyingTo] = useState(null);
	const [comments, setComments] = useState([
		{
			id: 1,
			role: "head",
			author: "Mayank Shakya",
			image:
				"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg",
			comment:
				"Tej kaam kro bhut dheere chal rha sab. Portal may tak khtm krna h :)",
			replies: [
				{
					id: 2,
					role: "member",
					author: "Mayank Shakya",
					image:
						"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg",
					comment:
						"Tej kaam kro bhut dheere chal rha sab. Portal may tak khtm krna h :)"
				}
			]
		},
		{
			id: 3,
			role: "lead",
			author: "Mayank Shakya",
			image:
				"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg",
			comment:
				"Tej kaam kro bhut dheere chal rha sab. Portal may tak khtm krna h :)",
			replies: []
		}
	]);
	const [form] = Form.useForm();
	window.scrollTo(0, document.body.height);
	const handleReply = id => {
		setReplyingTo(id);
	};

	const onSubmit = values => {
		if (replyingTo) {
			let data = [...comments];
			for (let i = 0; i < data.length; i++) {
				if (data[i].id === replyingTo) {
					data[i].replies = [
						...data[i].replies,
						{
							id: count,
							role: "lead",
							author: "Mayank Shakya",
							image:
								"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg",
							comment: values.comment
						}
					];
				}
			}
			setComments(data);
			setTimeout(() => setReplyingTo(null), 100);
		} else {
			setComments([
				...comments,
				{
					id: count,
					role: "lead",
					author: "Mayank Shakya",
					image:
						"https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg",
					comment: values.comment,
					replies: []
				}
			]);
		}
		setCount(count + 1);
		setTimeout(() => form.setFieldsValue({ comment: "" }), 100);
	};
	return (
		<div className="comment-section-container">
			{comments.map(comment => (
				<>
					<Comment
						className={`comment-container ${
							comment.role === "lead"
								? "comment-lead"
								: comment.role === "head"
								? "comment-head"
								: "comment-member"
						}`}
						actions={[
							<span
								className="reply-button"
								key="comment-nested-reply-to"
								onClick={() => handleReply(comment.id)}
							>
								<GoReply style={{ marginRight: ".25rem" }} />
								Reply{" "}
							</span>
						]}
						author={<h3>{comment.author}</h3>}
						avatar={
							<Avatar src={comment.image} alt={comment.author} />
						}
						content={<p>{comment.comment}</p>}
					/>
					{comment.replies.length > 0
						? comment.replies.map(reply => (
								<Comment
									className={`reply-container ${
										reply.role === "lead"
											? "comment-lead"
											: reply.role === "head"
											? "comment-head"
											: "comment-member"
									}`}
									author={<h3>{reply.author}</h3>}
									avatar={
										<Avatar
											src={reply.image}
											alt={reply.image}
										/>
									}
									content={<p>{reply.comment}</p>}
								/>
						  ))
						: null}
				</>
			))}

			<Comment
				style={{ padding: "0 .5rem" }}
				avatar={
					<Avatar
						src="https://dsc-portal-static.s3.ap-south-1.amazonaws.com/users/1619509451803984020.jpeg"
						alt="Mayank Shakya"
					/>
				}
				content={
					<Form form={form} onFinish={onSubmit}>
						{replyingTo ? (
							<>
								<Row
									style={{
										border: "1px solid #D9D9D9",
										borderRadius: "3px",
										marginBottom: ".5rem",
										padding: ".25rem .75rem ",
										color: "#BFBFBF",
										justifyContent: "space-between"
									}}
								>
									<Col>
										<Row>
											<p>
												replying to :{" "}
												<span
													style={{ color: "#262626" }}
												>
													{
														comments.filter(
															comment =>
																comment.id ===
																replyingTo
														)[0].comment
													}
												</span>
											</p>
										</Row>
										<Row>
											<p>
												author :{" "}
												<span
													style={{ color: "#262626" }}
												>
													{
														comments.filter(
															comment =>
																comment.id ===
																replyingTo
														)[0].author
													}
												</span>
											</p>
										</Row>
									</Col>
									<Col
										style={{
											display: "flex",
											alignItems: "center",
											color: "#262626",
											padding: ".5rem"
										}}
										onClick={() => setReplyingTo(null)}
									>
										<AiOutlineClose
											style={{ cursor: "pointer" }}
										/>
									</Col>
								</Row>
							</>
						) : null}
						<Form.Item name="comment">
							<TextArea
								type="text"
								placeholder="Enter your comment ..."
								rows={3}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								htmlType="submit"
								// loading={submitting}
								type="primary"
							>
								Add Comment
							</Button>
						</Form.Item>
					</Form>
				}
			/>
		</div>
	);
};

export default CommentSection;
